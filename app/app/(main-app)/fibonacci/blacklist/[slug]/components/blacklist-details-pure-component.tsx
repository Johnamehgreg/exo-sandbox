import { PaginationCard } from '@/components/card/pagination-card';
import { TableTopCard } from '@/components/card/table-top-card';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { PageLWrapper } from '@/components/layout/page-wrapper';
import { ActionModal } from '@/components/modal/action-modal';
import { BackButton } from '@/components/other/back-button';
import TableWrapper from '@/components/other/table-wrapper';
import { useDownloadCsv } from '@/hooks/logic/use-download-csv';
import { QueryParams } from '@/hooks/query/transaction';
import { routes } from '@/lib/routes';
import { BlacklistModel, TransactionModel } from '@/types/general';
import { Box, Button, Container, Flex, Text } from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import { Dispatch, SetStateAction } from 'react';
import { AllTransactionTable } from '../../../transactions/components/all-transaction-table';
import TransactionFilterModal from '../../../transactions/components/transaction-filter-modal';
import Overview from './overview';

type Props = {
  navigateToCustomerDetails: (val: string) => void;
  isProcessing: boolean;
  slug: string;
  query: QueryParams;
  updateQuery: <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
  ) => void;
  totalItem: number;
  csvList: TransactionModel[];
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  showDelete: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  showFilter: boolean;
  isLoadingTransactions: boolean;
  isLoading: boolean;
  transactions: TransactionModel[];
  blacklistDetail: BlacklistModel;
  onDeleteBlacklist: ({
    cb,
    id,
    type,
    errorCb,
  }: {
    id: string;
    type: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => void;
  getTab: () => string;
  tabValue: string;
  getRedirectUrl: () => string;
  type: string;
};

const BlacklistDetailsPureComponent = ({
  navigateToCustomerDetails,
  isProcessing,
  slug,
  query,
  updateQuery,
  totalItem,
  csvList,
  isLoadingTransactions,
  transactions,
  isLoading,
  blacklistDetail,
  onDeleteBlacklist,
  showDelete,
  showFilter,
  setShowFilter,
  getTab,
  setShowDelete,
  tabValue,
  getRedirectUrl,
  type,
}: Props) => {
  const router = useRouter();
  const { isPending, downloadCSV } = useDownloadCsv({
    type: 'transaction',
  });

  return (
    <>
      <DashboardStickyHeader label="Blacklist" />
      <PageLWrapper>
        <Container fluid className="dashboard-container-wrapper">
          <BackButton />
          <Flex mb={'2rem'} className="flex-wrap items-center justify-between">
            <Text className="page-header">ID: {slug}</Text>
            <Flex>
              {getTab() === 'user' && blacklistDetail?.customerId && (
                <Button
                  onClick={() =>
                    navigateToCustomerDetails(blacklistDetail?.customerId || '')
                  }
                  size="xs"
                  variant="default"
                  className="mr-2"
                >
                  View customer details
                </Button>
              )}
              <Button
                onClick={() => setShowDelete(true)}
                size="xs"
                variant="default"
              >
                Remove from blacklist
              </Button>
            </Flex>
          </Flex>
          <Box>
            <Overview {...{ isLoading, blacklistDetail }} />
            <Text className="page-header !text-[1rem]" mb={'md'}>
              Transactions
            </Text>

            <Box className="dashboard-border table-container">
              <TableTopCard
                hideFilter
                onChangeSearchValue={(searchValue) => {
                  updateQuery('search', searchValue);
                }}
                csvData={csvList}
                searchPlaceholder="Search for a transaction"
                onFilterClick={() => setShowFilter(true)}
                downloadCSV={downloadCSV}
                isPending={isPending}
              />
              <TableWrapper
                data={transactions}
                isLoading={isLoadingTransactions}
                skeletonCol={10}
                skeletonRow={8}
                notFoundMessage="No Transaction found"
                table={(data) => (
                  <AllTransactionTable
                    redirect={`${routes.fibonacci.blacklistDetail}/${slug}?previousValue=${tabValue}&type=${type}`}
                    transactionList={data}
                  />
                )}
              />
            </Box>
          </Box>
          <PaginationCard
            showPageItem
            onChange={(val) => {
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
        <TransactionFilterModal
          updateQuery={updateQuery}
          isVisible={showFilter}
          onClose={() => setShowFilter(false)}
        />

        <ActionModal
          message="Removing a user from blacklist means the user can now complete transactions, anywhere and anytime"
          title="Are you sure you want to remove user from blacklist"
          isProcessing={isProcessing}
          onSubmit={() => {
            onDeleteBlacklist({
              id: slug as string,
              type: tabValue as string,
              cb() {
                setShowDelete(false);
                router.push(getRedirectUrl());
              },
            });
          }}
          onClose={() => {
            setShowDelete(false);
          }}
          isVisible={showDelete}
        />
      </PageLWrapper>
    </>
  );
};

export default BlacklistDetailsPureComponent;
