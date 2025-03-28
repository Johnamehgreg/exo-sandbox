import { Center, Text } from '@mantine/core';

interface Props {
  message?: string;
}

const ChartErrorState = ({
  message = 'An error occurred while loading the chart',
}: Props) => (
  <Center className="h-96 w-full rounded-lg bg-white">
    <Text className="text-red-600" size="sm">
      {message}
    </Text>
  </Center>
);

export default ChartErrorState;
