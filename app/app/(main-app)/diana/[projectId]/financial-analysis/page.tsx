import { Metadata } from 'next';
import FinancialAnalysisClient from './components/financial-analysis-client';

export const metadata: Metadata = {
  title: 'Financial Analysis',
};

const FinancialAnalysisPage = () => {
  return <FinancialAnalysisClient />;
};

export default FinancialAnalysisPage;
