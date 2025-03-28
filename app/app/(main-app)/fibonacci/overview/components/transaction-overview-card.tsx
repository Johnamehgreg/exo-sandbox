import { Box, Flex, Text } from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  title: string | ReactNode;
};

const TransactionOverViewCard = ({
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Box className="gray-card-wrapper-dashboard flex-col">
      <Flex className="w-full items-center justify-between gap-[4px] px-2.5 py-3">
        <Text className="gray-card-header-text">{title}</Text>
      </Flex>
      <Box className="px-1">{children}</Box>
    </Box>
  );
};

export default TransactionOverViewCard;
