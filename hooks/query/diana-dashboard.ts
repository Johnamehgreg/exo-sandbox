/* eslint-disable @typescript-eslint/no-explicit-any */
import apis from '@/services/api-services';
import { AnalysisTypeEnum } from '@/types/common';
import { ReportModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetFinancialAnalysis = ({
  project_id,
}: {
  project_id: string;
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
    queryKey: ['get-financial-analysis', project_id],
    queryFn: () =>
      apis.diana.getAnalysis(AnalysisTypeEnum.FINANCIAL, project_id ?? ''),
  });
  const [finData, setFinData] = useState<any | null>(null);
  const [isIncomplete, setIsIncomplete] = useState(false);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const teams = data?.data;
      setFinData(teams);
      if (data?.data?._id && !data?.data.Analysis) {
        setIsIncomplete(true);
      } else {
        setIsIncomplete(false);
      }
    }
  }, [isSuccess, isFetching, isFetched, data]);

  // TODO integrate Roll bar error tracking
  // useEffect(() => {
  //   if (isError && error) {
  //     trackError(error, { message: `Failed to fetch financial analysis data` });
  //   }
  // }, [isError, error]);

  return {
    isPending,
    finData: finData,
    refetch,
    isError,
    isFetching,
    error,
    isRefetching,
    status,
    isLoading,
    isIncomplete,
    isSuccess,
  };
};
export const useGetOperationalAnalysis = ({
  project_id,
}: {
  project_id: string;
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
    queryKey: ['get-operational-analysis', project_id],
    queryFn: () =>
      apis.diana.getAnalysis(AnalysisTypeEnum.OPERATIONAL, project_id ?? ''),
  });
  const [finData, setFinData] = useState<any | null>(null);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const teams = data?.data;
      setFinData(teams);
    }
  }, [isSuccess, isFetching, isFetched, data]);

  return {
    isPending,
    finData: finData,
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
export const useGeRiskAnalysis = ({ project_id }: { project_id: string }) => {
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
    queryKey: ['get-risk-analysis', project_id],
    queryFn: () =>
      apis.diana.getAnalysis(AnalysisTypeEnum.RISK, project_id ?? ''),
  });
  const [finData, setFinData] = useState<any | null>(null);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const teams = data?.data;
      setFinData(teams);
    }
  }, [isSuccess, isFetching, isFetched, data]);

  // TODO integrate Roll bar error tracking
  // useEffect(() => {
  //   if (isError && error) {
  //     trackError(error, { message: `Failed to fetch risk analysis data` });
  //   }
  // }, [isError, error]);

  return {
    isPending,
    finData: finData,
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
export const useGetGeoSpatialAnalysis = ({
  project_id,
}: {
  project_id: string;
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
    queryKey: ['get-geo-spatial-analysis', project_id],
    queryFn: () =>
      apis.diana.getAnalysis(AnalysisTypeEnum.GEOSPATIAL, project_id ?? ''),
  });
  const [finData, setFinData] = useState<any | null>(null);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const teams = data?.data;
      setFinData(teams);
    }
  }, [isSuccess, isFetching, isFetched, data]);

  // TODO integrate Roll bar error tracking
  // useEffect(() => {
  //   if (isError && error) {
  //     trackError(error, {
  //       message: `Failed to fetch geo-spatial analysis data`,
  //     });
  //   }
  // }, [isError, error]);

  return {
    isPending,
    finData: finData,
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
export const useGetOverview = ({ project_id }: { project_id: string }) => {
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
    queryKey: ['get-overview', project_id],
    queryFn: () =>
      apis.diana.getAnalysis(AnalysisTypeEnum.OVERVIEW, project_id ?? ''),
    enabled: !!project_id,
  });
  const [finData, setFinData] = useState<any | null>(null);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const teams = data?.data;
      setFinData(teams);
    }
  }, [isSuccess, isFetching, isFetched, data]);

  // TODO integrate Roll bar error tracking
  // useEffect(() => {
  //   if (isError && error) {
  //     trackError(error, { message: `Failed to fetch overview analysis data` });
  //   }
  // }, [isError, error]);

  return {
    isPending,
    finData: finData,
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


export const useDownloadReport = ({
  project_id,
  enabled,
}: {
  project_id: string;
  enabled?: boolean;
}) => {
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
    queryKey: ["get-overview-report", project_id],
    queryFn: () => apis.diana.project.getProjectReport(project_id),
    enabled: enabled,
  });

  const [report, setReport] = useState<ReportModel | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setReport(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data?.data?.data]);
  return {
    report,
    isPending,
    refetch,
    isError,
    error,
    isLoading,
    isSuccess,
    isRefetching,
    isFetched,
    isFetching,
    status,
    data,
  };
};
