/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RiskItem, SortState } from '@/types/overview';
import { useMemo, useState } from 'react';

export const useSortRiskAnalysis = (items: RiskItem[]) => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const sortedItems = useMemo(() => {
    if (!sortState.column || !sortState.direction) return items;

    return [...items].sort((a, b) => {
      // @ts-ignore
      if (a[sortState.column!] < b[sortState.column!]) {
        return sortState.direction === 'asc' ? -1 : 1;
      }
      // @ts-ignore
      if (a[sortState.column!] > b[sortState.column!]) {
        return sortState.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [items, sortState]);

  const handleSort = (column: keyof RiskItem) => {
    setSortState((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === 'asc'
            ? 'desc'
            : prev.direction === 'desc'
              ? null
              : 'asc'
          : 'asc',
    }));
  };

  return { sortedItems, sortState, handleSort };
};
