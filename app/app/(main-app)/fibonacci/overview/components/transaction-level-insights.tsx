import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import { FibonacciAnalyticsResponse } from '@/hooks/query/fibonacciTransactionAnalytics';
import { Box, Flex, SimpleGrid, Skeleton, Text } from '@mantine/core';
import FraudulentTransaction from './fraudulent-transaction';

type Props = {
  data: FibonacciAnalyticsResponse['analytics'];
  isLoading: boolean;
};

const TransactionLevelInsights = ({ data, isLoading }: Props) => {
  return (
    <Box>
      <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
        <Text className="gray-card-header-text">
          Transaction Level Insights
        </Text>
        <DashboardTooltip label="Transaction Level Insights" />
      </Flex>
      {isLoading ? (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 4 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {Array.from({ length: 8 }, (_, index) => (
            <Box
              key={`skeleton-loader-${index}`}
              className="rounded-lg bg-white p-4"
            >
              <Skeleton circle height={24} width={40} radius="sm" mb={10} />
              <Skeleton radius="sm" className="mb-2 h-8 w-full" />
              <Skeleton height={16} width={120} radius="sm" />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid
          className={'w-full overflow-hidden rounded-[8px] bg-white p-[20px]'}
          spacing={'0px'}
          cols={{ base: 1, sm: 2, md: 4 }}
        >
          {data?.map((item, index) => (
            <FraudulentTransaction
              key={`${item.title}+${index}`}
              title={item?.title}
              amount={item?.value}
              periodRange={item?.periodRange}
              currency={item?.unit?.toUpperCase()}
              isIncreasing={item?.isIncreasing}
              percentChange={item?.percentChange}
              hasUnit={item?.has_unit}
              showIcon={index < data?.length - 4}
              className={index > 3 ? 'border-t' : ''}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default TransactionLevelInsights;
