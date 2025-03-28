import { Box, Center } from '@mantine/core';

const LoadingProjects = () => {
  return (
    <Center>
      <Box className="mx-auto w-full max-w-sm rounded-md px-1">
        {[0, 1, 2, 3].map((index) => (
          <Box key={index} className="flex animate-pulse space-x-4">
            <Box className="flex-1 space-y-2 py-1">
              <Box className="h-2 rounded bg-gray-200" />
              <Box className="h-2 rounded bg-gray-200" />
            </Box>
          </Box>
        ))}
      </Box>
    </Center>
  );
};

export default LoadingProjects;
