import { PaginationCard } from '@/components/card/pagination-card';
import { TableTopCard } from '@/components/card/table-top-card';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import FibonacciDownloadReport from '@/components/other/fibonacci-download-report';
import TableWrapper from '@/components/other/table-wrapper';
import { useDownloadCsv } from '@/hooks/logic/use-download-csv';
import { QueryParams } from '@/hooks/query/transaction';
import { TransactionModel } from '@/types/general';
import { Box, Container, Tabs, Transition } from '@mantine/core';
import { Session } from 'next-auth';
import { useRouter } from 'nextjs-toploader/app';
import { Dispatch, SetStateAction } from 'react';
import { AllTransactionTable } from './all-transaction-table';
import TransactionFilterModal from './transaction-filter-modal';

type Props = {
  session: Session | null;
  isLoading: boolean;
  query: QueryParams;
  totalItem: number;
  csvList: TransactionModel[];
  transactions: TransactionModel[];
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  handleTabChange: (value: string | null) => void;
  tab: string;
  updateQuery: <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
  ) => void;
  searchParams: URLSearchParams;
  csvFileName: string;
};

const TransactionPagePureComponent = ({
  session,
  isLoading,
  query,
  totalItem,
  csvList,
  transactions,
  showFilter,
  setShowFilter,
  handleTabChange,
  tab,
  updateQuery,
  searchParams,
}: Props) => {
  const router = useRouter();
  const tabParam = searchParams.get('tab') as string;

  const csvData = {
    type: 'transaction',
    review: tabParam === 'needs-review' ? 'needs_review' : undefined,
  } as const;

  const { isPending, downloadCSV } = useDownloadCsv(csvData);

  return (
    <>
      <DashboardStickyHeader label="Transactions">
        <FibonacciDownloadReport />
      </DashboardStickyHeader>
      <Container fluid className="dashboard-container-wrapper">
        <Box>
          <Tabs
            classNames={{
              list: 'tab-list-style',
            }}
            value={tab}
            onChange={handleTabChange}
          >
            <Tabs.List mb={'lg'}>
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="needs-review">Needs review</Tabs.Tab>
            </Tabs.List>
            <Transition
              mounted={tab === 'all'}
              transition="fade-left"
              exitDuration={100}
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel style={styles} value={tab}>
                  <Box className="w-full rounded-lg border border-gray-300 bg-white pt-1">
                    <TableTopCard
                      onChangeSearchValue={(searchValue) => {
                        updateQuery('search', searchValue);
                      }}
                      csvData={csvList}
                      downloadCSV={downloadCSV}
                      searchPlaceholder="Search for a transaction"
                      onFilterClick={() => setShowFilter(true)}
                      isPending={isPending}
                    />
                    <Box>
                      <TableWrapper
                        isLoading={isLoading}
                        skeletonCol={8}
                        skeletonRow={10}
                        data={transactions}
                        table={(data) => (
                          <AllTransactionTable transactionList={data} />
                        )}
                        notFoundMessage="No transaction found"
                      />
                    </Box>
                  </Box>
                </Tabs.Panel>
              )}
            </Transition>
            <Transition
              mounted={tab === 'needs-review'}
              transition="fade-left"
              exitDuration={100}
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel style={styles} value={tab}>
                  <Box className="w-full rounded-lg border border-gray-300 bg-white pt-1">
                    <TableTopCard
                      onChangeSearchValue={(searchValue) => {
                        updateQuery('search', searchValue);
                      }}
                      csvData={csvList}
                      searchPlaceholder="Search for a transaction"
                      onFilterClick={() => setShowFilter(true)}
                      downloadCSV={downloadCSV}
                      isPending={isPending}
                    />
                    <Box>
                      <TableWrapper
                        isLoading={isLoading}
                        skeletonCol={8}
                        skeletonRow={10}
                        data={transactions}
                        table={(data) => (
                          <AllTransactionTable transactionList={data} />
                        )}
                        notFoundMessage="No transaction found"
                      />
                    </Box>
                  </Box>
                </Tabs.Panel>
              )}
            </Transition>
          </Tabs>
          <TransactionFilterModal
            id={session?.user?._id}
            updateQuery={updateQuery}
            isVisible={showFilter}
            onClose={() => setShowFilter(false)}
          />
        </Box>

        <PaginationCard
          showPageItem
          onChange={(val) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', val.toString());
            router.push(`?${params.toString()}`);
            updateQuery('page', val);
          }}
          total={totalItem}
          page={query.page}
          setPageSize={(page: number) => {
            updateQuery('page', 1);
            updateQuery('pageSize', page);
          }}
          pageSize={query.pageSize}
        />
      </Container>
    </>
  );
};

export default TransactionPagePureComponent;
