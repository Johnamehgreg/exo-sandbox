'use client';

import DianaPageLoaderWrapper from '@/components/diana/diana-page-loader-wrapper';
import { DianaInsight } from '@/components/diana/overview/diana-insight';
import { RiskBadge } from '@/components/diana/overview/risk-badge';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import PlotComponent from '@/components/plotly/PlotlyChart';
import { useGeRiskAnalysis } from '@/hooks/query/diana-dashboard';
import {
  getChartArray,
  getInsightScoreArray,
  getScoreArray,
} from '@/lib/helper';
import { IconRiskArrow } from '@/public/assets/svg/icon-risk-arrow';
import {
  InsightDetailsModel,
  InsightModel,
  ScoreObject,
  SectionScrollModel,
  TaxCreditModel,
} from '@/types/general';
import { Box, Card, Flex, SimpleGrid, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { TaxCredits } from './tax-credits';

const RiskAnalysisClient = () => {
  const { projectId } = useParams();
  const { finData, isLoading } = useGeRiskAnalysis({
    project_id: projectId as string,
  });

  const chartList = getChartArray(finData?.risk_analysis?.risk_analysis);
  const overview = finData?.risk_analysis?.risk_analysis?.overview;
  const overviewScores = getScoreArray(overview?.scores as ScoreObject);
  const taxCredit = finData?.risk_analysis?.risk_analysis?.regulatory_risks
    ?.tax_credit_overview as TaxCreditModel;
  const overviewInsight = overview?.insight;
  const overviewInsightList = getInsightScoreArray({
    insightList: overviewInsight,
    scoreList: overviewScores,
  });

  const [selectedInsightDetail, setSelectedInsightDetail] = useState<{
    insight: string;
    title: string;
  }>({ insight: '', title: '' });
  const [showInsight, setShowInsight] = useState(false);
  const [sectionId, setSectionId] = useState('');

  const handleInsight = (detail: InsightDetailsModel) => {
    setSelectedInsightDetail({
      insight: detail.insight,
      title: detail.title,
    });
    setShowInsight(true);
  };

  const handleCloseInsight = () => setShowInsight(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cList = chartList.map((riskChart: any) => {
    const name = riskChart?.name?.replace(/_/g, ' ');
    const checkName = name === 'natural risks' ? 'Natural Hazard Risks' : name;
    return {
      label: name,
      id: name,
      component: (
        <>
          <Box className="gray-card-wrapper-dashboard flex-col">
            <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
              <Text className="gray-card-header-text capitalize">
                {checkName}
              </Text>
              <DashboardTooltip label={checkName} />
            </Flex>
            <Card>
              <PlotComponent
                className="h-full w-full"
                data={riskChart?.chart?.data?.data}
                layout={{ ...riskChart?.chart?.data?.layout, title: '' }}
              />
            </Card>
            {riskChart?.chart?.insight && (
              <DianaInsight
                title={name}
                onClick={(insight: string) => {
                  setSectionId(name);
                  setSelectedInsightDetail({
                    insight: insight,
                    title: name,
                  });
                  setShowInsight(true);
                }}
                insight={riskChart?.chart?.insight as InsightModel[]}
              />
            )}
          </Box>
        </>
      ),
      insightComponent: (
        <>
          <Box className="gray-card-wrapper-dashboard flex-col">
            <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
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
          </Box>
        </>
      ),
    };
  });

  const overviewComponent = (hideInsight?: boolean) => {
    return (
      <Box className="gray-card-wrapper-dashboard mb-[24px] flex-col">
        <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
          <Text className="gray-card-header-text">
            Macro & Regulatory Risk Evaluations
          </Text>
          <DashboardTooltip label="Macro & Regulatory Risk Evaluations" />
        </Flex>
        <SimpleGrid
          className="w-full overflow-hidden rounded-[8px] bg-gray-100"
          spacing="1px"
          cols={{ base: 1, sm: 2 }}
        >
          {overviewInsightList?.map((top) => {
            const name = top?.scoreDetail?.name?.replace(/_/g, ' ');

            return (
              <Box key={top.title} className="w-full bg-white p-[20px]">
                <Box className="mb-[14px] inline-flex h-7 w-7 items-center justify-center gap-2.5 rounded-md border border-gray-300 bg-white p-0.5 shadow-sm">
                  <IconRiskArrow />
                </Box>
                <Text className="dashboard-grid-header-text capitalize">
                  {name}
                </Text>
                <Flex className="items-center gap-2">
                  <span className="text-[19.5px] font-bold transition-opacity duration-500">
                    {top?.scoreDetail?.value.toFixed(1)}/10
                  </span>
                  <RiskBadge
                    isDot
                    riskLevel={top?.scoreDetail?.riskLevel as string}
                  />
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>

        {!hideInsight && overviewInsightList?.length > 0 && (
          <DianaInsight
            title="Macro & Regulatory Risk Evaluations"
            onClick={(insight: string, title: string) => {
              setSectionId('overview');
              handleInsight({ insight, title: title });
              setSectionId('overview');
            }}
            insight={overviewInsightList as InsightModel[]}
          />
        )}
      </Box>
    );
  };

  const sectionList: SectionScrollModel[] = [
    {
      label: 'Overview',
      id: 'overview',
      component: <>{overviewComponent()}</>,
      insightComponent: overviewComponent(true),
    },
    {
      label: 'Tax Credit',
      id: 'Tax_Credit',
      component: (
        <TaxCredits
          onInsight={(insightDetail) => {
            setSelectedInsightDetail(insightDetail);
            setShowInsight(true);
            setSectionId('Tax_Credit');
          }}
          taxCredit={taxCredit}
        />
      ),
    },
    ...cList,
  ];
  const selectedComponent = sectionList?.find((item) => item.id === sectionId);

  return (
    <DianaPageLoaderWrapper
      pageTitle="Risk Analysis"
      tabTitle="Risk Analysis"
      insightComponent={selectedComponent?.insightComponent}
      isLoading={isLoading}
      selectedInsightDetail={selectedInsightDetail}
      showInsight={showInsight}
      sectionList={sectionList}
      handleCloseInsight={handleCloseInsight}
    />
  );
};

export default RiskAnalysisClient;
