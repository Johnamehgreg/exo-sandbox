import apis from "@/services/api-services";
import { BatchAnalysis, BatchOverviewModel } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type BatchQueryParams = {
  page?: number;
  pageSize?: number;
};

export const useGetBatchAnalysis = () => {
  const [query, setQuery] = useState<BatchQueryParams>({
    page: 1,
    pageSize: 10,
  });

  const updateQuery = <K extends keyof BatchQueryParams>(
    field: K,
    value: BatchQueryParams[K]
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  // const { user } = userAuthStore();

  const queryData = `?organization_id=${'' as string}`;

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
    queryKey: ["get-all-batch-analysis", queryData],
    queryFn: () => apis.diana.batch.getAllBatchAnalysis(queryData),
  });

  const [batchAnalysisList, setBatchAnalysisList] = useState<BatchAnalysis[]>(
    []
  );

  useEffect(() => {
    if (isSuccess && isFetched) {
      setBatchAnalysisList(data?.data.batches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, isFetched, isFetching]);
  return {
    batchAnalysisList,
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
  };
};

export const useGetSingleBatchAnalysis = ({ id }: { id: string }) => {
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
    queryKey: ["get-single-batch-detail", id],
    queryFn: () => apis.diana.batch.getSingleBatchAnalysis(id),
  });

  const [batchAnalysisDetail, setBatchAnalysisDetail] =
    useState<BatchAnalysis | null>(null);

  useEffect(() => {
    if (isSuccess && isFetched) {
      setBatchAnalysisDetail(data?.data.batch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, isFetching, isFetched]);
  return {
    batchAnalysisDetail,
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
export const useGetBatchOverview = () => {
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
    queryKey: ["get-batch-overview"],
    queryFn: () => apis.diana.batch.getBatchOverview(),
  });

  const [batchOverview, setBatchBatchOverview] =
    useState<BatchOverviewModel | null>(null);

  useEffect(() => {
    if (isSuccess && isFetched) {
      setBatchBatchOverview(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, isFetched]);
  return {
    batchOverview,
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

export const useGetBatchAnalysisDetail = () => {
  // const { user } = userAuthStore();

  const queryData = `?organization_id=${'' as string}`;

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
    queryKey: ["get-all-batch-analysis-detail"],
    queryFn: () => apis.diana.batch.getAllBatchAnalysisDetail(queryData),
  });

  const [batchAnalysisListDetail, setBatchAnalysisListDetail] = useState<
    BatchAnalysis[]
  >([]);

  useEffect(() => {
    if (isSuccess && isFetched) {
      setBatchAnalysisListDetail(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, isFetched]);
  return {
    batchAnalysisListDetail,
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


