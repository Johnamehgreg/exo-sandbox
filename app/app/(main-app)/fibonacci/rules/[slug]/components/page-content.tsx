import {
  Box,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Select,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

import { PageLWrapper } from '@/components/layout/page-wrapper';
import { BackButton } from '@/components/other/back-button';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { IconInfo } from '@/public/assets/svg/icon-info';
import React from 'react';
import { generateYearOptions } from '@/lib/helper';
import { TableTopCard } from '@/components/card/table-top-card';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import DataNotFound from '@/components/other/DataNotFound';
import { PaginationCard } from '@/components/card/pagination-card';
import RulesAnalyticsTable from './rules-analytics-table';
import RulesTransactionFilterModel from './rules-transaction-filter-model';
import RulesAnalyticsMetricCard from './rules-analytics-metric-card';
import RulesChart from './rules-chart';
import { useRuleDetail } from '@/hooks/logic/use-rule-detail';
import { ApexOptions } from 'apexcharts';
import { useDownloadCsv } from '@/hooks/logic/use-download-csv';

interface Prop {
  id: string;
}

const PageContent: React.FC<Prop> = ({ id }) => {
  const {
    isLoadingAnalytics,
    analyticsData,
    metrics,
    yearFilter,
    setYearFilter,
    updateGraphQuery,
    isLoadingGraphData,
    options,
    series,
    setShowFilter,
    transactionQuery,
    updateTransactionQuery,
    isLoadingTransactionData,
    transactionsData,
    showFilter,
    isFetching,
  } = useRuleDetail({ id });
  const { isPending, downloadCSV } = useDownloadCsv({
    type: 'transaction',
  });

  return (
    <PageLWrapper isLoading={isLoadingAnalytics}>
      <Container fluid>
        <DashboardStickyHeader label="Instruction Analytics" />
        <Box className="inner-card-padding dashboard-container-wrapper relative">
          {isFetching && (
            <Center className="absolute top-[100px] w-full">
              <Loader type="bars" />
            </Center>
          )}
          <BackButton />
          <Title className="mb-2 text-lg font-medium text-[#1A1A25]">
            {analyticsData?.description || 'Rule Details'}
          </Title>
          <Box className="space-y-6">
            <Box className="dashboard-border rounded-lg p-6">
              <Box className="space-y-4">
                <Flex className="items-center gap-x-2">
                  <Title className="font-twk text-base font-normal">
                    Analytics
                  </Title>
                  <IconInfo className="h-4 w-4" />
                </Flex>
                <SimpleGrid cols={3}>
                  {metrics.map((metric, index) => (
                    <RulesAnalyticsMetricCard
                      key={`metric-${index}`}
                      title={metric.title}
                      value={metric.value}
                    />
                  ))}
                </SimpleGrid>

                <Divider />

                {/* Chart */}
                <Card withBorder shadow="sm" p="lg" radius="md">
                  <Flex justify="space-between" align="center" mb="md">
                    <Text size="lg">Rule Trigger Frequency</Text>
                    <Select
                      value={yearFilter}
                      onChange={(val) => {
                        setYearFilter(val || '');
                        updateGraphQuery('year', val as string);
                      }}
                      data={generateYearOptions()}
                      placeholder="Filter by year"
                      maxDropdownHeight={200}
                    />
                  </Flex>
                  <Box>
                    <RulesChart
                      isLoading={isLoadingGraphData}
                      options={options as ApexOptions}
                      series={series}
                      yearFilter={yearFilter}
                    />
                  </Box>
                </Card>
              </Box>
            </Box>

            <Box className="space-y-6">
              <Title className="font-twk text-base font-normal text-text">
                Recent transactions that triggered rule
              </Title>

              <Box className="dashboard-border table-container relative bg-white">
                <TableTopCard
                  searchPlaceholder="Search by ID, assigned to"
                  hideExport
                  onFilterClick={() => setShowFilter(true)}
                  searchValue={transactionQuery.search}
                  onChangeSearchValue={(searchValue) => {
                    updateTransactionQuery('search', searchValue);
                  }}
                  downloadCSV={downloadCSV}
                  isPending={isPending}
                />
                {isLoadingTransactionData ? (
                  <TableSkeleton row={10} col={4} />
                ) : (transactionsData?.data?.length as number) > 0 ? (
                  <RulesAnalyticsTable
                    transactionsData={transactionsData?.data || []}
                  />
                ) : (
                  <DataNotFound message="No transaction found" />
                )}
              </Box>
              <RulesTransactionFilterModel
                updateQuery={updateTransactionQuery}
                isVisible={showFilter}
                onClose={() => setShowFilter(false)}
              />
              <PaginationCard
                showPageItem
                onChange={(val) => {
                  updateTransactionQuery('page', val);
                }}
                total={transactionsData?.total as number}
                page={transactionQuery.page || 1}
                setPageSize={(newPageSize: number) => {
                  updateTransactionQuery('pageSize', newPageSize);
                  updateTransactionQuery('page', 1);
                }}
                pageSize={transactionQuery.pageSize}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </PageLWrapper>
  );
};

export default PageContent;
