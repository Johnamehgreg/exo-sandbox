import { authOptions } from '@/app/server/auth';
import { getQueryClient } from '@/components/providers/tanstack-query-provider';
import apis from '@/services/api-services';
import { dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import TransactionPageClient from './components/transaction-page-client';

export const metadata: Metadata = {
  title: 'Transactions',
};

const TransactionPage = async () => {
  const queryClient = getQueryClient();
  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ['get-transactions', { page: 1, pageSize: 10 }],
    queryFn: () => apis.fibonacci.transaction.getTransactions('page=1&pageSize=10'),
  });

  return <HydrationBoundary state={ dehydrate(queryClient) }><TransactionPageClient {...{ session }} /></HydrationBoundary>;
};

export default TransactionPage;
