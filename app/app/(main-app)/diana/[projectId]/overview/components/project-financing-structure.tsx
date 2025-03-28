import { DianaInsight } from '@/components/diana/overview/diana-insight';
import { convertToLabelValueList } from '@/lib/helper';
import { IconInfo } from '@/public/assets/svg/icon-info';
import { IconNotePencil } from '@/public/assets/svg/icon-note-pencil';
import { InsightDetailsModel, InsightModel } from '@/types/general';
import { FinancialBreakdownProps, KeyIndicator } from '@/types/overview';
import { Box, Text, Tooltip } from '@mantine/core';
import { FC } from 'react';
import { FinancialBreakdown } from './financial-breakdown';
interface RiskAnalysisSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  onInsight?: (type: InsightDetailsModel) => void;
}



const getColor = (key: string) => {
  switch (key.toLowerCase()) {
    case 'tax_equity':
      return 'blue';
    case 'sponsor_equity':
      return 'green';
    default:
      return '#F8C309';
  }
};

export const ProjectFinancingStructure: FC<RiskAnalysisSummaryProps> = ({
  project,
  onInsight,
}) => {
  const keyIndicatorsInsights = project?.key_indicators?.insight || '';
  const structure = convertToLabelValueList(project?.project_overview_and_underwriting?.tax_equity_structure)


  const financialBreakdownDataTwo: FinancialBreakdownProps[] = structure.map((item) => {
    return {
      name: item.label,
      amount: item.value,
      color: getColor(item.label),
      value: Number(item.value),
    }
  })

  const keyTerms = project?.key_indicators?.indicators?.map(
    (key: KeyIndicator) => ({
      title: key.metric,
      description: `${key.value} ${key.has_units ? key.units : ''}`,
    })
  );

  return (
    <Box className="py-.5 w-full rounded-xl bg-gray-100 px-1 pb-4">
      {/* header */}
      <div className="flex w-full items-center justify-between px-2">
        <div className="flex w-max items-center justify-between gap-2 px-2 py-3 text-sm">
          <Text className="gray-card-header-text capitalize">
            Recommended Tax Equity Structure
          </Text>
          <Tooltip
            label="Recommended Tax Equity Structure"
            className="flex items-center"
          >
            <button>
              <IconInfo className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>

        <button>
          <IconNotePencil />
        </button>
      </div>
      <div>
        <FinancialBreakdown terms={keyTerms} data={financialBreakdownDataTwo} />
        <DianaInsight
          title="Recommended Tax Equity Structure"
          onClick={(insight: string, title: string) => {
            onInsight?.({
              insight: insight,
              title: title,
            });
          }}
          insight={keyIndicatorsInsights as InsightModel[]}
        />
      </div>
    </Box>
  );
};
