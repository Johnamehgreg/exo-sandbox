'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import DianaPageLoaderWrapper from '@/components/diana/diana-page-loader-wrapper';
import { DianaInsight } from '@/components/diana/overview/diana-insight';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import PlotComponent from '@/components/plotly/PlotlyChart';
import { useMetricIcon } from '@/hooks/logic/use-metric-icon';
import { useGetFinancialAnalysis } from '@/hooks/query/diana-dashboard';
import {
  getChartArray,
  getCurrencySymbol,
  getInsightScoreArray,
  getScoreArray,
} from '@/lib/helper';
import {
  InsightDetailsModel,
  InsightModel,
  ScoreObject,
  SectionScrollModel,
} from '@/types/general';
import { Box, Card, Flex, SimpleGrid, Text } from '@mantine/core';
import SingleRisk from './single-risk';

const FinancialAnalysisPage = () => {
  const { projectId } = useParams();

  const { isLoading, finData } = useGetFinancialAnalysis({
    project_id: projectId as string,
  });

  const financialData = finData?.financial_analysis?.financial_analysis;
  const keyIndicators = financialData?.key_indicators;
  const overviewData = financialData?.overview;

  const chartList = useMemo(
    () => getChartArray(financialData),
    [financialData]
  );

  const { getMetricIcon } = useMetricIcon();

  const [sectionId, setSectionId] = useState('');
  const [selectedInsightDetail, setSelectedInsightDetail] =
    useState<InsightDetailsModel>({
      insight: '',
      title: '',
    });
  const [showInsight, setShowInsight] = useState(false);

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

  const handleInsight = (detail: InsightDetailsModel) => {
    setSelectedInsightDetail(detail);
    setShowInsight(true);
  };

  const handleCloseInsight = () => setShowInsight(false);

  const renderOverviewComponent = (hideInsight: boolean = false) => (
    <Box className="gray-card-wrapper-dashboard flex-col">
      <Flex className="items-center gap-1 px-2 py-3">
        <Text className="gray-card-header-text">Overview</Text>
        <DashboardTooltip label="Overview" />
      </Flex>
      <SimpleGrid
        className="w-full overflow-hidden rounded-md bg-gray-100"
        spacing="xs"
        cols={{ base: 1, sm: 2, md: 3 }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {keyIndicators?.indicators?.map((indicator: any) => (
          <Box key={indicator.metric} className="w-full bg-white p-5">
            <Box className="mb-3">{getMetricIcon(indicator.metric)}</Box>
            <Text className="dashboard-grid-header-text">
              {indicator.metric}
            </Text>
            <Text component="p" className="dashboard-grid-sub-text capitalize">
              {indicator.has_units ? (
                indicator.units?.toLowerCase().includes('year') ? (
                  <>
                    {indicator.value} {indicator.units}
                  </>
                ) : (
                  <>
                    {getCurrencySymbol(indicator.units as string)}{' '}
                    {indicator.value}
                  </>
                )
              ) : (
                indicator.value
              )}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <SingleRisk insight={overviewInsightList[0]} />
      {!hideInsight && overviewInsightList?.length > 0 && (
        <DianaInsight
          title="Overview"
          onClick={(insight: string, title: string) =>
            handleInsight({ insight, title })
          }
          insight={overviewInsightList as InsightModel[]}
        />
      )}
    </Box>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRiskChartCard = (riskChart: any, withInsight: boolean = true) => {
    const name = riskChart?.name?.replace(/_/g, ' ');
    return (
      <Box className="gray-card-wrapper-dashboard flex-col">
        <Flex className="items-center gap-1 px-2 py-3">
          <Text className="gray-card-header-text capitalize">{name}</Text>
          <DashboardTooltip label={name} />
        </Flex>
        <Card>
          <PlotComponent
            className="h-full w-full"
            data={riskChart?.chart?.data?.data}
            layout={{ ...riskChart?.chart?.data?.layout, title: '' }}
          />
        </Card>
        {withInsight && riskChart?.chart?.insight && (
          <DianaInsight
            title={name}
            onClick={(insight: string, title: string) => {
              setSectionId(name);
              handleInsight({ insight, title });
            }}
            insight={riskChart?.chart?.insight as InsightModel[]}
          />
        )}
      </Box>
    );
  };

  const riskChartSections: SectionScrollModel[] = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chartList.map((riskChart: any) => {
        const name = riskChart?.name?.replace(/_/g, ' ');
        return {
          label: name,
          id: name,
          component: renderRiskChartCard(riskChart, true),
          insightComponent: renderRiskChartCard(riskChart, false),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chartList]
  );

  const sectionList: SectionScrollModel[] = useMemo(
    () => [
      {
        label: 'Overview',
        id: 'overview',
        component: (
          <>
            <Text className="dashboard-title-text">
              Here’s a comprehensive overview of the transaction’s financial
              outlook.
            </Text>
            {renderOverviewComponent()}
          </>
        ),
        insightComponent: renderOverviewComponent(true),
      },
      ...riskChartSections,
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [riskChartSections]
  );

  const selectedComponent = sectionList.find((item) => item.id === sectionId);

  return (
    <DianaPageLoaderWrapper
      pageTitle="Financial Analysis"
      tabTitle="Financial Analysis"
      insightComponent={selectedComponent?.insightComponent}
      isLoading={isLoading}
      selectedInsightDetail={selectedInsightDetail}
      showInsight={showInsight}
      sectionList={sectionList}
      handleCloseInsight={handleCloseInsight}
    />
  );
};

export default FinancialAnalysisPage;
