import { toast } from '@/components/ui/toast';
import { trackError } from '@/lib/error-tracking';
import apis from '@/services/api-services';
import {
  GetFibonacciDashboardOverviewResponse,
  GetFibonacciQuickCountResponse,
  WhatIfModel,
} from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const useFibonacciDashboardOverview = () => {
  const {
    isPending,
    refetch,
    isLoading,
    isFetched,
    isRefetching,
    isError,
    data,
    error,
    isFetching,
    status,
  } = useQuery<GetFibonacciDashboardOverviewResponse>({
    queryKey: ['fibonacci-dashboard-overview'],
    queryFn: async () => {
      const response = await apis.fibonacci.getFibonacciOverview();
      return response?.data;
    },
  });
  const analytics = data?.analytics;
  return {
    isPending,
    refetch,
    isLoading,
    isFetched,
    isRefetching,
    isError,
    data,
    status,
    analytics,
    error,
    isFetching,
  };
};

export const useFibonacciQuickCount = () => {
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
  } = useQuery<GetFibonacciQuickCountResponse>({
    queryKey: ['fibonacci-quick-count'],
    queryFn: async () => {
      const response = await apis.fibonacci.getFibonacciQuickCount();
      return response?.data;
    },
  });
  const blacklistedLast24HrsCount = data?.blacklistedLast24HrsCount;
  const flaggedTransactionsLast24HrsCount =
    data?.flaggedTransactionsLast24HrsCount;
  return {
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
    blacklistedLast24HrsCount,
    flaggedTransactionsLast24HrsCount,
  };
};

export const useWhatIf = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [whatIfData, setWhatIfData] = useState<WhatIfModel | null>(null);
  const onUpdateWaitList = ({
    cb,
    values,
    errorCb,
  }: {
    values?: { new_tax_credit: number };
    cb?: (res: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    const url =
      typeof values?.new_tax_credit === "number"
        ? `?new_tax_credit=${values?.new_tax_credit}&project_id=${projectId}`
        : `?project_id=${projectId}`;
    setIsFetching(true);
    apis.diana
      .updateWhatIf(url)
      .then((res) => {
        setIsLoading(false);
        setIsFetching(false);
        cb?.(res);
        setWhatIfData(res.data);
        setIsError(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setIsFetching(false);
        trackError(e, { message: `Failed to update 'what if'` });
        errorCb?.(e.response.data.message);
        if (typeof values?.new_tax_credit === "number") {
          toast({
            message: "Something went wrong",
            variant: "error",
          });
        } else {
          setIsError(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    onUpdateWaitList,
    isLoading,
    whatIfData,
    isFetching,
    isError,
  };

};
