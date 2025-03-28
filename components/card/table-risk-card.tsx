import { Box, Flex, Text } from '@mantine/core';

interface Props {
  title: string;
}

export const TableRiskCard: React.FC<Props> = ({ title }) => {
  const getBand = () => {
    switch (title?.toLowerCase()) {
      case 'very low':
        return {
          label: 'Very Low',
          color: '#A3E635',
        };
      case 'low':
        return {
          label: 'Low',
          color: '#F18F01',
        };
      case 'medium':
        return {
          label: 'Medium',
          color: '#F18F01',
        };
      case 'high':
        return {
          label: 'High',
          color: '#C73E1D',
        };
      case 'very high':
        return {
          label: 'Very High',
          color: '#991B1B',
        };
      default:
        return {
          label: 'Unknown',
          color: '#FFB822',
        };
    }
  };

  return (
    <Flex>
      <Flex className="w-auto items-center gap-2 rounded-[4px] py-[4px]">
        <Box bg={getBand().color} className="h-[8px] w-[8px] rounded-[8px]" />
        <Text className="text-[14px] font-normal text-[#212121]">
          {getBand().label}
        </Text>
      </Flex>
    </Flex>
  );
};
