import { Box, Text } from '@mantine/core';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartEmptyState from './chart-empty-state';
import ChartErrorState from './chart-error-state';
import ChartLoadingState from './chart-loading-state';

interface TransactionData {
  _id: string;
  count: number;
  volume: number;
}

interface Props {
  data: TransactionData[];
  isLoading?: boolean;
  error?: Error | null;
  period?: 'day' | 'week' | 'month';
}

const formatCount = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm">
          Transactions:{' '}
          <span className="font-medium">{formatCount(payload[0].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomerTransactionCountChart = ({
  data,
  isLoading,
  error,
  period = 'week',
}: Props) => {
  if (isLoading) return <ChartLoadingState />;
  if (error) return <ChartErrorState message={error.message} />;
  if (!data?.length)
    return <ChartEmptyState message="No transaction count data available" />;

  const formatPeriodLabel = (periodId: string) => {
    if (period === 'week') {
      const [, week] = periodId.split('-W');
      return `Week ${week}`;
    }
    if (period === 'month') {
      const [year, month] = periodId.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleString(
        'default',
        { month: 'short' }
      );
    }
    if (period === 'day') {
      return new Date(periodId).toLocaleDateString('default', {
        month: 'short',
        day: 'numeric',
      });
    }
    return periodId;
  };

  const chartData = data
    .map((item) => ({
      period: formatPeriodLabel(item._id),
      count: item.count,
      originalId: item._id, // Keep original ID for sorting
    }))
    .sort((a, b) => a.originalId.localeCompare(b.originalId));

  // Find max count for setting appropriate Y-axis domain
  const maxCount = Math.max(...data.map((item) => item.count));
  const yAxisDomain = [0, Math.ceil(maxCount * 1.1)]; // Add 10% padding to max value

  return (
    <Box className="w-full rounded-lg bg-white p-4">
      <Text className="mb-4 text-[14px] font-semibold capitalize">
        Number of Transactions
      </Text>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#D7D7D7" />
            <XAxis
              dataKey="period"
              tick={{ fill: '#262527', fontSize: '14px' }}
              tickLine={{ stroke: '#D7D7D7' }}
              label={{
                value: 'Timeframe',
                position: 'insideBottom',
                offset: -10,
                fill: '#262527',
                style: { fontSize: '14px', fontWeight: 500 },
              }}
            />
            <YAxis
              domain={yAxisDomain}
              tick={{ fill: '#262527', fontSize: '14px' }}
              tickLine={{ stroke: '#D7D7D7' }}
              tickFormatter={formatCount}
              label={{
                value: 'Transaction Count',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                fill: '#262527',
                style: { fontSize: '14px', fontWeight: 500 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366F1" // Different color from volume chart
              strokeWidth={2}
              dot={{ r: 4, fill: '#6366F1' }}
              activeDot={{ r: 6, fill: '#6366F1' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default CustomerTransactionCountChart;
