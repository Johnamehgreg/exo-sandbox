import { DianaInsight } from '@/components/diana/overview/diana-insight';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import { InsightDetailsModel, InsightModel } from '@/types/general';
import { RiskItem, RiskLevel } from '@/types/overview';
import { Box, Card, Flex, Table, Text } from '@mantine/core';
import { FC } from 'react';
import { RiskTable } from './risk-analysis-table';

interface RiskAnalysisSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  onInsight?: (type: InsightDetailsModel) => void;
  hideInsight?: boolean;
}

export const RiskAnalysisSummary: FC<RiskAnalysisSummaryProps> = ({
  project,
  onInsight,
  hideInsight,
}) => {
  const riskAnalysisData =
    project?.project_overview_and_underwriting?.risk_analysis;

  let filteredAnalyis: RiskItem[] = [];

  if (riskAnalysisData) {
    filteredAnalyis = Object.keys(riskAnalysisData)
      ?.filter(
        (key) => key !== 'overview_insights' && key !== 'combined_risk_insights'
      )
      ?.map((key) => {
        return {
          name: (key || '_').split('_').join(' ') as string,
          score: riskAnalysisData[key][0]
            ? parseFloat(riskAnalysisData[key][0]).toFixed(1)
            : '0',
          status: riskAnalysisData[key][1] as RiskLevel,
        };
      });
  }
  return (
    <Box className="gray-card-wrapper-dashboard h-auto flex-col">
      {/* header */}
      <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
        <Text className="gray-card-header-text capitalize">
          Overall Risk Analysis Summary
        </Text>
        <DashboardTooltip label={'Risk Analysis Summary'} />
      </Flex>
      <Card className="gray-card-dashboard p-0">
        <Table.ScrollContainer
          minWidth={'full'}
          className="overflow-hidden rounded-lg border-gray-200 px-0"
        >
          <RiskTable items={filteredAnalyis} />
        </Table.ScrollContainer>
      </Card>
      {!hideInsight && (
        <DianaInsight
          title="Risk Summary"
          onClick={(insight: string, title: string) => {
            onInsight?.({
              insight: insight,
              title: title,
            });
          }}
          insight={
            project?.project_overview_and_underwriting?.risk_analysis
              ?.combined_risk_insights as InsightModel[]
          }
        />
      )}
    </Box>
  );
};
