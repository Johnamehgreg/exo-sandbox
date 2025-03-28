import { dynamicQueryEndpoint } from '@/lib/helper';
import { TeamMemberModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import apis from '../../services/api-services';

export interface GetTeamMembersQueryParams {
  search?: string;
  assigned?: number;
  role?: string;
  isEnabled: boolean;
}

export const useGetTeamMember = (initialQuery: GetTeamMembersQueryParams) => {
  const [query, setQuery] = useState<GetTeamMembersQueryParams>(initialQuery);

  const updateQuery = <K extends keyof GetTeamMembersQueryParams>(
    field: K,
    value: GetTeamMembersQueryParams[K]
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (initialQuery.isEnabled) {
      updateQuery('isEnabled', true);
    }
  }, [initialQuery.isEnabled]);

  const {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    status,
    isRefetching,
    isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ['get-all-teams', query],
    // @ts-expect-error typescript unable to infer types
    queryFn: () => apis.team.getTeamMembers(dynamicQueryEndpoint(query)),
    enabled: query.isEnabled,
  });

  const teamMembers: TeamMemberModel[] = data?.data;

  return {
    isPending,
    teamMembers,
    refetch,
    isError,
    isFetching,
    error,
    isRefetching,
    status,
    isLoading,
    isSuccess,
    updateQuery,
  };
};
