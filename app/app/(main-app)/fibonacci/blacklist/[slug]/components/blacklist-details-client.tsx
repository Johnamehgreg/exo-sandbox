'use client';

import { useUiStore } from '@/app/store/ui.store';
import { env } from '@/env';
import { useBlacklist } from '@/hooks/mutate/use-blacklist';
import { useGetSingleBlacklist } from '@/hooks/query/blacklist';
import { useGetTransactions } from '@/hooks/query/transaction';
import { getUrlParams } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlacklistDetailsPureComponent from './blacklist-details-pure-component';

const BlacklistDetailsClient = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const redirect = searchParams.get('redirect') as string;
  const type = searchParams.get('type') as string;
  const previousValue = searchParams.get('previousValue');

  const tabValue = previousValue || getUrlParams(redirect as string);

  const getRedirectUrl = () => {
    if (redirect) {
      return redirect.replace('?redirect=', '');
    }
    return '';
  };

  useEffect(() => {
    setPage({
      previousText: 'blacklist',
      previousRouter: getRedirectUrl() || routes.fibonacci.blacklist,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTab = () => {
    switch (tabValue) {
      case 'users':
        return 'user';
      case 'accounts':
        return type;
      case 'devices':
        return 'device';
      default:
        return 'users';
    }
  };

  const { onDeleteBlacklist, isLoading: isProcessing } = useBlacklist();

  const { isLoading, blacklistDetail } = useGetSingleBlacklist({
    id: slug as string,
    type: tabValue as string,
  });

  const {
    transactions,
    updateQuery,
    isLoading: isLoadingTransactions,
    query,
    totalItem,
    csvList,
  } = useGetTransactions(`&blackListEntity=${getTab()}&blackListId=${slug}`);

  const navigateToCustomerDetails = (customerId: string) => {
    if (!env.NEXT_PUBLIC_CUSTOMER_DETAILS_PAGE_ENABLED) return;
    router.push(`${routes.fibonacci.customersDetail}/${customerId}`);
  };

  return (
    // @ts-expect-error typescripy unable to infer types
    <BlacklistDetailsPureComponent
      {...{
        query,
        totalItem,
        csvList,
        isLoadingTransactions,
        transactions,
        updateQuery,
        isLoading,
        blacklistDetail,
        onDeleteBlacklist,
        navigateToCustomerDetails,
        showDelete,
        setShowDelete,
        showFilter,
        setShowFilter,
        isProcessing,
        slug,
        getTab,
        tabValue,
        getRedirectUrl,
        type,
      }}
    />
  );
};

export default BlacklistDetailsClient;
