import { Box, Skeleton } from '@mantine/core';

const ChartSkeleton = () => {
  return (
    <Box className="rounded-lg bg-[#fff] p-5 shadow-md">
      {/* Title Placeholder */}
      <Skeleton height={20} width="30%" mb="lg" />

      {/* Chart Area Placeholder */}
      <Box className="relative h-[300px]">
        <Skeleton height="100%" width="100%" />
      </Box>

      {/* X-axis Labels Placeholder */}
      <Box className="mt-4 flex justify-between">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} height={12} width="5%" />
        ))}
      </Box>
    </Box>
  );
};

export default ChartSkeleton;
