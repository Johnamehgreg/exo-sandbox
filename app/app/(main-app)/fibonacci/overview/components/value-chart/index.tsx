import ChartSkeleton from '@/components/other/chart-skeleton';
import { useGetFibonacciTransactionChartData } from '@/hooks/query/fibonacciTransactionAnalytics';
import { colors } from '@/lib/app-config';
import {
  getLast14Days,
  getLast30Days,
  getLast7Days,
  getLastMonth,
  getThisMonth,
} from '@/lib/date-range-utils';
import { parseAndFormatDate } from '@/lib/helper';
import numeral from 'numeral';
import { useEffect, useMemo, useState } from 'react';
import ValueChart from './value-chart';

type Props = {
  selectedOption?: string;
};

const TransactionOverviewValueChart = ({ selectedOption }: Props) => {
  const [chartKey, setChartKey] = useState(0);

  const { data, isLoading, updateQuery } = useGetFibonacciTransactionChartData({
    type: 'value',
  });
  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1); // Increment key to force re-render
  }, [data]); // When data changes, re-render the chart
  const categories = data?.map((item) => item?._id);
  const chartData = useMemo(
    () => data?.map((item) => item?.totalValue ?? null) ?? [],
    [data]
  );

  const options = useMemo<ApexCharts.ApexOptions>(
    () => ({
      chart: {
        type: 'bar',
        height: 342,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
      },
      colors: [colors.vibrantgreen],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      xaxis: {
        categories,
        title: {
          text: 'TIMEFRAME',
          style: {
            fontSize: '10px',
            color: '#4B5563',
            lineHeight: '16px',
            fontWeight: 450,
          },
        },
        labels: {
          formatter: (val: string) => parseAndFormatDate(val),
        },
      },
      yaxis: {
        title: {
          text: 'TRANSACTION VALUE',
          style: {
            fontSize: '10px',
            color: '#4B5563',
            lineHeight: '16px',
            fontWeight: 450,
          },
        },
        labels: {
          formatter: (val: number) => numeral(val).format('0,0a'),
        },
      },
      markers: {
        size: 4,
        colors: ['#fff'],
        strokeColors: colors.vibrantgreen,
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    }),
    [categories]
  );

  const series = useMemo(
    () => [
      {
        name: 'Transaction Volume',
        data: chartData,
      },
    ],
    [chartData]
  );

  useEffect(() => {
    const updateChartDateRange = () => {
      let dateRange;

      switch (selectedOption) {
        case '7':
          dateRange = getLast7Days();
          break;
        case '14':
          dateRange = getLast14Days();
          break;
        case '30':
          dateRange = getLast30Days();
          break;
        case 'month':
          dateRange = getThisMonth();
          break;
        case 'lastMonth':
          dateRange = getLastMonth();
          break;
        default:
          return;
      }
      // Update the query with startDate and endDate
      updateQuery('startDate', dateRange.startDate);
      updateQuery('endDate', dateRange.endDate);
    };

    updateChartDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  if (isLoading) {
    return <ChartSkeleton />;
  }
  return (
    <ValueChart {...{ isLoading, chartData, chartKey, series, options }} />
  );
};

export default TransactionOverviewValueChart;
