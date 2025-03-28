'use client';

import { useTransactionInsight } from '@/hooks/mutate/use-transaction-insight';
import { useGetFibonacciTransactionAnalytics } from '@/hooks/query/fibonacciTransactionAnalytics';
import { fibonacciTransactionOverviewChartOptions } from '@/lib/helper';

import { InsightDetailsModel } from '@/types/general';
import { useEffect, useState } from 'react';
import OverviewContent from './overview-content';

const OverviewClient = () => {
  const [selectedInsightDetail, setSelectedInsightDetail] =
    useState<InsightDetailsModel>({ insight: '', title: '' });
  const [showInsight, setShowInsight] = useState(false);
  const [selectedOptionForVolumeChart, setSelectedOptionForVolumeChart] =
    useState<null | string>();
  const [selectedOptionForValueChart, setSelectedOptionForValueChart] =
    useState<null | string>();
  const [selectedOptionForFlaggedChart, setSelectedOptionForFlaggedChart] =
    useState<null | string>();
  const {
    fibonacciTransactionAnalytics,
    isLoading: isLoadingTransactionLevelInsights,
  } = useGetFibonacciTransactionAnalytics();
  const [selectedStat, setSelectedStat] = useState<unknown>(null);

  const { insight, isPending: isPendingTransactionInsight } =
    useTransactionInsight(
      // @ts-expect-error typescript unable to infer type
      fibonacciTransactionAnalytics
    );

  const handleFilter = (val: string | null) => {
    setSelectedOptionForVolumeChart(val);
    setSelectedOptionForValueChart(val);
    setSelectedOptionForFlaggedChart(val);
  };
  useEffect(() => {
    handleFilter(fibonacciTransactionOverviewChartOptions[2].value); // Set default value to last 30 days
  }, []);
  return (
    <OverviewContent
      analytics={fibonacciTransactionAnalytics?.analytics}
      {...{
        isLoadingTransactionLevelInsights,
        isPendingTransactionInsight,
        insight,
        handleFilter,
        selectedInsightDetail,
        setSelectedInsightDetail,
        showInsight,
        setShowInsight,
        selectedOptionForVolumeChart,
        selectedOptionForValueChart,
        selectedOptionForFlaggedChart,
        selectedStat,
        setSelectedStat,
      }}
    />
  );
};

export default OverviewClient;
