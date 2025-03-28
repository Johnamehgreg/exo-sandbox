import { PaginationCard } from '@/components/card/pagination-card';
import { TableTopCard } from '@/components/card/table-top-card';
import DataNotFound from '@/components/other/DataNotFound';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useDownloadCsv } from '@/hooks/logic/use-download-csv';
import { useGetTransactions } from '@/hooks/query/transaction';
import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import AllCustomerTransactionTable from './all-customer-transaction-table';
import CustomerTransactionFilterDrawer from './customer-transaction-filter-drawer';

interface Props {
  customerId?: string;
}

const CustomerActivitySection = ({ customerId }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const { isPending, downloadCSV } = useDownloadCsv({
    type: 'transaction',
  });
  const { updateQuery, isLoading, csvList, data, totalItem, query } =
    useGetTransactions();

  useEffect(() => {
    if (customerId) {
      updateQuery('customerId', customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <>
      <Box className="dashboard-border table-container bg-white">
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
        {isLoading ? (
          <>
            <TableSkeleton row={10} col={8} />
          </>
        ) : (
          <AllCustomerTransactionTable
            transactionList={data?.data?.data || []}
          />
        )}
        {!isLoading && data?.data?.data?.length === 0 && (
          <DataNotFound message="No transaction found" />
        )}

        <CustomerTransactionFilterDrawer
          isVisible={showFilter}
          onClose={() => setShowFilter(false)}
          // @ts-expect-error typescript unable to infer types
          updateQuery={updateQuery}
        />
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
    </>
  );
};

export default CustomerActivitySection;
