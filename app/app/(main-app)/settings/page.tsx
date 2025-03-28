import { authOptions } from '@/app/server/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import SettingPageClient from './components/settings-page-client';

export const metadata: Metadata = {
  title: 'Settings',
};

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  return <SettingPageClient {...{ session }} />;
};

export default SettingsPage;
