import { useMemo } from 'react';
import { GetFibonacciTransactionChartDataResponse } from '../query/fibonacciTransactionAnalytics';

export const useTransformDataForFlaggedChart = (
  data?: GetFibonacciTransactionChartDataResponse[]
) => {
  return useMemo(() => {
    if (!data || data.length === 0) return { series: [], categories: [] };

    // Step 1: Extract unique dates (categories)
    const uniqueDates = Array.from(
      new Set(
        data?.map((item) => {
          const id = item?._id;
          return typeof id === 'string' ? id : id?.date;
        })
      )
    )?.sort();

    // Step 2: Group data by category
    const categories = Array.from(
      new Set(
        data?.map((item) => {
          const id = item?._id;
          return typeof id === 'string' ? '' : id?.category;
        })
      )
    );

    const series = categories.map((category) => {
      const categoryData = data?.filter((item) => {
        const id = item?._id;
        return typeof id === 'string' ? false : id?.category === category;
      });

      // Create data points for each date
      const dataPoints = uniqueDates?.map((date) => {
        const match = categoryData?.find((item) => {
          const id = item?._id;
          return typeof id === 'string' ? false : id?.date === date;
        });
        return match ? match?.count : 0; // Use count if available, else 0
      });

      return {
        name:
          category === 'positive_fraud'
            ? 'Positive Fraud'
            : 'False Positive Fraud',
        data: dataPoints,
      };
    });

    return {
      series,
      categories: uniqueDates,
    };
  }, [data]); // Dependencies for memoization
};
