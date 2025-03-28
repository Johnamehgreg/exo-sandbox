'use client';

import { useCustomerPageLogic } from '@/hooks/logic/useCustomerPageLogic';
import { useDisclosure } from '@mantine/hooks';
import PageContent from './page-content';

const PageClient = () => {
  const [
    openedFilterModal,
    { open: handleOpenFilterModal, close: handleCloseFilterModal },
  ] = useDisclosure(false);

  const {
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
    customersList,
    csvList,
    handleSearch,
    searchParam,
  } = useCustomerPageLogic();
  return (
    //  @ts-expect-error typescript unable to infer csvList
    <PageContent
      {...{
        openedFilterModal,
        handleOpenFilterModal,
        handleCloseFilterModal,
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
        customersList,
        csvList,
        handleSearch,
        searchParam,
      }}
    />
  );
};

export default PageClient;
