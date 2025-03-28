'use client';

import {
  dynamicQueryEndpoint,
  formattedAmount,
  formatTransactionDate,
} from '@/lib/helper';
import apis from '@/services/api-services';
import {
  TransactionActivityLogModal,
  TransactionIssuersModel,
  TransactionModel,
  TransactionNoteModel,
} from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export type QueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  review?: string;
  issuerIds?: string[];
  assignedTo?: string;
  customerId?: string;
};

export const useGetTransactions = (params?: string) => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 10,
    startDate: '',
    endDate: '',
    search: '',
    review: '',
    issuerIds: [],
    assignedTo: '',
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

  const buildQueryString = (params: QueryParams): string => {
    const queryString = new URLSearchParams();

    if (params.search) queryString.append('search', params.search);
    if (params.startDate) queryString.append('startDate', params.startDate);
    if (params.endDate) queryString.append('endDate', params.endDate);
    if (params.page) queryString.append('page', params.page.toString());
    if (params.pageSize)
      queryString.append('pageSize', params.pageSize.toString());
    if (params.review) queryString.append('review', params.review);
    if (params.assignedTo) queryString.append('assignedTo', params.assignedTo);
    if (params.issuerIds?.length) {
      params.issuerIds.forEach((id) => queryString.append('issuerIds[]', id));
    }
    if (params.customerId) queryString.append('customerId', params.customerId);

    return queryString.toString();
  };

  const queryString = buildQueryString(query);

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
    queryKey: ['get-transactions', query],
    queryFn: () =>
      apis.fibonacci.transaction.getTransactions(
        queryString ? `?${queryString}${params || ''}` : ''
      ),
  });

  const transactions: TransactionModel[] = data?.data?.data;
  const totalItem: number = data?.data?.total;

  const csvList = transactions?.map((csvData) => {
    return {
      Date: formatTransactionDate(
        csvData?.transactionData?.transactionDate ?? ""
      ),
      "Transaction ID": csvData?._id,
      "Issuer":csvData?.transactionData?.issuer,
      "Channel": csvData?.transactionData?.channel,
      "Risk score": csvData?.insight?.riskScore?.toFixed(2),
      "Risk level": csvData?.insight?.riskBand,
      "Amount": formattedAmount(
        csvData?.transactionData?.amount,
        csvData?.transactionData?.currency
      ),
      "Review": csvData?.review?.replace("_", " "),
    };
  });
  
  return {
    data,
    isPending,
    transactions,
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
    csvList,
  };
};

export const useGetTransaction = ({ id }: { id: string }) => {
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
    queryKey: ['get-single-transaction', id],
    queryFn: () => apis.fibonacci.transaction.getSingleTransaction(id),
  });

  const transactionDetail: TransactionModel = data?.data;

  return {
    isPending,
    transactionDetail,
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
export const useGetTransactionNote = ({ id }: { id: string }) => {
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
    queryKey: ['get-transaction-note'],
    queryFn: () => apis.fibonacci.transaction.getTransactionNote(id),
  });

  const transactionNote: TransactionNoteModel[] = data?.data?.data;

  return {
    isPending,
    transactionNote,
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

export const useGetTransactionIssuers = (isEnabled?: boolean) => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 1000000,
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
    status,
    isRefetching,
    isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ['get-issuers', query],
    queryFn: () =>
      apis.fibonacci.transaction.getTransactionIssuer(
        dynamicQueryEndpoint(query)
      ),
    enabled: isEnabled,
  });

  const issuers: TransactionIssuersModel[] = data?.data?.data;

  return {
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
    query,
    updateQuery,
    issuers,
  };
};

export const useGetTransationActivity = (id?: string) => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 100,
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
    status,
    isRefetching,
    isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ['getTransactionActivity', query, id],
    queryFn: (): Promise<TransactionActivityLogModal[]> =>
      apis.fibonacci.transaction
        .getTransactionActivity(dynamicQueryEndpoint(query), id as string)
        .then((res) => res?.data?.data),
    enabled: !!id,
  });

  return {
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
    updateQuery,
    query,
    data,
  };
};
