import keys from '@/public/image/keys.svg';
import { Button, Flex, Text } from '@mantine/core';
import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  onButtonClick: () => void;
  buttonLabel: string;
  description?: string;
  component?: ReactNode;
};

const EmptyApiKey = ({
  onButtonClick,
  buttonLabel,
  description,
  component,
}: Props) => {
  return (
    <>
      {component && component}
      <Flex className="mx-auto mt-[65px] max-w-[471px] flex-col items-center">
        <Image src={keys} alt="" className="h-[133px] w-[160px]" />
        <Text className="mb-6 whitespace-pre-line text-center font-twk text-[14px] font-[250] leading-6 text-gray-600">
          {description ??
            `Store your API keys in a secure location, avoiding exposure in public \nrepositories or shared documents, and implement usage limits and \nmonitoring to detect any unusual activity or potential misuse.`}
        </Text>
        <Button onClick={onButtonClick}>{buttonLabel}</Button>
      </Flex>
    </>
  );
};

export default EmptyApiKey;
