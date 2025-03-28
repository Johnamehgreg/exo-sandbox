import { IconArrowRight } from '@/public/assets/svg/icon-right-arrow';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { IconSignPost } from '@/public/assets/svg/icon-sign-post';
import {
  ActionIcon,
  Box,
  Flex,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { ProjectHeader } from './project.header';

interface Props {
  onItemClick: (type: { value: string }) => void;
  scenariosList: string[];
}
export const PotentialScenariosCard: React.FC<Props> = ({
  onItemClick,
  scenariosList,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      'insight_tab',
      'Explore Potential Scenarios'.toLowerCase().replace(/ /g, '_')
    );
    newParams.set('option', 'explore');

    router.replace(`?${newParams.toString()}`);
  };
  const [value, setValue] = useState('');
  const disabled = value.trim().length === 0;

  return (
    <Box className="py-.5 mb-7 w-full rounded-xl bg-gray-100 px-1 pb-4">
      <ProjectHeader
        tip="Explore Potential Scenarios"
        title="Explore Potential Scenarios"
      />
      <div className="grid grid-cols-[1fr_10fr] gap-[4px]">
        <div className="flex justify-center"></div>
        <div className="flex flex-col divide-y overflow-hidden rounded-xl border bg-white">
          {scenariosList?.map((item, index) => {
            return (
              <div className="w-full" key={`scenariosList-${index}`}>
                <UnstyledButton
                  className="w-full"
                  onClick={() => {
                    onClick?.();
                    onItemClick?.({ value: item?.replace(/"/g, ' ') });
                  }}
                >
                  <Flex className="w-full items-center justify-between p-4">
                    <Text className="dashboard-card-text">
                      {item?.replace(/"/g, ' ')}
                    </Text>
                    <IconArrowRightIos />
                  </Flex>
                </UnstyledButton>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          <IconSignPost />
        </div>
        <Box>
          <TextInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Enter a scenario"
            classNames={{
              wrapper: 'border gap-2 overflow-hidden rounded-xl',
              input: 'border-none text-[14px]',
            }}
            rightSection={
              <ActionIcon
                disabled={disabled}
                radius={10}
                onClick={() => {
                  onClick();
                  onItemClick({ value: value });
                }}
                className={`${
                  disabled
                    ? 'bg-gray-100'
                    : 'bg-[var(--mantine-primary-color-6)]'
                }`}
              >
                <IconArrowRight
                  className={`${
                    disabled
                      ? 'fill-gray-400'
                      : 'fill-[var(--mantine-primary-color-4)]'
                  }`}
                />
              </ActionIcon>
            }
          />
        </Box>
      </div>
    </Box>
  );
};
