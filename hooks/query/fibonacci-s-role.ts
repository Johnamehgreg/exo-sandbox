import { SettingsFRoleModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import apis from '../../services/api-services';

export type QueryParams = {
  search?: string;
};

export const useGetSettingRole = () => {
  const [query, setQuery] = useState<QueryParams>({
    search: '',
  });

  const updateQuery = <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
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
    queryKey: ['get-fibonacci-roles-setting', query],
    queryFn: () => apis.fibonacci.role.getRoles(`?search=${query.search}`),
  });
  const [roles, setRoles] = useState<SettingsFRoleModel[]>([]);
  const [totalItem, setTotalItem] = useState<number>(0);
  useEffect(() => {
    if (isSuccess && isFetched) {
      setTotalItem(data?.data?.total);
      const fetchRules = data?.data;
      setRoles(fetchRules);
    }
  }, [data, setRoles, roles, isFetched, isSuccess]);
  return {
    data,
    isPending,
    roles,
    refetch,
    isError,
    error,
    isLoading,
    isSuccess,
    isRefetching,
    isFetched,
    isFetching,
    query,
    totalItem,
    updateQuery,
    status,
  };
};
