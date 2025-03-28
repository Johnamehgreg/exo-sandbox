import { IconEmptyState } from '@/public/assets/svg/icon-empty-state';
import { Box, Flex, Text } from '@mantine/core';

type Props = {
  text: string;
  height?: number;
};

const TransactionsEmptyMessage = ({ text, height }: Props) => {
  return (
    <Box h={height ?? 457} className="grid place-content-center">
      <Flex className="flex-col items-center justify-center">
        <IconEmptyState />
        <Text className="text-sm font-normal leading-[21px] text-[#020617]">
          {text}
        </Text>
      </Flex>
    </Box>
  );
};

export default TransactionsEmptyMessage;
