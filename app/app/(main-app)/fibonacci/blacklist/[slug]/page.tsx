import { Metadata } from 'next';
import BlacklistDetailsClient from './components/blacklist-details-client';

export const metadata: Metadata = {
  title: 'Blacklist',
};

const BlacklistDetailsPage = () => {
  return <BlacklistDetailsClient />;
};

export default BlacklistDetailsPage;
