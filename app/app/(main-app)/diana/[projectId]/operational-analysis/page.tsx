import { Metadata } from 'next';
import OperationalAnalysisClient from './components/operational-analysis-client';

export const metadata: Metadata = {
  title: 'Operational Analysis',
};

const OperationalAnalysisPage = () => {
  return <OperationalAnalysisClient />;
};

export default OperationalAnalysisPage;
