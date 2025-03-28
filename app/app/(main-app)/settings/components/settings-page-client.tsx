'use client';
import { createQueryString } from '@/lib/utils';
import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  isValidSettingsTab,
  settingsTabList,
  SettingsType,
  SettingTabsType,
} from './extras';
import SettingsPagePureComponent from './settings-page-pure-component';

interface Prop {
  session: Session | null;
}

const SettingPageClient = ({ session }: Prop) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as SettingTabsType;
  const router = useRouter();

  const activeTab = isValidSettingsTab(tabParam as SettingTabsType)
    ? (tabParam as SettingTabsType)
    : SettingsType.Profile;

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    router.push(`?${createQueryString('tab', e as SettingTabsType)}`);
  };
  const filteredTabs = settingsTabList.filter(
    (tab: (typeof settingsTabList)[number]) => {
      // Show only "Profile" and "Change password" when isAdmin is false
      if (!session?.user?.isOwner) {
        return (
          tab.value === SettingsType.Profile ||
          tab.value === SettingsType.ChangePassword
        );
      }
      return tab;
    }
  );

  useEffect(() => {
    if (!isValidSettingsTab(tabParam as SettingTabsType)) {
      router.push(`?${createQueryString('tab', SettingsType.Profile)}`);
    }
  }, [tabParam, router, searchParams]);

  return (
    <SettingsPagePureComponent
      {...{ activeTab, handleTabChange, filteredTabs }}
    />
  );
};

export default SettingPageClient;
