import Tab from '@/components/other/tab';
import { Tabs } from '@mantine/core';
import { rulesTabList, RulesTabType } from './extras';
import TabContent from './tab-content';
import { RulesModel } from '@/types/general';
import { RuleQueryParams } from '@/hooks/query/rules';
import InstructFibonacciTab from './instruct-fibonacci-tab';


interface Props {
  tab: string;
  isLoading: boolean;
  isFetching: boolean;
  handleTabChange: (val: string) => void;
  rulesList?: RulesModel[];
  updateQuery: <K extends keyof RuleQueryParams>(
    field: K,
    value: RuleQueryParams[K]
  ) => void;
    handleSearch: (value: string) => void;
    searchParam: string;  
    refetch?: () => void;
    query: RuleQueryParams;
    handlePageSizeChange: (newPageSize: number) => void;
    pageNumber?: string;
    totalItem?: number
    pageSize?: number;
    handlePageChange: (newPage: number) => void;
}

const RuleTabs: React.FC<Props> = ({
  tab,
  handleTabChange,
  isLoading,
  isFetching,
  rulesList,
  updateQuery,
  query,
  handleSearch,
  refetch,
  searchParam,
  pageSize,
  handlePageSizeChange,
  pageNumber,
  totalItem,
  handlePageChange
}) => {
  return (
    <>
      <Tabs
        classNames={{
          list: 'tab-list-style',
        }}
        value={tab}
        onChange={(e) => {
          handleTabChange(e as string)
        }}
      >
        <Tabs.List mb={'lg'}>
        {rulesTabList?.map((tabItem) => (
          <Tab
            key={tabItem.value}
            tab={tab}
            tabName={tabItem.value}
            text={tabItem.label}
          />
        ))}
        </Tabs.List>

        <InstructFibonacciTab 
         tab={RulesTabType.Instruct_Fibonacci}
         currentTab={tab}
        />
        <TabContent
        pageNumber={pageNumber}
        totalItem={totalItem}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        refetch={refetch}
        tab={RulesTabType.All_Rules}
        isLoading={isLoading}
        isFetching={isFetching}
        currentTab={tab}
        rulesList={rulesList}
        updateQuery={updateQuery}
        handleSearch={handleSearch}
        searchParam={searchParam}
        query={query}
        />
        <TabContent
         pageNumber={pageNumber}
         totalItem={totalItem}
         pageSize={pageSize}
         handlePageChange={handlePageChange}
         handlePageSizeChange={handlePageSizeChange}
        tab={RulesTabType.Active}
        isLoading={isLoading}
        isFetching={isFetching}
        currentTab={tab}
        rulesList={rulesList}
        updateQuery={updateQuery}
        handleSearch={handleSearch}
        searchParam={searchParam}
        query={query}
        />
        <TabContent
         pageNumber={pageNumber}
         totalItem={totalItem}
         pageSize={pageSize}
         handlePageChange={handlePageChange}
         handlePageSizeChange={handlePageSizeChange}
        tab={RulesTabType.Disabled}
        isLoading={isLoading}
        isFetching={isFetching}
        currentTab={tab}
        rulesList={rulesList}
        updateQuery={updateQuery}
        handleSearch={handleSearch}
        searchParam={searchParam}
        query={query}
        />
      </Tabs>
    
    </>
  );
};

export default RuleTabs;
