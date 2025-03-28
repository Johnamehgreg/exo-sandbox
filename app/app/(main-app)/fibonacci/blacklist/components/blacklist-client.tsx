'use client';

import { useUiStore } from '@/app/store/ui.store';
import { useGetBlacklist } from '@/hooks/query/blacklist';
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useEffect, useState } from 'react';
import BlacklistPureComponent from './blacklist-pure-component';
import {
  BlacklistTabsType,
  BlacklistType,
  isValidBlacklistTab,
} from './extras';

interface Props {
  session: Session | null;
}

const BlacklistClient = ({ session }: Props) => {
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  const tabParam = searchParams.get('tab') as BlacklistTabsType;

  const activeTab = isValidBlacklistTab(tabParam as BlacklistTabsType)
    ? (tabParam as BlacklistTabsType)
    : BlacklistType.Customers;

  const {
    blacklists,
    updateQuery,
    isLoading,
    query,
    totalItem,
    refetch,
    csvList,
  } = useGetBlacklist();

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('tab', e as string);
    updateQuery('tab', e as string);
    updateQuery('page', 1);
    router.push(`?${params.toString()}`);
  };

  const handlePaginationChange = (val: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', val.toString());
    router.push(`?${params.toString()}`);
    updateQuery('page', val);
  };

  const onFilterClick = () => setShowFilter(true);

  const handleOpenUploadBlackListModal = () => {
    const params = new URLSearchParams(searchParams);
    params.set('upload', 'blacklist');
    return router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setPage({ header: 'Blacklist' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isValidBlacklistTab(tabParam as BlacklistTabsType)) {
      const params = new URLSearchParams(searchParams);
      params.set('tab', BlacklistType.Customers);
      router.push(`?${params.toString()}`);
    }
    updateQuery('tab', tabParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

  return (
    // @ts-expect-error typescript unable to infer type of csvlist
    <BlacklistPureComponent
      {...{
        showFilter,
        activeTab,
        blacklists,
        isLoading,
        query,
        totalItem,
        refetch,
        csvList,
        handleTabChange,
        onFilterClick,
        handlePaginationChange,
        handleOpenUploadBlackListModal,
        setShowFilter,
        updateQuery,
        session,
      }}
    />
  );
};

export default BlacklistClient;
