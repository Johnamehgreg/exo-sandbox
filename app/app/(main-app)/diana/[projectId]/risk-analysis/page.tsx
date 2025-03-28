import { Metadata } from 'next';
import RiskAnalysisClient from './components/risk-analysis-client';

export const metadata: Metadata = {
  title: 'Risk Analysis',
};

const RiskAnalysisPage = () => {
  return <RiskAnalysisClient />;
};

export default RiskAnalysisPage;
