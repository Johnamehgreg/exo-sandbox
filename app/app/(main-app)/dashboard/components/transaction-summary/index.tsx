'use client';
import { useFibonacciDashboardOverview } from '@/hooks/query/dashboard';
import TransactionSummaryContent from './transaction-summary-content';

const FibonacciTransactionSummaryCard = () => {
  const { analytics, isLoading } = useFibonacciDashboardOverview();

  return <TransactionSummaryContent {...{ analytics, isLoading }} />;
};

export default FibonacciTransactionSummaryCard;
