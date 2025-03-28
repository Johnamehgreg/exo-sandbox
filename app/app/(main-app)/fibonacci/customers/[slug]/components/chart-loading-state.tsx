import { Box, Skeleton } from '@mantine/core';

const ChartLoadingState = () => {
  return (
    <Box className="w-full rounded-lg bg-white p-4">
      {/* Chart Title Skeleton */}
      <Skeleton height={20} width="200px" mb={24} radius="md" />

      {/* Chart Area with Grid-like Structure */}
      <div className="relative h-96 w-full">
        {/* Y-axis label skeleton */}
        <Skeleton
          height={14}
          width={40}
          className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90"
        />

        {/* Y-axis ticks */}
        <div className="absolute bottom-8 left-8 top-0 flex flex-col justify-between">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={`y-tick-${index}`} height={14} width={30} />
          ))}
        </div>

        {/* Main chart area with gradient effect */}
        <div className="absolute bottom-8 left-16 right-0 top-0">
          <Skeleton height="100%" radius="md" />
        </div>

        {/* X-axis ticks */}
        <div className="absolute bottom-0 left-16 right-0 flex justify-between">
          {[...Array(7)].map((_, index) => (
            <Skeleton key={`x-tick-${index}`} height={14} width={40} />
          ))}
        </div>

        {/* X-axis label skeleton */}
        <Skeleton
          height={14}
          width={60}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>
    </Box>
  );
};

export default ChartLoadingState;
