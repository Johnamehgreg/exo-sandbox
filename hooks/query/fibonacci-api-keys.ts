import apis from '@/services/api-services';
import { ApiKeys } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type ApiKeysQueryParams = {
  page?: number;
  pageSize?: number;
  status?: 'active' | 'inactive';
};

export const useGetApiKeys = () => {
  const [query, setQuery] = useState<ApiKeysQueryParams>({
    page: 1,
    pageSize: 10,
  });

  const updateQuery = <K extends keyof ApiKeysQueryParams>(
    field: K,
    value: ApiKeysQueryParams[K]
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  const {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    isRefetching,
    isError,
    data,
    status,
    isFetching,
  } = useQuery({
    queryKey: ['get-api-keys', query],
    queryFn: () =>
      apis.apiKeys.getApiKeys(
        `?page=${query.page}&pageSize=${query.pageSize}${
          query.status ? `&status=${query.status}` : ''
        }`
      ),
  });

  const [apiKeys, setApiKeys] = useState<ApiKeys[]>([]);
  const [totalItem, setTotalItem] = useState<number>(0);

  useEffect(() => {
    if (isSuccess) {
      setApiKeys(data?.data?.data);
      setTotalItem(data?.data?.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data?.data?.data]);
  return {
    apiKeys,
    isPending,
    refetch,
    isError,
    error,
    isLoading,
    isSuccess,
    isRefetching,
    isFetched,
    isFetching,
    query,
    updateQuery,
    status,
    data,
    totalItem,
  };
};
