import { useQuery } from "@tanstack/react-query";
import apis from "../../services/api-services";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { ProjectAnalysisResponse } from "@/types/general";

export const useGetDianaOnboardingAnalysisStatus = ({
  projectId,
  enabled = false,
  enablePolling = true,
}: {
  projectId: string;
  enabled?: boolean;
  enablePolling?: boolean;
}) => {
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
    queryKey: ["get-diana-onboarding-analysis-status", projectId],
    queryFn: (): Promise<AxiosResponse<ProjectAnalysisResponse>> =>
      apis.diana.project.projectAnalysisStatus(projectId),
    enabled,
    staleTime: 60 * 1000, // Keep data fresh for 1 minute
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnReconnect: false, // Disable refetch on network reconnect
    refetchInterval: (query) => {
      if (!enablePolling) return false;
      const responseData = query.state.data?.data;
      if (responseData) {
        return responseData?.overall?.failed ||
          responseData?.overall?.successful
          ? false
          : 4000;
      }
      return 4000;
    },
    refetchIntervalInBackground: false,
    select: (response) => response.data, // Directly select the data part
  });

  const [projectStatus, setProjectStatus] =
    useState<null | ProjectAnalysisResponse>(null);

  useEffect(() => {
    if (isSuccess && isFetched && data) {
      // Only update state if the data has changed
      setProjectStatus((prevStatus) =>
        JSON.stringify(prevStatus) === JSON.stringify(data) ? prevStatus : data
      );
    }
  }, [isSuccess, isFetched, data]);

  return {
    isPending,
    status,
    refetch,
    isError,
    isFetching,
    error,
    isRefetching,
    projectStatus,
    isLoading,
    isSuccess,
  };
};
