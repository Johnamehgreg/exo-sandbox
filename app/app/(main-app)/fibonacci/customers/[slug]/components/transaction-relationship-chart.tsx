import { useEffect, useRef, useState } from 'react';
import Graph from 'graphology';
import { Sigma } from 'sigma';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { ActionIcon, Box, Skeleton, Stack, Text, Title } from '@mantine/core';
import ChartEmptyState from './chart-empty-state';
import ChartErrorState from './chart-error-state';
import { NetworkGraphData } from '@/types/general';
import NetworkChartLegendItem from './network-chart-legend-item';

interface Props {
  data?: NetworkGraphData;
  error?: Error | null;
  isLoading?: boolean;
}

const colors = {
  account: '#1f77b4',
  customer: '#ff7f0e',
  actor: '#4CAF50',
} as const;

const ZoomInIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ResetIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const TransactionRelationshipChart = ({ data, error, isLoading }: Props) => {
  const containerRef = useRef(null);
  const graphRef = useRef<Graph | null>(null);
  const rendererRef = useRef<Sigma | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleZoomIn = () => {
    const camera = rendererRef.current?.getCamera();
    if (camera) {
      camera.animatedZoom({ factor: 1.5 });
    }
  };

  const handleZoomOut = () => {
    const camera = rendererRef.current?.getCamera();
    if (camera) {
      camera.animatedZoom({ factor: 0.67 });
    }
  };

  const handleReset = () => {
    const camera = rendererRef.current?.getCamera();
    if (camera) {
      camera.animatedReset();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Initialize graph
    const graph = new Graph({ multi: true });
    graphRef.current = graph;

    const accounts = data?.nodes?.[0]?.accounts;
    const customers = data?.nodes?.[1]?.customers;

    accounts?.forEach((account) => {
      const accountEdges = data?.edges?.filter(
        (edge) => edge?.account === account?.id
      );
      const totalVolume = accountEdges?.reduce(
        (sum, edge) => sum + edge?.totalVolume,
        0
      );
      const totalTransactions = accountEdges?.reduce(
        (sum, edge) => sum + edge?.transactionCount,
        0
      );

      graph.addNode(account?.id, {
        label: '',
        originalLabel: `Account ${account?.account} `,
        color: colors.account,
        originalColor: colors.account,
        x: Math.random() * 100,
        y: Math.random() * 100,
        totalVolume,
        totalTransactions,
        size: 10,
        type: 'circle',
      });
    });

    customers?.forEach((customer) => {
      const customerEdges = data?.edges?.filter(
        (edge) => edge?.customer === customer?._id
      );
      const totalVolume = customerEdges?.reduce(
        (sum, edge) => sum + edge?.totalVolume,
        0
      );
      const totalTransactions = customerEdges?.reduce(
        (sum, edge) => sum + edge?.transactionCount,
        0
      );

      graph.addNode(customer?._id, {
        label: '',
        originalLabel: `Customer ${customer?._id}`,
        color: customer?.isActor ? colors.actor : colors.customer,
        originalColor: customer?.isActor ? colors.actor : colors.customer,
        x: Math.random() * 100,
        y: Math.random() * 100,
        totalVolume,
        totalTransactions,
        size: 10,
        type: 'circle',
      });
    });

    data?.edges?.forEach((edge) => {
      graph.addEdge(edge?.account, edge?.customer, {
        label: `Trxn: ${edge?.transactionCount?.toLocaleString()}, Vol: ${edge?.totalVolume?.toLocaleString()}`,
        color: '#ccc',
        size: 2,
      });
    });

    // Apply layout
    forceAtlas2.assign(graph, {
      iterations: 100,
      settings: {
        gravity: 2,
        scalingRatio: 2,
      },
    });

    // Initialize renderer
    const renderer = new Sigma(graph, container!, {
      renderEdgeLabels: true,
      defaultEdgeColor: '#ccc',
      defaultNodeColor: '#999',
      defaultNodeType: 'circle',
      allowInvalidContainer: true,
      nodeReducer: (_, data) => ({
        ...data,
        label: data.label,
        size: data.size,
        color: data.color,
      }),
    });
    rendererRef.current = renderer;

    // Add click event
    renderer.on('clickNode', ({ node }) => {
      setSelectedNode(node);

      // Reset all nodes and edges to original colors
      graph.forEachNode((n) => {
        graph.setNodeAttribute(
          n,
          'color',
          graph.getNodeAttribute(n, 'originalColor')
        );
        graph.setNodeAttribute(n, 'size', 10);
      });

      graph.forEachEdge((e) => {
        graph.setEdgeAttribute(
          e,
          'color',
          graph.getEdgeAttribute(e, 'originalColor')
        );
        graph.setEdgeAttribute(e, 'size', 2);
      });

      // Highlight selected node and its connections
      graph.setNodeAttribute(node, 'size', 15);

      // Get connected nodes and edges
      const connectedEdges = graph.edges(node);
      const connectedNodes = new Set();

      connectedEdges.forEach((edge) => {
        const source = graph.source(edge);
        const target = graph.target(edge);
        connectedNodes.add(source);
        connectedNodes.add(target);

        // Highlight edge
        graph.setEdgeAttribute(edge, 'color', '#ff0000');
        graph.setEdgeAttribute(edge, 'size', 4);
      });

      // Highlight connected nodes
      connectedNodes.forEach((connectedNode) => {
        if (connectedNode !== node) {
          graph.setNodeAttribute(connectedNode, 'size', 13);
        }
      });
    });

    // Add stage click to reset
    renderer.on('clickStage', () => {
      setSelectedNode(null);

      // Reset all nodes and edges
      graph.forEachNode((n) => {
        graph.setNodeAttribute(
          n,
          'color',
          graph.getNodeAttribute(n, 'originalColor')
        );
        graph.setNodeAttribute(n, 'size', 10);
      });

      graph.forEachEdge((e) => {
        graph.setEdgeAttribute(
          e,
          'color',
          graph.getEdgeAttribute(e, 'originalColor')
        );
        graph.setEdgeAttribute(e, 'size', 2);
      });
    });

    return () => {
      renderer.kill();
    };
  }, [data]);

  if (isLoading)
    return (
      <Box className="h-96 w-full rounded-lg bg-white p-4">
        <Skeleton height="100%" radius="md" />
      </Box>
    );
  if (error) return <ChartErrorState message={error.message} />;
  if (!data?.edges?.length && !data?.nodes?.length)
    return <ChartEmptyState message="No transaction count data available" />;

  return (
    <Box className="relative w-full">
      <div className="relative w-full">
        <Box
          ref={containerRef}
          className="h-96 w-full rounded-lg border border-gray-300"
        />
        {/* Zoom Controls */}
        <Stack
          className="absolute bottom-4 right-4 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
          gap="xs"
        >
          <ActionIcon
            variant="light"
            onClick={handleZoomIn}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </ActionIcon>

          <ActionIcon
            variant="light"
            onClick={handleZoomOut}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </ActionIcon>

          <ActionIcon
            variant="light"
            onClick={handleReset}
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            <ResetIcon />
          </ActionIcon>
        </Stack>
      </div>

      {selectedNode && (
        <Box className="absolute right-4 top-4 w-[250px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <Title order={3} className="mb-2 text-sm font-bold">
            {graphRef.current?.getNodeAttribute(selectedNode, 'originalLabel')}
          </Title>

          {/* Total transaction volume */}
          <Text className="mb-1 text-sm text-gray-600">
            Total Volume:{' '}
            {graphRef.current
              ?.getNodeAttribute(selectedNode, 'totalVolume')
              ?.toLocaleString() || 0}
          </Text>

          {/* Total transaction count */}
          <Text className="mb-1 text-sm text-gray-600">
            Total Transactions:{' '}
            {graphRef.current
              ?.getNodeAttribute(selectedNode, 'totalTransactions')
              ?.toLocaleString() || 0}
          </Text>

          {/* Connections */}
          <Text className="text-sm text-gray-600">
            Connections: {graphRef.current?.degree(selectedNode)}
          </Text>
        </Box>
      )}

      {/* Legend */}
      <Box className="mt-4 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
        <Title order={4} className="mb-2 text-sm font-bold">
          Legend
        </Title>
        <Stack gap="xs">
          <NetworkChartLegendItem label="Account" color={colors.account} />
          <NetworkChartLegendItem label="Customer" color={colors.customer} />
          <NetworkChartLegendItem
            label="Customer (Actor)"
            color={colors.actor}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default TransactionRelationshipChart;
