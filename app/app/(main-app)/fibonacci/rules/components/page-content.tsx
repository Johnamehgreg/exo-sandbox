import { DashboardStickyHeader } from "@/components/dashboard/dashboard-sticky-header";
import { Container } from "@mantine/core";
import RuleTabs from "./rule-tabs";
import { useRulePageLogic } from "@/hooks/logic/useRulePageLogic";

const PageContent = () => {


const {
    rulesList,
    tab,
    pageNumber,
    totalItem,
    query,
    isLoading,
    isFetching,
    refetch,
    handleTabChange,
    handlePageChange,
    handlePageSizeChange,
    updateQuery,
    handleSearch,
    searchParam,
} = useRulePageLogic()
  return (
    <>
      <DashboardStickyHeader label="Instructions" />
         <Container fluid className="dashboard-container-wrapper">
          <RuleTabs {
            ...{
              refetch,
              handleTabChange,
              handlePageChange,
              totalItem,
              tab,
              pageNumber,
              isLoading,
              isFetching,
              rulesList,
              updateQuery,
              query,
              handleSearch,
              searchParam,
              handlePageSizeChange,
              pageSize: query.pageSize
            }
          } />
         </Container>
    </>
  )
}

export default PageContent