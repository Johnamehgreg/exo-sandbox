import { Metadata } from 'next';
import OverviewClient from './components/overview-client';

export const metadata: Metadata = {
  title: 'Overview',
};

const FibonacciOverviewPAge = () => {
  return <OverviewClient />;
};

export default FibonacciOverviewPAge;
