import { TableTopCard } from '@/components/card/table-top-card';
import TableWrapper from '@/components/other/table-wrapper';
import { useDownloadCsv } from '@/hooks/logic/use-download-csv';
import { CustomersListQueryParams } from '@/hooks/query/fibonacci-customers';
import { CustomersListModel, ExportCsvModel } from '@/types/general';
import { Box, Tabs, Transition } from '@mantine/core';
import AllCustomersTable from './all-customers-table';

interface Props {
  tab: string;
  isLoading: boolean;
  isFetching: boolean;
  currentTab: string;
  updateQuery?: <K extends keyof CustomersListQueryParams>(
    field: K,
    value: CustomersListQueryParams[K]
  ) => void;
  customersList?: CustomersListModel[];
  csvList?: CustomersListModel[];
  handleSearch: (value: string) => void;
  onFilterClick?: () => void;
  searchParam: string;
  query: CustomersListQueryParams;
}

const TabContent: React.FC<Props> = ({
  tab,
  currentTab,
  customersList,
  csvList,
  onFilterClick,
  isLoading,
  updateQuery,
}) => {
  const csvData = {
    type: 'customer',
    addedToWatchlist: currentTab === 'watchlist' ? true : undefined,
  } satisfies ExportCsvModel;

  const { isPending, downloadCSV } = useDownloadCsv(csvData);

  return (
    <Transition
      mounted={currentTab === tab}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Tabs.Panel style={styles} value={tab}>
          <Box className="w-full rounded-lg border border-gray-300 bg-white pt-1">
            <TableTopCard
              onChangeSearchValue={(searchValue) => {
                updateQuery?.('search', searchValue);
              }}
              csvData={csvList}
              isPending={isPending}
              downloadCSV={downloadCSV}
              searchPlaceholder="Search by ID, name"
              onFilterClick={onFilterClick}
            />
            <TableWrapper
              data={customersList!}
              skeletonCol={6}
              skeletonRow={10}
              isLoading={isLoading}
              notFoundMessage="No customers found"
              table={(data) => <AllCustomersTable customersList={data} />}
            />
          </Box>
        </Tabs.Panel>
      )}
    </Transition>
  );
};

export default TabContent;
