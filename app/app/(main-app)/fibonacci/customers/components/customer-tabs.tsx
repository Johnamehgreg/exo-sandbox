import Tab from '@/components/other/tab';
import { CustomersListQueryParams } from '@/hooks/query/fibonacci-customers';
import { CustomersListModel } from '@/types/general';
import { Tabs } from '@mantine/core';
import CustomerFilterModal from './customer-filter-modal';
import TabContent from './tab-content';

interface Props {
  tab: string;
  isLoading: boolean;
  isFetching: boolean;
  searchParam: string;
  handleTabChange: (tab: string) => void;
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
}

const CustomerTabs: React.FC<Props> = ({
  tab,
  customersList,
  isLoading,
  isFetching,
  csvList,
  updateQuery,
  handleSearch,
  searchParam,
  handleOpenFilterModal,
  handleCloseFilterModal,
  openedFilterModal,
  query,
  handleTabChange,
}) => {
  return (
    <>
      <Tabs
        classNames={{
          list: 'tab-list-style',
        }}
        value={tab}
        onChange={(e) => handleTabChange(e as string)}
      >
        <Tabs.List mb={'lg'}>
          <Tab tab={tab} tabName="all-customers" text="All Customers" />
          <Tab tab={tab} tabName="watchlist" />
        </Tabs.List>
        <TabContent
          tab="all-customers"
          isLoading={isLoading}
          isFetching={isFetching}
          currentTab={tab}
          customersList={customersList}
          csvList={csvList}
          updateQuery={updateQuery}
          onFilterClick={handleOpenFilterModal}
          handleSearch={handleSearch}
          searchParam={searchParam}
          query={query}
        />
        <TabContent
          tab="watchlist"
          isLoading={isLoading}
          isFetching={isFetching}
          currentTab={tab}
          customersList={customersList}
          csvList={csvList}
          updateQuery={updateQuery}
          handleSearch={handleSearch}
          searchParam={searchParam}
          query={query}
          onFilterClick={handleOpenFilterModal}
        />
      </Tabs>
      <CustomerFilterModal
        isVisible={openedFilterModal}
        onClose={handleCloseFilterModal}
        updateQuery={updateQuery}
      />
    </>
  );
};

export default CustomerTabs;
