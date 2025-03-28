import { getQueryClient } from '@/components/providers/tanstack-query-provider';
import { dynamicQueryEndpoint } from '@/lib/helper';
import apis from '@/services/api-services';
import { dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import PageClient from './components/page-client';

export const metadata: Metadata = {
  title: 'Customers',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CustomersPage = async ({ searchParams }: Props) => {
  const { tab } = await searchParams;
  const query = {
    page: 1,
    pageSize: 10,
    addedToWatchlist: tab === 'watchlist' ? true : undefined,
  };
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-customers-list', query],
    queryFn: async () => {
      const res = await apis.fibonacci.customers.getAllCustomers(
        dynamicQueryEndpoint(query)
      );
      return res?.data;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageClient />
    </HydrationBoundary>
  );
};

export default CustomersPage;
