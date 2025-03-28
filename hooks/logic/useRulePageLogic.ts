import { rulesTabList } from '@/app/app/(main-app)/fibonacci/rules/components/extras';
import { useUiStore } from '@/app/store/ui.store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';
import { useGetRules } from '../query/rules';

export const useRulePageLogic = () => {
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || '';
  const pageNumber = searchParams.get('page') || '1';
  const searchParam = searchParams.get('search') || '';

  const router = useRouter();

  const {
    rulesList,
    updateQuery,
    isLoading,
    error,
    isFetching,
    query,
    status,
    totalItem,
    refetch,
  } = useGetRules();

  useEffect(() => {
    setPage({ header: 'Customers' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const _pageNumber = Math.max(1, parseInt(pageNumber, 10));
    const isValidTab = rulesTabList.map((item) => item.value).includes(tab);
    const newParams = new URLSearchParams(searchParams);

    if (isNaN(_pageNumber)) {
      newParams.set('page', '1');
    } else {
      updateQuery('page', _pageNumber);
    }

    if (!isValidTab) {
      newParams.set('tab', rulesTabList[0].value);
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

  const handleTabChange = (newTab: string) => {
    updateQuery('search', undefined);
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
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.set('page', '1');
    params.set('tab', tab);
    updateQuery('search', value);
    updateQuery('page', 1);
    router.push(`?${params.toString()}`);
  };

  return {
    tab,
    pageNumber,
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
    error,
    status,
    rulesList,
    totalItem,
  };
};
