'use client';

import errorPageImage from '@/public/image/error-page-image.svg';
import { Box, Container, Flex, Text } from '@mantine/core';
import Image from 'next/image';
interface Props {
  title?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  error?: Error | null;
  resetError?: () => void;
}
export const ErrorPageLayout: React.FC<Props> = ({
  title,
  message,
  error = null,
  children,
}) => {
  return (
    <Box className="flex min-h-[calc(100vh_-_100px)] w-full items-center overflow-hidden !bg-white bg-cover bg-bottom bg-no-repeat">
      <Container size={'sm'}>
        <Flex className="w-full flex-col items-center">
          <Image alt="" className="mb-[16px] !w-[200px]" src={errorPageImage} />
          <Text className="text-color mb-[8px] text-center text-[24px] font-semibold">
            {title || error?.name || 'Error'}
          </Text>
          <Text className="text-color-gray mb-[16px] text-center text-[16px] font-normal">
            {message}
          </Text>
          {children}
        </Flex>
      </Container>
    </Box>
  );
};
