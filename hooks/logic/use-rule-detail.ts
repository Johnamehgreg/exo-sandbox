import { useUiStore } from '@/app/store/ui.store';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useGetRuleGraph,
  useGetRulesAnalytics,
  useGetTransactionsByRuleId,
} from '../query/rules';
import { colors } from '@/lib/app-config';
import { getMonthName } from '@/lib/helper';
import numeral from 'numeral';
import { routes } from '@/lib/routes';

export const useRuleDetail = ({ id }: { id: string }) => {
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);

  // values for search parameters
  const pageParam = searchParams.get('page');
  const pageSizeParam = searchParams.get('pageSize');
  const startDateParam = searchParams.get('startDate');
  const endDataParam = searchParams.get('endDate');
  const searchParam = searchParams.get('search');
  const redirect = searchParams.get('redirect');

  // Fetch analytics data
  const {
    isLoading: isLoadingAnalytics,
    refetch,
    isFetching,
    error,
    status,
    data: analyticsData,
  } = useGetRulesAnalytics(id as string);

  const {
    isLoading: isLoadingTransactionData,
    data: transactionsData,
    updateQuery: updateTransactionQuery,
    query: transactionQuery,
  } = useGetTransactionsByRuleId(id as string);

  const {
    isLoading: isLoadingGraphData,
    data: graphData,
    updateQuery: updateGraphQuery,
  } = useGetRuleGraph(id as string);

  const [yearFilter, setYearFilter] = useState<string>('');

  // Set default year filter based on the data from the backend
  useEffect(() => {
    if (graphData && graphData?.length > 0 && !yearFilter) {
      const years = [...new Set(graphData?.map((item) => item._id?.year))];
      if (years?.length > 0) {
        setYearFilter(years[0]?.toString());
      }
    }
  }, [graphData, yearFilter]);

  // Function to process graph data and fill missing months
  const processGraphData = useCallback(
    (data: unknown, selectedYear: number) => {
      if (!data) return [];

      // Filter data for the selected year
      // @ts-expect-error unknown

      const yearData = data?.filter((item) => item?._id?.year === selectedYear);

      if (yearData.length === 0) return [];

      // Find the last month provided by the backend
      // @ts-expect-error unknown
      const lastMonth = Math.max(...yearData?.map((item) => item?._id?.month));

      // Create an array for months from 1 up to the last month
      const months = [];
      for (let month = 1; month <= lastMonth; month++) {
        // Check if data exists for this month
        // @ts-expect-error unknown
        const monthData = yearData?.find((item) => item?._id?.month === month);
        if (monthData) {
          months.push(monthData);
        } else {
          // Fill in with totalTriggered = 0
          months.push({
            _id: { year: selectedYear, month: month },
            totalTriggered: 0,
          });
        }
      }

      return months;
    },
    []
  );

  // Processed and filtered data for the selected year
  const filteredData = useMemo(() => {
    if (!graphData || !yearFilter) return [];

    const selectedYear = parseInt(yearFilter, 10);
    const processedData = processGraphData(graphData, selectedYear);

    return processedData;
  }, [graphData, yearFilter, processGraphData]);

  // Series data for the chart
  const seriesData = useMemo(
    () => filteredData?.map((item) => item?.totalTriggered),
    [filteredData]
  );

  // Chart options
  const options = useMemo(
    () => ({
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false,
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
        categories: filteredData.map((item) => getMonthName(item._id.month)),
      },
      markers: {
        size: 4,
        colors: [colors.vibrantgreen],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    }),
    [filteredData]
  );

  // Chart series
  const series = useMemo(
    () => [
      {
        name: 'Rule Trigger Frequency',
        data: seriesData,
      },
    ],
    [seriesData]
  );

  const metrics = [
    {
      title: 'Number of times triggered',
      value: `${analyticsData?.countOfTimesTriggered || 0}`,
    },
    {
      title: 'Number of transactions that failed',
      value: `${numeral(analyticsData?.countOfFailedTransactions || 0).format(
        '0,0a'
      )}`,
    },
    {
      title: 'Number of transactions that passed',
      value: `${numeral(analyticsData?.countOfPassedTransactions || 0).format(
        '0,0'
      )}`,
    },
    {
      title: 'Percentage of total transactions that triggered rule',
      value: `${numeral(
        analyticsData?.percentOfTransactionTriggered || 0
      ).format('0,0.000')}%`,
    },
  ];

  // Update the page state
  useEffect(() => {
    const previousRouterBase = redirect || routes.fibonacci.rules;
    const previousRouter = new URLSearchParams({
      page: pageParam || '',
      pageSize: pageSizeParam || '',
      search: searchParam || '',
      startDate: startDateParam || '',
      endDate: endDataParam || '',
    }).toString();

    setPage({
      previousText: 'Instructions',
      previousRouter:
        previousRouterBase + (previousRouter ? `&${previousRouter}` : ''),
    });
  }, [
    redirect,
    pageParam,
    pageSizeParam,
    searchParam,
    setPage,
    startDateParam,
    endDataParam,
  ]);

  return {
    isLoadingAnalytics,
    analyticsData,
    metrics,
    yearFilter,
    setYearFilter,
    updateGraphQuery,
    isLoadingGraphData,
    options,
    series,
    setShowFilter,
    transactionQuery,
    updateTransactionQuery,
    isLoadingTransactionData,
    transactionsData,
    showFilter,
    refetch,
    isFetching,
    error,
    status,
  };
};
