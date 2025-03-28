import { Box, Text } from '@mantine/core';
import { format, parseISO } from 'date-fns';
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

interface RiskData {
  _id: string;
  createdAt: string;
  riskScore: number;
}

interface Props {
  data: RiskData[];
  isLoading?: boolean;
  error?: Error | null;
}

const CustomerTransactionFraudRiskChart = ({
  data,
  isLoading,
  error,
}: Props) => {
  if (isLoading) return <ChartLoadingState />;
  if (error) return <ChartErrorState message={error.message} />;
  if (!data?.length)
    return <ChartEmptyState message="No risk score data available" />;

  const chartData = data
    .map((item) => ({
      timestamp: format(parseISO(item.createdAt), 'MM/dd HH:mm'),
      riskScore: item.riskScore * 100, // Convert to percentage
    }))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return (
    <Box className="w-full rounded-lg bg-white p-4">
      <Text className="mb-4 text-[14px] font-semibold capitalize">
        Change in transaction risk
      </Text>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#D7D7D7" />
            <XAxis
              dataKey="timestamp"
              tick={{ fill: '#262527', fontSize: '14px' }}
              tickLine={{ stroke: '#D7D7D7' }}
              label={{
                value: 'Timestamp',
                position: 'insideBottom',
                offset: -10,
                fill: '#262527',
                style: { fontSize: '14px', fontWeight: 500 },
              }}
            />
            <YAxis
              tick={{ fill: '#262527', fontSize: '14px' }}
              tickLine={{ stroke: '#D7D7D7' }}
              domain={[0, 100]}
              label={{
                value: 'Risk Score (%)',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                fill: '#262527',
                style: { fontSize: '14px', fontWeight: 500 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                color: '#262527',
                fontSize: '14px',
              }}
            />
            <Line
              type="monotone"
              dataKey="riskScore"
              stroke="#D05E43"
              strokeWidth={2}
              dot={{ r: 4, fill: '#D05E43' }}
              activeDot={{ r: 6, fill: '#D05E43' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default CustomerTransactionFraudRiskChart;
