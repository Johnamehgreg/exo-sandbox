'use client';

import { cn } from '@/lib/utils';
import { Flex, Text } from '@mantine/core';

type Props = {
  text: string;
  status: boolean;
};

const RulesCheckItem = ({ text, status }: Props) => {
  return (
    <Flex className="items-center justify-between gap-x-5">
      <Text className="max-w-[400px] flex-1 text-sm font-normal leading-[21px] text-[#475569]">
        {text}
      </Text>
      <Flex
        className={cn(
          'h-[26px] w-[90px] items-center justify-center rounded bg-[#EEF7F2] text-[12px] font-medium leading-[18px] text-[#177A48]',
          {
            'bg-[#FAEDEB] text-[#A63418]': status,
          }
        )}
      >
        {status ? 'Failed' : 'Pass'}
      </Flex>
    </Flex>
  );
};

export default RulesCheckItem;
