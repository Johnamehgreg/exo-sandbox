import { NetworkGraphData } from '@/types/general';
import { Box, Text } from '@mantine/core';
import TransactionRelationshipChart from './transaction-relationship-chart';

interface Props {
  data?: NetworkGraphData;
  error?: Error | null;
  isLoading?: boolean;
}

const CustomerTransactionRelationshipChart = ({
  data,
  error,
  isLoading,
}: Props) => {
  return (
    <Box className="w-full rounded-lg bg-white p-4">
      <Text className="mb-4 text-[14px] font-semibold capitalize">
        Transaction Relationship
      </Text>

      <div className="flex w-full justify-end">
        <TransactionRelationshipChart {...{ data, error, isLoading }} />
      </div>
    </Box>
  );
};

export default CustomerTransactionRelationshipChart;
