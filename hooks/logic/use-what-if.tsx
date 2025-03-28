'use client';

import { useWhatIf } from '@/hooks/query/dashboard';
import { Metric } from '@/types/general';
import { useDebouncedCallback } from '@mantine/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';



export const useWhatIfLogic = () => {
  const { isLoading, isError, onUpdateWaitList, isFetching, whatIfData } = useWhatIf();
  const [taxValue, setTaxValue] = useState<number | null>(null);
  const handleFetch = useDebouncedCallback(async (tax?: number) => {
    onUpdateWaitList({
      values: {
        new_tax_credit: tax as number,
      },
      cb: (res: any) => {
        if (typeof taxValue !== 'number')
          return setTaxValue(res.data.new_value);
      }
    })
  }, 500);

  useEffect(() => {
    if (typeof taxValue !== 'number')
      return handleFetch();
  }, [])

  const mergeMetrics = useCallback(() => {
    const original_metrics: Metric[] = whatIfData?.metrics?.original_metrics || [];
    const adjusted_metrics: Metric[] = whatIfData?.metrics?.adjusted_metrics || [];
    const newList = original_metrics?.map((item, index: number) => {
      return {
        ...item,
        adjusted_metrics: adjusted_metrics[index],
      };
    });
    return newList;
  }, [whatIfData]);

  const isITC: boolean = useMemo(() => {
    return (whatIfData?.tax_credit_type || '')?.includes('ITC');
  }, [whatIfData?.tax_credit_type]);
  const tooltipLabel = isITC ? `${taxValue}% of eligible upfront capital costs reimbursed via tax credits.` : `￠${taxValue} per kilowatt-hour (kWh) $0.026/kWh credit applied to electricity generated for 10 years.`
  const sliderList = useMemo(() => {
    return isITC
      ? [
        { value: 0, label: '0%' },
        { value: 20, label: '20%' },
        { value: 60, label: '60%' },
        { value: 80, label: '80%' },
        { value: 100, label: '100%' },
      ]
      : [
        { value: 0, label: '0' },
        { value: 50, label: '5' },
        { value: 100, label: '10' },
      ];
  }, [isITC]); // Dependency array includes `isITC`

  const maxRange = isITC ? 100 : 10

  const onTaxValueChange = (e: number) => {
    if (e <= maxRange)
      handleFetch(e)
    return setTaxValue(e)
  }

  return {
    isLoading,
    refetch: () => handleFetch(),
    whatIfData,
    mergeMetrics,
    taxValue: Number(taxValue || 0),
    setTaxValue,
    isFetching,
    isITC,
    tooltipLabel,
    sliderList,
    onTaxValueChange,
    maxRange,
    isError,
  };
};
