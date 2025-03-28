import { Box, Text } from '@mantine/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartLoadingState from './chart-loading-state';
import ChartErrorState from './chart-error-state';
import ChartEmptyState from './chart-empty-state';

interface VolumeData {
  _id: string;
  count: number;
  volume: number;
}

interface Props {
  data: VolumeData[];
  isLoading?: boolean;
  error?: Error | null;
  period?: 'day' | 'week' | 'month';
}

const formatVolume = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 10000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

// @ts-expect-error typescript unable to infer types
const CustomTooltip = ({ active, payload, label }: unknown) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm">
          Volume:{' '}
          <span className="font-medium">{formatVolume(payload[0].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomerTransactionVolumeChart = ({
  data,
  isLoading,
  error,
  period = 'week',
}: Props) => {
  if (isLoading) return <ChartLoadingState />;
  if (error) return <ChartErrorState message={error.message} />;
  if (!data?.length)
    return <ChartEmptyState message="No transaction volume data available" />;

  const formatPeriodLabel = (periodId: string) => {
    if (period === 'week') {
      const [, week] = periodId.split('-W');
      return `Week ${week}`;
    }
    // Add more period formatting as needed
    return periodId;
  };

  const chartData = data.map((item) => ({
    period: formatPeriodLabel(item._id),
    volume: item.volume,
  }));

  return (
    <Box className="w-full rounded-lg bg-white p-4">
      <Text className="mb-4 text-[14px] font-semibold capitalize">
        Volume of Transaction
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
              tick={{ fill: '#262527', fontSize: '14px' }}
              tickLine={{ stroke: '#D7D7D7' }}
              tickFormatter={formatVolume}
              label={{
                value: 'Volume',
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
              dataKey="volume"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4, fill: '#10B981' }}
              activeDot={{ r: 6, fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default CustomerTransactionVolumeChart;
