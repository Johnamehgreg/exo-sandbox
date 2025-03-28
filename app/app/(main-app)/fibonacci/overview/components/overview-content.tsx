import { DianaInsight } from '@/components/diana/overview/diana-insight';
import { InsightWrapper } from '@/components/layout/insight-wrapper';
import { FibonacciAnalyticsResponse } from '@/hooks/query/fibonacciTransactionAnalytics';
import { fibonacciTransactionOverviewChartOptions } from '@/lib/helper';
import { IconCalender } from '@/public/assets/svg/icon-calender';
import { IconChevronDown } from '@/public/assets/svg/icon-chevron-down';
import { InsightDetailsModel } from '@/types/general';
import { Box, Container, Flex, Select, Skeleton, Stack } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import TransactionOverviewFlaggedChart from './flagged-chart';
import TransactionLevelInsights from './transaction-level-insights';
import TransactionOverViewCard from './transaction-overview-card';
import TransactionOverviewValueChart from './value-chart';
import TransactionOverviewVolumeChart from './volume-chart';

type Props = {
  isLoadingTransactionLevelInsights: boolean;
  isPendingTransactionInsight: boolean;
  analytics: FibonacciAnalyticsResponse['analytics'];
  insight?: string;
  selectedOptionForVolumeChart?: string | null;
  selectedOptionForValueChart?: string | null;
  selectedOptionForFlaggedChart?: string | null;
  handleFilter: (val: string | null) => void;
  selectedInsightDetail: InsightDetailsModel;
  setSelectedInsightDetail: Dispatch<SetStateAction<InsightDetailsModel>>;
  showInsight: boolean;
  setShowInsight: Dispatch<SetStateAction<boolean>>;
  selectedStat: unknown | null;
  setSelectedStat: Dispatch<SetStateAction<unknown | null>>;
};

const OverviewContent = ({
  isLoadingTransactionLevelInsights,
  analytics,
  isPendingTransactionInsight,
  insight,
  handleFilter,
  selectedInsightDetail,
  setSelectedInsightDetail,
  showInsight,
  setShowInsight,
  selectedOptionForVolumeChart,
  selectedOptionForValueChart,
  selectedOptionForFlaggedChart,
  selectedStat,
  setSelectedStat,
}: Props) => {
  return (
    <InsightWrapper
      selectedInsightComponent={
        <Box className="gray-card-wrapper-dashboard">
          <TransactionLevelInsights
            isLoading={isLoadingTransactionLevelInsights}
            data={analytics}
          />
        </Box>
      }
      type="fibonacci"
      stat={selectedStat}
      selectedInsightDetail={selectedInsightDetail}
      showInsight={showInsight}
      pageTitle="Dashboard"
      showDownloadReport
      onCloseInsight={() => {
        setShowInsight(false);
      }}
    >
      <Box className="dashboard-container-wrapper rounded-xl bg-white pb-[107px]">
        <Container size={'md'}>
          <Stack gap={28}>
            <Box className="gray-card-wrapper-dashboard mb-[24px] flex-col">
              <TransactionLevelInsights
                isLoading={isLoadingTransactionLevelInsights}
                data={analytics}
              />
              <Box className="p-[8px]">
                {!insight ||
                isPendingTransactionInsight ||
                isLoadingTransactionLevelInsights ? (
                  <Stack>
                    <Skeleton height={20} radius="sm" />
                    <Skeleton height={16} radius="sm" width="70%" />
                  </Stack>
                ) : (
                  <DianaInsight
                    title="overview"
                    onClick={(insight: string) => {
                      setSelectedStat(analytics);
                      setSelectedInsightDetail({
                        insight: insight,
                        title: 'Overview',
                      });
                      setShowInsight(true);
                    }}
                    label={insight!}
                  />
                )}
              </Box>
            </Box>
            <Flex className="sticky top-10 z-50 justify-end">
              <Select
                value={selectedOptionForVolumeChart}
                onChange={handleFilter}
                leftSection={<IconCalender />}
                rightSection={<IconChevronDown />}
                data={fibonacciTransactionOverviewChartOptions}
                placeholder="Filter"
                maxDropdownHeight={200}
              />
            </Flex>

            <TransactionOverViewCard title="Transaction Volume Over Time">
              <TransactionOverviewVolumeChart
                selectedOption={selectedOptionForVolumeChart as string}
              />
            </TransactionOverViewCard>

            <TransactionOverViewCard title="Transaction Value Over Time">
              <TransactionOverviewValueChart
                selectedOption={selectedOptionForValueChart as string}
              />
            </TransactionOverViewCard>
            <TransactionOverViewCard title="Trend of Flagged Transactions">
              <TransactionOverviewFlaggedChart
                selectedOption={selectedOptionForFlaggedChart as string}
              />
            </TransactionOverViewCard>
          </Stack>
        </Container>
      </Box>
    </InsightWrapper>
  );
};

export default OverviewContent;
