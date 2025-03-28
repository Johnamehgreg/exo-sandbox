import { Center, Text } from '@mantine/core';

interface Props {
  message?: string;
}

const ChartEmptyState = ({ message = 'No data available' }: Props) => (
  <Center className="h-96 w-full rounded-lg bg-white">
    <Text size="sm" color="dimmed">
      {message}
    </Text>
  </Center>
);

export default ChartEmptyState;
