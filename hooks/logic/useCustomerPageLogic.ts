'use client';

import { useUiStore } from '@/app/store/ui.store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGetCustomersList } from '../query/fibonacci-customers';
import { useRouter } from 'nextjs-toploader/app';

export const useCustomerPageLogic = () => {
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'all-customers';
  const pageNumber = searchParams.get('page') || '1';
  const searchParam = searchParams.get('search') || '';

  const router = useRouter();

  const {
    totalItem,
    updateQuery,
    query,
    isLoading,
    isFetching,
    refetch,
    csvList,
    customersList,
    isRefetching,
    status,
    error,
  } = useGetCustomersList();

  useEffect(() => {
    setPage({ header: 'Customers' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const _pageNumber = Math.max(1, parseInt(pageNumber, 10));
    const isValidTab = ['all-customers', 'watchlist'].includes(tab);

    const newParams = new URLSearchParams(searchParams);

    if (isNaN(_pageNumber)) {
      newParams.set('page', '1');
    } else {
      updateQuery('page', _pageNumber);
    }

    if (!isValidTab) {
      newParams.set('tab', 'all-customers');
    }

    if (searchParam) {
      newParams.set('search', searchParam);
    }
    router.push(`?${newParams.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, pageNumber]);

  useEffect(() => {
    if (searchParam) {
      updateQuery('search', searchParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  useEffect(() => {
    if (tab === 'watchlist') {
      updateQuery('addedToWatchlist', true);
    } else {
      updateQuery('addedToWatchlist', undefined);
    }
    updateQuery('search', undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    if (!newTab) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    params.delete('search');
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
    updateQuery('page', newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    updateQuery('page', 1);
    updateQuery('pageSize', newPageSize);
  };

  const handleSearch = (value: string) => {
    updateQuery('search', value);
    updateQuery('page', 1);
  };

  return {
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
    csvList,
    customersList,
    handleSearch,
    searchParam,
    isRefetching,
    error,
    status,
  };
};
