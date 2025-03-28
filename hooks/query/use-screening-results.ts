import { dynamicQueryEndpoint } from '@/lib/helper';
import apis from '@/services/api-services';
import { ScreeningResults, ScreeningResultsID } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export type QueryParams = {
  page?: number;
  pageSize?: number;
};

export const useScreeningResults = (customerId: string) => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
    pageSize: 10,
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

  const queryResult = useQuery<ScreeningResults>({
    queryKey: ['screeningResults', customerId, query],
    queryFn: async () => {
      const { data } = await apis.screening.screeningResults(
        customerId,
        dynamicQueryEndpoint(query)
      );
      return data;
    },
    enabled: !!customerId,
  });

  // Return both the query result and the updateQuery function
  return {
    ...queryResult,
    updateQuery,
    query,
  };
};

export const useScreeningResultsById = (
  customerId: string,
  resultId: string
) => {
  return useQuery<ScreeningResultsID>({
    queryKey: ['screeningResultsById', customerId, resultId],
    queryFn: async () => {
      const { data } = await apis.screening.getScreeningResult(
        customerId,
        resultId
      );
      return data;
    },
    enabled: !!resultId && !!customerId,
  });
};
