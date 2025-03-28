'use client';

import { useUiStore } from '@/app/store/ui.store';
import { colors } from '@/lib/app-config';
import { IconArrowLeft } from '@/public/assets/svg/icon-arrow-left';
import { Button, Flex, Text } from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';

export const BackButton = () => {
  const { page } = useUiStore();
  const router = useRouter();
  return (
    <Button
      className="mb-4 bg-transparent px-0"
      variant="white"
      onClick={() => router.push(page?.previousRouter || '')}
    >
      <Flex className="gap-2">
        <IconArrowLeft fill={colors.vibrantgreen} />
        <Text className="hidden text-[14px] font-normal !text-vibrantgreen md:block">
          Back to {page?.previousText}
        </Text>
      </Flex>
    </Button>
  );
};
