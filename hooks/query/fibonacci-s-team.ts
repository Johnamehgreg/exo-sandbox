import { TeamMemberModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import apis from '../../services/api-services';

export type QueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
};

export const useGetSettingTeam = () => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 10,
    search: '',
    role: '',
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
    queryKey: ['get-fibonacci-team-setting', query],
    queryFn: () =>
      apis.fibonacci.team.getTeamMember(
        `?search=${query.search}&page=${query.page}&pageSize=${query.pageSize}`
      ),
  });
  const [teams, setTeams] = useState<TeamMemberModel[]>([]);
  const [isDataFetch, setIsDataFetch] = useState(false);
  const [totalItem, setTotalItem] = useState<number>(0);
  useEffect(() => {
    if (isSuccess && isFetched) {
      setTotalItem(data?.data?.total);
      const fetchRules = data?.data;
      setTeams(fetchRules);
      setIsDataFetch(true);
    }
  }, [data, setTeams, teams, isFetched, isSuccess]);
  return {
    data,
    isPending,
    teams,
    refetch,
    isError,
    error,
    isLoading,
    isSuccess,
    isRefetching,
    isFetched,
    isFetching,
    query,
    isDataFetch,
    totalItem,
    updateQuery,
    status,
  };
};
