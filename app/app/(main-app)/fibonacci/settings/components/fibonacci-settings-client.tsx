'use client';
import { useUiStore } from '@/app/store/ui.store';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useEffect } from 'react';
import {
  isValidSettingsTab,
  SettingsTabsType,
  SettingsTabType,
} from './extras';
import FibonacciSettingsPureComponent from './fibonacci-settings-pure-component';

const FibonacciSettingsClient = () => {
  const router = useRouter();
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab') as SettingsTabsType;

  const activeTab = isValidSettingsTab(tabParam as SettingsTabsType)
    ? (tabParam as SettingsTabsType)
    : SettingsTabType.Team;

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    const params = new URLSearchParams(searchParams);
    params.set('tab', e as string);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (!isValidSettingsTab(tabParam as SettingsTabsType)) {
      const params = new URLSearchParams(searchParams);
      params.set('tab', SettingsTabType.Team);
      router.push(`?${params.toString()}`);
    }
  }, [tabParam, router, searchParams]);

  useEffect(() => {
    setPage({ header: 'Settings' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FibonacciSettingsPureComponent {...{ activeTab, handleTabChange }} />;
};

export default FibonacciSettingsClient;
