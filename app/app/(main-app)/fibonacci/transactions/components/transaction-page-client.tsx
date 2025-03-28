'use client';

import { useUiStore } from '@/app/store/ui.store';
import { useGetTransactions } from '@/hooks/query/transaction';
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useEffect, useState } from 'react';
import TransactionPagePureComponent from './transaction-page-pure-component';
import { format } from 'date-fns';

interface Props {
  session: Session | null;
}

const TransactionPageClient = ({ session }: Props) => {
  const { setPage } = useUiStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQuery, isLoading, query, totalItem, csvList, transactions } =
    useGetTransactions();

  const [showFilter, setShowFilter] = useState(false);
  const tab = searchParams.get('tab') || 'all';

  const csvFileName = `transactions_${format(new Date(), 'yyyy-MM-dd')}`;

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setPage({ header: 'Transactions' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (tab !== 'all' && tab !== 'needs-review') {
      params.set('tab', 'all');
    }

    router.push(`?${params.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (tab === 'all') {
      updateQuery('review', undefined);
    } else {
      updateQuery('review', 'needs_review');
    }
    updateQuery('search', undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    // @ts-expect-error typescript unable to infer types
    <TransactionPagePureComponent
      {...{
        session,
        isLoading,
        query,
        totalItem,
        csvList,
        transactions,
        showFilter,
        setShowFilter,
        handleTabChange,
        searchParams,
        tab,
        updateQuery,
        csvFileName,
      }}
    />
  );
};

export default TransactionPageClient;
