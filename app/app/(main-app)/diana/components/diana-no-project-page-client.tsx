'use client';
import { routes } from '@/lib/routes';
import dianaProjectWave from '@/public/image/diana-project.svg';
import { Box, Button, Container, Flex, Text } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';

const DianaNoProjectPageClient = () => {
  const router = useRouter();

  return (
    <Container className="dashboard-container-wrapper">
      <Flex className="flex-col items-center justify-center">
        <Text className="text-center text-[38px] font-medium text-[var(--mantine-color-exo-brand-6)]">
          Welcome to Diana!
        </Text>
        <Box className="relative h-[50vh]">
          <Image
            src={dianaProjectWave}
            alt=""
            className="left-0 top-0 z-50 h-[50vh] w-full"
          />
        </Box>
        <Text className="mb-[4px] text-[18px] font-semibold text-[#1F2937]">
          No Transactions Yet
        </Text>
        <Text
          component="p"
          className="mb-[20px] text-center text-[14px] leading-[20px] text-[#4B5563]"
        >
          Click{' '}
          <Text
            component="span"
            className="text-[14px] font-medium text-[#1F2937]"
          >
            &quot;New Transaction&quot;
          </Text>{' '}
          to start using Diana for smarter <br /> analysis and better decisions.
        </Text>
        <Button
          onClick={() => {
            router.push(routes.diana.onboarding);
          }}
          variant="primary"
        >
          New Transaction
        </Button>
      </Flex>
    </Container>
  );
};

export default DianaNoProjectPageClient;
