import { authOptions } from '@/app/server/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import PageClient from './components/page-client';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return <PageClient session={session} />;
};

export default DashboardPage;
