import { useFibonacciQuickCount } from '@/hooks/query/dashboard';
import FlagActionRequiredContent from './flag-action-required-content';

const FlagActionRequired = () => {
  const { flaggedTransactionsLast24HrsCount, isLoading } =
    useFibonacciQuickCount();
  return (
    <FlagActionRequiredContent
      {...{ flaggedTransactionsLast24HrsCount, isLoading }}
    />
  );
};

export default FlagActionRequired;
