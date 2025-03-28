'use client';
import { useUiStore } from '@/app/store/ui.store';
import { useGetTransaction } from '@/hooks/query/transaction';
import { usePrevious } from '@mantine/hooks';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useEffect, useState } from 'react';
import TransactionDetailsPureComponent from './transaction-details-pure-component';

const TransactionDetailsClient = () => {
  const { setPage } = useUiStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const detailTab = searchParams.get('detailTab');
  const redirect = searchParams.get('redirect');
  const type = searchParams.get('type');
  const redirectHeader = searchParams.get('h');
  const [preViousPage, setPreViousPage] = useState('');
  const previousValue = usePrevious(preViousPage);
  const { slug } = useParams<{ slug: string }>();

  const isBlacklist = redirect?.includes('blacklist');

  const getRedirectUrl = () => {
    if (redirect) {
      return redirect.replace('?redirect=', '');
    }
    return '';
  };

  const { refetch, isLoading, transactionDetail } = useGetTransaction({
    id: slug as string,
  });

  useEffect(() => {
    setPage({
      previousText:
        (isBlacklist ? 'blacklist detail' : redirectHeader) || 'Transactions',
      previousRouter: previousValue || getRedirectUrl(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preViousPage, isBlacklist]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (
      detailTab !== 'details' &&
      detailTab !== 'activity' &&
      detailTab !== 'fraudChecks'
    ) {
      if (isBlacklist) {
        const url = `${redirect}&type=${type}`;
        setPreViousPage(url as string);
        params.set('detailTab', 'details');
        params.set('redirect', url);
        return router.push(`?${params.toString()}`);
      }
      params.set('detailTab', 'details');

      params.set('h', redirectHeader || 'Transaction');
      router.push(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailTab]);
  return (
    // @ts-expect-error typescript unable to infer the tyypes
    <TransactionDetailsPureComponent
      {...{
        refetch,
        isLoading,
        transactionDetail,
        detailTab,
        searchParams,
        getRedirectUrl,
      }}
    />
  );
};

export default TransactionDetailsClient;
