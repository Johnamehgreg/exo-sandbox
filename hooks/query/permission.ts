import { PermissionModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import apis from '../../services/api-services';

export const useGetPermissions = () => {
  const {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    status,
    isRefetching,
    isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ['get-all-permission'],
    queryFn: () => apis.fibonacci.permissions.getPermissions(),
  });
  const [permissions, setPermissions] = useState<PermissionModel[]>([]);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const profile = data?.data;
      setPermissions(profile);
    }
  }, [isSuccess, isFetching, isFetched, data]);
  return {
    isPending,
    permissions,
    refetch,
    isError,
    isFetching,
    error,
    isRefetching,
    status,
    isLoading,
    isSuccess,
  };
};
