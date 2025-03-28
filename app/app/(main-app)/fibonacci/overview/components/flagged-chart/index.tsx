import ChartSkeleton from '@/components/other/chart-skeleton';
import { useTransformDataForFlaggedChart } from '@/hooks/logic/use-transform-data-for-flagged-chart';
import { useGetFibonacciTransactionChartData } from '@/hooks/query/fibonacciTransactionAnalytics';
import {
  getLast14Days,
  getLast30Days,
  getLast7Days,
  getLastMonth,
  getThisMonth,
} from '@/lib/date-range-utils';
import { parseAndFormatDate } from '@/lib/helper';
import { useEffect, useMemo, useState } from 'react';
import FlaggedChart from './flagged-chart';

type Props = {
  selectedOption: string;
};

const TransactionOverviewFlaggedChart = ({ selectedOption }: Props) => {
  const [chartKey, setChartKey] = useState(0);

  const { data, isLoading, updateQuery } = useGetFibonacciTransactionChartData({
    type: 'flagged',
  });
  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1); // Increment key to force re-render
  }, [data]); // When data changes, re-render the chart

  const { categories, series } = useTransformDataForFlaggedChart(data);

  const options = useMemo<ApexCharts.ApexOptions>(
    () => ({
      chart: {
        type: 'area',
        stacked: true,
        height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ['#E63946', '#079ABF'], // Red and Blue colors for the areas
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth', // Smooth curve for the lines
        width: 2,
      },
      xaxis: {
        categories,
        labels: {
          formatter: (val: string) => parseAndFormatDate(val),
        },
      },
      yaxis: {
        title: {
          text: 'Transaction Volume',
          style: {
            fontSize: '10px',
            color: '#4B5563',
            lineHeight: '16px',
            fontWeight: 450,
          },
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: 'light',
      },
      grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 5,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
    }),
    [categories]
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
    // @ts-expect-error typescript unable to infer types for series
    <FlaggedChart {...{ isLoading, chartKey, series, options, categories }} />
  );
};

export default TransactionOverviewFlaggedChart;
