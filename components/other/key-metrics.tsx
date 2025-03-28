import { useMetricIcon } from '@/hooks/logic/use-metric-icon';
import { Box, Card, Flex, Text } from '@mantine/core';
import DashboardTooltip from './dashboard-tool-tip';

interface Props {
  key_indicators: unknown;
}
const KeyMetrics: React.FC<Props> = ({ key_indicators }) => {
  // @ts-expect-error typescript can infer types
  const key = Object.entries(key_indicators).map(([label, value]) => ({
    label,
    value,
  }));
  const { getMetricIcon } = useMetricIcon();
  return (
    <Box className="gray-card-wrapper-dashboard mb-[24px] flex-col">
      <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
        <Text className="gray-card-header-text capitalize">Key Metrics</Text>
        <DashboardTooltip label={'Financial Metrics'} />
      </Flex>
      <Card className="gray-card-dashboard grid grid-cols-1 divide-solid p-0 sm:grid-cols-2 sm:divide-x md:grid-cols-3">
        {key?.map((objIndictor: unknown, index: number) => {
          // @ts-expect-error typescript can infer types
          const label = objIndictor?.label.replace(/_/g, ' ');
          return (
            <Box key={index} className="p-[20px]">
              <Box className="mb-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm">
                {getMetricIcon(label)}
              </Box>
              <Text className="text-[14px] font-[350] capitalize leading-normal text-gray-600">
                {label}
              </Text>
              <Text
                component="p"
                className="font-lausanne text-[20px] font-semibold capitalize leading-[49px] text-gray-800 [leading-trim:both] [text-edge:cap]"
              >
                {/* @ts-expect-error typescript can infer types */}
                {objIndictor?.value}{' '}
              </Text>
            </Box>
          );
        })}
      </Card>
    </Box>
  );
};

export default KeyMetrics;
