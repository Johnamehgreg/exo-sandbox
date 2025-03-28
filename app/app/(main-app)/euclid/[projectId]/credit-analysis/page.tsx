import { Metadata } from 'next';
import CreditAnalysis from '../../components/credit-analysis';

export const metadata: Metadata = {
  title: 'Euclid',
};

const CreditAnalysisPage = () => {
  return <CreditAnalysis />
};

export default CreditAnalysisPage;
