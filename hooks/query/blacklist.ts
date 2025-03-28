import { formatTransactionDate } from '@/lib/helper';
import apis from '@/services/api-services';
import { BlacklistModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export type QueryParams = {
  page?: number;
  tab?: string;
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  search?: string;
  period?: string;
};

export const useGetBlacklist = () => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 10,
    search: '',
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

  const getUrl = () => {
    switch (query.tab) {
      case 'users':
        return '/blacklist/blacklisted-users';
      case 'devices':
        return '/blacklist/blacklisted-devices';
      case 'accounts':
        return '/blacklist/blacklisted-accounts';
      default:
        return '/blacklist/blacklisted-users';
    }
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
    queryKey: ['get-state-list-blacklist', query, getUrl()],
    queryFn: () =>
      apis.blacklist.getBlacklist(
        `${getUrl()}?search=${query.search}&page=${query.page}&pageSize=${query.pageSize
        }`
      ),
  });
  const [blacklists, setBlacklist] = useState<BlacklistModel[]>([]);
  const [totalItem, setTotalItem] = useState<number>(0);
  useEffect(() => {
    if (isSuccess && isFetched) {
      setTotalItem(data?.data?.total);
      const fetchRules = data?.data?.data;
      setBlacklist(fetchRules);
    }
  }, [data, setBlacklist, blacklists, isFetched, isSuccess]);

  const getCsvData = useMemo(() => {
    switch (query.tab) {
      case "users":
        return blacklists?.map((csvData) => ({
          Date: formatTransactionDate(csvData?.createdAt ?? ""),
          ID: csvData?._id,
          "Account Type": csvData?.accountType || "N/A",
          State: csvData?.state || "N/A",
          City: csvData?.city || "N/A",
        }));

      case "devices":
        return blacklists?.map((csvData) => ({
          Date: formatTransactionDate(csvData?.createdAt ?? ""),
          ID: csvData?._id,
          Model: csvData?.model || "N/A",
          Manufacturer: csvData?.manufacturer || "N/A",
          "OS Name": csvData?.osName || "N/A",
          "OS Version": csvData?.osVersion || "N/A",
        }));

      case "accounts":
        return blacklists?.map((csvData) => ({
          Date: formatTransactionDate(csvData?.createdAt ?? ""),
          ID: csvData?._id,
          "Account Type": csvData?.type || "N/A",
          Account: csvData?.account || "N/A",
        }));

      default:
        // Default to users if no tab is specified
        return blacklists?.map((csvData) => ({
          Date: formatTransactionDate(csvData?.createdAt ?? ""),
          ID: csvData?._id,
          State: csvData?.state || "N/A",
          City: csvData?.city || "N/A",
          "Account Type": csvData?.accountType || "N/A",
        }));
    }
  }, [blacklists, query.tab])

  const csvList = getCsvData;

  return {
    data,
    isPending,
    blacklists,
    refetch,
    isError,
    error,
    isLoading,
    csvList,
    isSuccess,
    isRefetching,
    isFetched,
    isFetching,
    query,
    totalItem,
    updateQuery,
    status,
  };
};

export const useGetSingleBlacklist = ({
  id,
  type,
}: {
  id: string;
  type?: string;
}) => {
  const getUrl = () => {
    switch (type) {
      case 'users':
        return '/blacklist/blacklisted-user';
      case 'devices':
        return '/blacklist/blacklisted-device';
      case 'accounts':
        return '/blacklist/blacklisted-account';
      default:
        return '/blacklist/blacklisted-user';
    }
  };
  const url = `${getUrl()}/${id}`;
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
    queryKey: ['get-single-blacklist', id, url],
    queryFn: () => apis.blacklist.getSingleBlacklist(url),
  });
  const [blacklistDetail, setBlacklistDetail] = useState<BlacklistModel | null>(
    null
  );
  useEffect(() => {
    if (isSuccess && isFetched) {
      const teams = data?.data;
      setBlacklistDetail(teams);
    }
  }, [isSuccess, isFetching, isFetched, data]);
  return {
    isPending,
    blacklistDetail: blacklistDetail,
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
interface BlackListData {
  blacklisted: boolean;
  id: string;
}
interface Data {
  user?: BlackListData;
  device?: BlackListData;
  sender?: BlackListData;
  recipient?: BlackListData;
}

interface BlacklistTransactionQuery {
  transactionId: string;
  isEnabled: boolean;
}
export const useBlacklistTransaction = (
  initialQuery: BlacklistTransactionQuery
) => {
  const [query, setQuery] = useState<BlacklistTransactionQuery>(initialQuery);

  const updateQuery = <K extends keyof BlacklistTransactionQuery>(
    field: K,
    value: BlacklistTransactionQuery[K]
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
    status,
    isRefetching,
    isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ['get-blacklist-transaction-details', query.transactionId],
    queryFn: () => apis.blacklist.getBlacklistTransaction(query.transactionId),
    enabled: !!query.transactionId && query.isEnabled,
  });

  useEffect(() => {
    if (initialQuery.isEnabled) {
      updateQuery('isEnabled', true);
    }
  }, [initialQuery.isEnabled]);

  const blacklistDetail: Data = data?.data;

  return {
    isPending,
    blacklistDetail: blacklistDetail,
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
