import { Skeleton } from '@mantine/core';

export const TableSkeleton = ({ row, col }: { row: number; col: number }) => {
  return (
    <div className="overflow-x-auto">
      <div className="grid w-full gap-2 overflow-x-auto p-3">
        {Array.from({ length: row }).map((_, index) => (
          <div key={index} className="flex gap-4">
            {Array.from({ length: col }).map((_, index) => (
              <Skeleton key={index} className="w-full" height={30} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
