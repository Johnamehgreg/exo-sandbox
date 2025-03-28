import { Metadata } from 'next';
import OverviewPageClient from './components/overview-page-client';

export const metadata: Metadata = {
  title: 'Overview',
};

const DianaOverviewPage = () => {
  return <OverviewPageClient />;
};

export default DianaOverviewPage;
