import { PaginationCard } from '@/components/card/pagination-card';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { CustomersListQueryParams } from '@/hooks/query/fibonacci-customers';
import { CustomersListModel } from '@/types/general';
import { Container } from '@mantine/core';
import CustomerTabs from './customer-tabs';

type Props = {
  tab: string;
  isLoading: boolean;
  isFetching: boolean;
  searchParam: string;
  onTabChange: (tab: string) => void;
  handleSearch: (value: string) => void;
  updateQuery?: <K extends keyof CustomersListQueryParams>(
    field: K,
    value: CustomersListQueryParams[K]
  ) => void;
  customersList?: CustomersListModel[];
  csvList?: CustomersListModel[];
  handleOpenFilterModal: VoidFunction;
  handleCloseFilterModal: VoidFunction;
  openedFilterModal: boolean;
  query: CustomersListQueryParams;
  handleTabChange: (val: number) => void;
  handlePageChange: (val: number) => void;
  totalItem: number;
  pageNumber: number;
  handlePageSizeChange: (val: number) => void;
  refetch: VoidFunction;
};

const PageContent = ({
  handleTabChange,
  tab,
  handleOpenFilterModal,
  handleCloseFilterModal,
  searchParam,
  isLoading,
  isFetching,
  query,
  handleSearch,
  customersList,
  updateQuery,
  openedFilterModal,
  csvList,
  refetch,
  handlePageChange,
  totalItem,
  pageNumber,
  handlePageSizeChange,
}: Props) => {
  return (
    <>
      <DashboardStickyHeader label="Customers" />
      <Container fluid className="dashboard-container-wrapper">
        {/* @ts-expect-error typescript unable to infer types */}
        <CustomerTabs
          {...{
            tab,
            handleOpenFilterModal,
            handleCloseFilterModal,
            handleTabChange,
            searchParam,
            isLoading,
            isFetching,
            query,
            handleSearch,
            customersList,
            updateQuery,
            openedFilterModal,
            csvList,
            refetch,
            handlePageChange,
          }}
        />
        <PaginationCard
          showPageItem
          onChange={handlePageChange}
          total={tab === 'watchlist' ? 0 : totalItem!}
          page={+pageNumber!}
          setPageSize={handlePageSizeChange}
          pageSize={query.pageSize}
        />
      </Container>
    </>
  );
};

export default PageContent;
