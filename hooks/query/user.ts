import apis from '@/services/api-services';
import { useQuery } from '@tanstack/react-query';

export const useGetUserProfile = (isEnabled = true) => {
  const {
    isPending,
    refetch,
    isLoading,
    status,
    error,
    isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: () => apis.auth.user.getUserProfile(),
    enabled: isEnabled,
  });
  const userDetail = data?.data;
  return {
    isPending,
    status,
    user: userDetail,
    isFetching,
    refetch,
    isError,
    error,
    isLoading,
  };
};
