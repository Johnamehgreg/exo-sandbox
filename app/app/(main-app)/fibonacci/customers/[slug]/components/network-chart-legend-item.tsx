import { Box, Text } from '@mantine/core';

interface Props {
  color: string;
  label: string;
}

const NetworkChartLegendItem = ({ color, label }: Props) => {
  return (
    <Box className="flex items-center">
      <Box
        className="mr-2 h-[15px] w-[15px] rounded-full"
        style={{ backgroundColor: color }}
      />
      <Text className="text-sm text-gray-600">{label}</Text>
    </Box>
  );
};

export default NetworkChartLegendItem;
