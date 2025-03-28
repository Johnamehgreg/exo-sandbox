import { RiskBadge } from '@/components/diana/overview/risk-badge';
import { formatName } from '@/lib/helper';
import { IconRiskArrow } from '@/public/assets/svg/icon-risk-arrow';
import { InsightModel } from '@/types/general';
import { Box, Flex, Text } from '@mantine/core';

interface Props {
  insight: InsightModel;
}

const SingleRisk: React.FC<Props> = ({ insight }) => {
  const formattedName = formatName(insight?.scoreDetail?.name);
  return (
    <Box className="dashboard-white-card mt-[2px] flex flex-wrap items-center justify-center gap-2.5 px-5 py-3">
      <Box className="inline-flex h-7 w-7 items-center justify-center gap-2.5 rounded-md border border-gray-300 bg-white p-0.5 shadow-sm">
        <IconRiskArrow />
      </Box>
      <Text className="text-base capitalize text-gray-600">
        {formattedName ?? ''}
      </Text>
      <Flex className="items-center gap-2">
        <RiskBadge
          rating={insight?.scoreDetail?.value.toFixed(1)}
          isDot
          riskLevel={insight?.scoreDetail?.riskLevel as string}
        />
      </Flex>
    </Box>
  );
};

export default SingleRisk;
