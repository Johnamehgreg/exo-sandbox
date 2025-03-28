import { authOptions } from '@/app/server/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import BlacklistClient from './components/blacklist-client';

export const metadata: Metadata = {
  title: 'Blacklist',
};

const BlacklistPage = async () => {
  const session = await getServerSession(authOptions)
  return <BlacklistClient session={session} />;
};

export default BlacklistPage;
