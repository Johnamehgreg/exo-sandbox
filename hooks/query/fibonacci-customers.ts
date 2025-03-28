import { dynamicQueryEndpoint } from '@/lib/helper';
import apis from '@/services/api-services';
import {
  CustomerDetailsResponse,
  CustomersResponse,
  CustomerTransactionChartData,
  ICustomerDeviceTrailModel,
  ICustomerLocationTrailModel,
  QueryParams,
} from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export type CustomersListQueryParams = {
  // customerId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  riskLevel?: string;
  accountStatus?: string;
  addedToWatchlist?: boolean;
  addedToBlacklist?: boolean;
};

export const useGetCustomersList = () => {
  const [query, setQuery] = useState<CustomersListQueryParams>({
    page: 1,
    pageSize: 10,
  });
  const updateQuery = <K extends keyof CustomersListQueryParams>(
    field: K,
    value: CustomersListQueryParams[K]
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  const { refetch, isLoading, error, isFetching, data, status, isRefetching } =
    useQuery<CustomersResponse>({
      queryKey: ['get-customers-list', query],
      queryFn: async () => {
        const res = await apis.fibonacci.customers.getAllCustomers(
          dynamicQueryEndpoint(query)
        );
        return res?.data;
      },
    });

  const customersList = data?.data;
  const totalItem = data?.total;

  const csvList = customersList?.map((customer) => ({
    customerId: customer?._id,
    dateOfCreation: format(customer?.createdAt, 'MMM dd yyyy'),
    noOfTransactions: customer?.transactionCount,
  }));

  return {
    customersList,
    status,
    error,
    query,
    totalItem,
    updateQuery,
    csvList,
    isLoading,
    isFetching,
    refetch,
    isRefetching,
  };
};

export const useGetCustomerDetails = ({ id }: { id: string }) => {
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
  } = useQuery<CustomerDetailsResponse>({
    queryKey: ['get-customer-details', id],
    queryFn: async () => {
      const res = await apis.fibonacci.customers.getCustomerDetails(id);
      return res?.data;
    },
    enabled: !!id,
  });

  const customerDetail = data;

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
    customerDetail,
  };
};

export const useGetCustomerDeviceTrailDetails = ({
  id,
  startDate,
  endDate,
  search = '',
}: {
  id: string;
  startDate: string;
  endDate: string;
  search: string;
}) => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 10,
    startDate,
    endDate,
    search,
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

  // uncomment this when the api accommodates the extra qery params
  const queryUrl = `?search=${query.search}&page=${query.page}&pageSize=${
    query.pageSize
  }&startDate=${query.startDate}${
    query.endDate ? `&endDate=${query.endDate}` : ''
  }${query.period ? `&period=${query.period}` : ''}`;

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
    queryKey: ['customer-details-device-trail', id, query],
    queryFn: () => {
      return apis.fibonacci.customers.getCustomerDeviceTrail(id, queryUrl);
    },
  });

  const [customerDeviceTrail, setCustomerDeviceTrail] =
    useState<ICustomerDeviceTrailModel | null>(null);

  useEffect(() => {
    if (status === 'success') {
      setCustomerDeviceTrail(data?.data);
    }
  }, [status, data]);

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
    customerDeviceTrail,
    updateQuery,
  };
};

export const useGetCustomerLocationTrailDetails = ({
  id,
  startDate,
  endDate,
  search = '',
}: {
  id: string;
  startDate: string;
  endDate: string;
  search: string;
}) => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 10,
    startDate,
    endDate,
    search,
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

  // uncomment this when the api accommodates the extra qery params
  const queryUrl = `?search=${query.search}&page=${query.page}&pageSize=${
    query.pageSize
  }&startDate=${query.startDate}${
    query.endDate ? `&endDate=${query.endDate}` : ''
  }`;

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
    queryKey: ['customer-details-location-trail', id, query],
    queryFn: () => {
      return apis.fibonacci.customers.getCustomerLocationTrail(id, queryUrl);
    },
  });

  const [customerLocationTrail, setCustomerLocationTrail] =
    useState<ICustomerLocationTrailModel | null>(null);

  useEffect(() => {
    if (status === 'success') {
      setCustomerLocationTrail(data?.data);
    }
  }, [status, data]);

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
    customerLocationTrail,
    updateQuery,
  };
};

export const useGetCustomerTransactionChart = ({
  id,
  startDate,
  endDate,
  period,
}: {
  id: string;
  startDate: string;
  endDate: string;
  period: string;
}) => {
  const [query, setQuery] = useState<CustomersListQueryParams>({
    startDate,
    endDate,
    period,
  });
  const updateQuery = <K extends keyof CustomersListQueryParams>(
    field: K,
    value: CustomersListQueryParams[K]
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  const queryUrl = `?startDate=${query.startDate}${
    query.endDate ? `&endDate=${query.endDate}` : ''
  }${query.period ? `&period=${query.period}` : ''}`;

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
    queryKey: ['customer-transaction-chart', id, query],
    queryFn: () => {
      return apis.fibonacci.customers.getCustomerTransactionChart(id, queryUrl);
    },
  });

  const [customerTransactionChartData, setCustomerTransactionChartData] =
    useState<CustomerTransactionChartData | null>(null);

  useEffect(() => {
    if (status === 'success') {
      setCustomerTransactionChartData(data?.data);
    }
  }, [status, data]);

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
    customerTransactionChartData,
    updateQuery,
  };
};
