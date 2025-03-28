'use client';

import { Box, Card, Flex, SimpleGrid, Tabs, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

import DianaPageLoaderWrapper from '@/components/diana/diana-page-loader-wrapper';
import { DianaInsight } from '@/components/diana/overview/diana-insight';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import PlotComponent from '@/components/plotly/PlotlyChart';
import { useMetricIcon } from '@/hooks/logic/use-metric-icon';
import { useGetOperationalAnalysis } from '@/hooks/query/diana-dashboard';
import {
  getChartArray,
  getInsightScoreArray,
  getScoreArray,
} from '@/lib/helper';
import {
  DataObject,
  InsightDetailsModel,
  InsightModel,
  LabelValuePair,
  ScoreObject,
  SectionScrollModel,
} from '@/types/general';
import SingleRisk from '../../financial-analysis/components/single-risk';

const OperationalAnalysisClient: FC = () => {
  const { projectId } = useParams();
  const { isLoading, finData } = useGetOperationalAnalysis({
    project_id: projectId as string,
  });

  const [selectedInsightDetail, setSelectedInsightDetail] =
    useState<InsightDetailsModel>({ insight: '', title: '' });
  const [showInsight, setShowInsight] = useState(false);
  const [sectionId, setSectionId] = useState('');

  const { getMetricIcon } = useMetricIcon();

  const operationAnalysis = finData?.operation_analysis?.operation_analysis;
  const overviewData =
    finData?.operation_analysis?.operation_analysis?.overview;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const operationalOverview = operationAnalysis?.operational_overview ?? {};

  const overviewScores = useMemo(
    () => getScoreArray(overviewData?.scores as ScoreObject),
    [overviewData]
  );
  const overviewInsightList = useMemo(
    () =>
      getInsightScoreArray({
        insightList: overviewData?.insight,
        scoreList: overviewScores,
      }),
    [overviewData, overviewScores]
  );

  const toLabelValueArray = (data: DataObject = {}): LabelValuePair[] =>
    Object.entries(data).map(([label, value]) => ({ label, value }));

  const solarArray = useMemo(
    () => toLabelValueArray(operationalOverview?.comparison?.solar),
    [operationalOverview]
  );
  const storageArray = useMemo(
    () => toLabelValueArray(operationalOverview?.comparison?.storage),
    [operationalOverview]
  );

  const showOverview = solarArray.length > 0 || storageArray.length > 0;
  const defaultTab = solarArray.length > 0 ? 'Solar' : 'Battery';

  const handleInsight = (detail: InsightDetailsModel) => {
    setSelectedInsightDetail(detail);
    setShowInsight(true);
  };
  const handleCloseInsight = () => setShowInsight(false);

  const renderOverviewComponent = (hideInsight: boolean = false) => {
    if (!showOverview) return null;
    return (
      <Box className="gray-card-wrapper-dashboard mb-6 flex-col">
        <Flex className="items-center gap-1 px-2 py-3">
          <Text className="gray-card-header-text">Overview</Text>
          <DashboardTooltip label="Overview" />
        </Flex>
        <Tabs defaultValue={defaultTab}>
          <Tabs.List className="mb-4">
            {solarArray?.length > 0 && <Tabs.Tab value="Solar">Solar</Tabs.Tab>}
            {storageArray?.length > 0 && (
              <Tabs.Tab value="Battery">Battery</Tabs.Tab>
            )}
          </Tabs.List>
          {solarArray?.length > 0 && (
            <Tabs.Panel value="Solar">
              <SimpleGrid
                className="w-full overflow-hidden rounded-md bg-gray-100"
                spacing="xs"
                cols={{ base: 1, sm: 2, md: solarArray.length > 2 ? 3 : 2 }}
              >
                {solarArray?.map((item) => (
                  <Box key={item.label} className="w-full bg-white p-5">
                    <Box className="mb-3">{getMetricIcon(item.label)}</Box>
                    <Text className="dashboard-grid-header-text">
                      {item.label}
                    </Text>
                    <Text component="p" className="dashboard-grid-sub-text">
                      {item.value ?? ''}
                      {item.label.includes('%') && '%'}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Tabs.Panel>
          )}
          {storageArray?.length > 0 && (
            <Tabs.Panel value="Battery">
              <SimpleGrid
                className="w-full overflow-hidden rounded-md bg-gray-100"
                spacing="xs"
                cols={{ base: 1, sm: 2, md: storageArray.length > 2 ? 3 : 2 }}
              >
                {storageArray.map((item) => (
                  <Box key={item.label} className="w-full bg-white p-5">
                    <Box className="mb-3">{getMetricIcon(item.label)}</Box>
                    <Text className="dashboard-grid-header-text">
                      {item.label}
                    </Text>
                    <Text component="p" className="dashboard-grid-sub-text">
                      {item.value ?? ''}
                      {item.label.includes('%') && '%'}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Tabs.Panel>
          )}
        </Tabs>
        <SingleRisk insight={overviewInsightList[0]} />
        {!hideInsight && overviewInsightList.length > 0 && (
          <DianaInsight
            title="Overview"
            onClick={(insight: string, title: string) => {
              handleInsight({ insight, title });
              setSectionId('overview');
            }}
            insight={overviewInsightList as InsightModel[]}
          />
        )}
      </Box>
    );
  };

  // Render a risk chart card
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRiskChartCard = (chart: any, includeInsight: boolean) => {
    const name = chart?.name?.replace(/_/g, ' ');
    // Determine the correct chart data and layout based on structure
    const chartData = chart?.chart?.layout
      ? chart?.chart?.data
      : chart?.chart?.data?.data;
    const chartLayout = chart?.chart?.layout
      ? chart?.chart?.layout
      : chart?.chart?.data?.layout;
    const chartInsight = chart?.chart?.layout
      ? chart?.chart?.insight
      : chart?.chart?.insight;

    // Remove unwanted layout properties if they exist
    if (chartLayout) {
      delete chartLayout.width;
      delete chartLayout.hight;
    }

    return (
      <Box className="gray-card-wrapper-dashboard flex-col">
        <Flex className="items-center gap-1 px-2 py-3">
          <Text className="gray-card-header-text capitalize">{name}</Text>
          <DashboardTooltip label={name} />
        </Flex>
        <Card>
          <PlotComponent
            className="h-full w-full"
            data={chartData}
            layout={{ ...chartLayout, title: '' }}
          />
        </Card>
        {includeInsight && chartInsight && (
          <DianaInsight
            title={name}
            onClick={(insight: string, title: string) => {
              setSelectedInsightDetail({ insight, title });
              setShowInsight(true);
            }}
            insight={chartInsight as InsightModel[]}
          />
        )}
      </Box>
    );
  };

  const riskChartSections: SectionScrollModel[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getChartArray(operationAnalysis).map((chart: any) => {
      const name = chart?.name?.replace(/_/g, ' ');
      return {
        label: name,
        id: name,
        component: renderRiskChartCard(chart, true),
        insightComponent: renderRiskChartCard(chart, false),
      };
    });
  }, [operationAnalysis]);

  const sectionList: SectionScrollModel[] = useMemo(() => {
    return [
      {
        label: 'Overview',
        id: 'overview',
        component: (
          <>
            <Text className="dashboard-title-text">
              Here’s a comprehensive overview of the transaction’s operational
              analysis.
            </Text>
            {renderOverviewComponent()}
          </>
        ),
        insightComponent: renderOverviewComponent(true),
      },
      ...riskChartSections,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskChartSections]);

  const selectedComponent = sectionList.find(
    (section) => section.id === sectionId
  );

  return (
    <DianaPageLoaderWrapper
      pageTitle="Operational Analysis"
      tabTitle="Operational Analysis"
      insightComponent={selectedComponent?.insightComponent}
      isLoading={isLoading}
      selectedInsightDetail={selectedInsightDetail}
      showInsight={showInsight}
      sectionList={sectionList}
      handleCloseInsight={handleCloseInsight}
    />
  );
};

export default OperationalAnalysisClient;
