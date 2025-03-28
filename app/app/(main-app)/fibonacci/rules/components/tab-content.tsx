import { PaginationCard } from '@/components/card/pagination-card';
import { TableTopCard } from '@/components/card/table-top-card';
import DataNotFound from '@/components/other/DataNotFound';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { RuleQueryParams } from '@/hooks/query/rules';
import { RulesModel } from '@/types/general';
import { Box, Tabs, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import RulesFilterModal from './rules-filter-modal';
import RulesTable from './rules-table';

interface Props {
  tab: string;
  isLoading: boolean;
  isFetching: boolean;
  currentTab: string;
  updateQuery: <K extends keyof RuleQueryParams>(
    field: K,
    value: RuleQueryParams[K]
  ) => void;
  rulesList?: RulesModel[];
  handleSearch: (value: string) => void;
  onFilterClick?: () => void;
  searchParam: string;
  query: RuleQueryParams;
  refetch?: () => void;
  handlePageSizeChange: (newPageSize: number) => void;
  pageNumber?: string;
  totalItem?: number;
  pageSize?: number;
  handlePageChange: (newPage: number) => void;
}

const TabContent: React.FC<Props> = ({
  tab,
  currentTab,
  rulesList,
  handleSearch,
  isLoading,
  updateQuery,
  refetch,
  searchParam,
  pageSize,
  handlePageSizeChange,
  pageNumber,
  totalItem,
  handlePageChange,
}) => {
  const [
    openedFilterModal,
    { open: handleOpenFilterModal, close: handleCloseFilterModal },
  ] = useDisclosure(false);

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
              onChangeSearchValue={handleSearch}
              searchValue={`${searchParam}`}
              searchPlaceholder="Search by ID, name"
              onFilterClick={handleOpenFilterModal}
            />
            {isLoading && <TableSkeleton row={10} col={5} />}
            {!isLoading && rulesList && rulesList.length > 0 && (
              <RulesTable refetch={refetch} rulesList={rulesList} />
            )}
            {!isLoading && rulesList && rulesList.length === 0 && (
              <DataNotFound message="No customers found" />
            )}
          </Box>

          <RulesFilterModal
            updateQuery={updateQuery}
            onClose={handleCloseFilterModal}
            isVisible={openedFilterModal}
          />
          <PaginationCard
            showPageItem
            onChange={handlePageChange}
            total={totalItem as number}
            page={+pageNumber!}
            setPageSize={handlePageSizeChange}
            pageSize={pageSize}
          />
        </Tabs.Panel>
      )}
    </Transition>
  );
};

export default TabContent;
