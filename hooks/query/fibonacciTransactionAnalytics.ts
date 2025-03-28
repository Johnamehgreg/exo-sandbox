'use client';
import { dynamicQueryEndpoint } from '@/lib/helper';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import apis from '../../services/api-services';

interface GetFibonacciTransactionChartDataQueryParams {
  startDate?: string;
  endDate?: string;
  type?: 'volume' | 'flagged' | 'value';
  [key: string]: unknown;
}

export interface FibonacciTransactionAnalytics {
  title: string;
  value: number | string;
  unit?: string;
  has_unit: boolean;
  isIncreasing?: 'Positive' | 'Negative';
  percentChange?: string;
  periodRange?: string;
}

export interface FibonacciAnalyticsResponse {
  analytics: FibonacciTransactionAnalytics[];
  comment: string;
}

export interface GetFibonacciTransactionChartDataResponse {
  _id:
    | string
    | {
        date: string;
        category: string;
      };
  count?: number;
  totalValue?: number;
}

export const useGetFibonacciTransactionAnalytics = () => {
  const {
    isPending,
    refetch,
    isLoading,
    isFetching,
    status,
    error,
    isError,
    data,
  } = useQuery({
    queryKey: ['fibonacci-transaction-analytics'],
    queryFn: () => apis.fibonacci.getFibonacciTransactionAnalytics(),
  });

  const fibonacciTransactionAnalytics: FibonacciAnalyticsResponse = data?.data;

  return {
    isPending,
    refetch,
    isLoading,
    status,
    isFetching,
    error,
    isError,
    fibonacciTransactionAnalytics,
  };
};

export const useGetFibonacciTransactionChartData = (
  initialQuery: GetFibonacciTransactionChartDataQueryParams
) => {
  const [query, setQuery] =
    useState<GetFibonacciTransactionChartDataQueryParams>(initialQuery);

  const updateQuery = <
    K extends keyof GetFibonacciTransactionChartDataQueryParams,
  >(
    field: K,
    value: GetFibonacciTransactionChartDataQueryParams[K]
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
  } = useQuery<GetFibonacciTransactionChartDataResponse[]>({
    queryKey: ['get-fibonacci-transaction-chart-data', query],
    queryFn: async () => {
      const response = await apis.fibonacci.getFibonacciTransactionChartData(
        dynamicQueryEndpoint(query)
      );
      return response?.data;
    },
  });

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
    updateQuery,
  };
};
