import { ReactNode } from 'react';
import { TableSkeleton } from '../ui/table-skeleton';
import DataNotFound from './DataNotFound';

type TableWrapperProps<T> = {
  isLoading: boolean;
  data: T[];
  table: (data: T[]) => ReactNode;
  skeletonRow: number;
  skeletonCol: number;
  notFoundMessage?: string;
};

const TableWrapper = <T,>({
  isLoading,
  data,
  table,
  skeletonRow,
  skeletonCol,
  notFoundMessage = 'No data found',
}: TableWrapperProps<T>) => {
  if (isLoading) {
    return <TableSkeleton row={skeletonRow} col={skeletonCol} />;
  }

  if (!data?.length) {
    return <DataNotFound message={notFoundMessage} />;
  }

  return table(data);
};

export default TableWrapper;
