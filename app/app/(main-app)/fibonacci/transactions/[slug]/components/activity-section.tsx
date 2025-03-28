'use client';
import {
  Box,
  Card,
  Center,
  Flex,
  Loader,
  rem,
  Stepper,
  StepperProps,
  Text,
} from '@mantine/core';

import { useGetTransationActivity } from '@/hooks/query/transaction';
import { routes } from '@/lib/routes';
import { ActivityLogAction } from '@/types/general';
import { format } from 'date-fns';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import TransactionsEmptyMessage from '../../../overview/components/transactions-empty-message';
import { getActivityLogDescription } from '../../components/extras';
import { ActivityLogsIcons } from './icon-activity-logs';
import IconTransactionActivityLogsElement from './icon-transaction-activity-logs-element';

export const ActivitySection = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetTransationActivity(slug as string);

  function StyledStepper(props: StepperProps) {
    return (
      <Stepper
        styles={{
          step: {
            padding: 0,
          },

          stepIcon: {
            borderWidth: rem(4),
          },

          separator: {
            height: rem(0),
          },
        }}
        {...props}
      />
    );
  }
  return (
    <Box className="mb-[100px] bg-white">
      <Card className="dashboard-border pb-[-2rem]">
        {isLoading ? (
          <Box className="h-[457px]">
            <Center className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Loader size={'sm'} />
            </Center>
          </Box>
        ) : data?.length ? (
          <>
            <StyledStepper
              classNames={{
                separator: '!bg-red-400 ',
                stepIcon: '!border-0 !p-0 bg-transparent',
                step: ' !h-[5rem]',
              }}
              size="lg"
              iconSize={24}
              orientation="vertical"
              active={0}
            >
              {data?.map((log, index) => (
                <Stepper.Step
                  key={`activity-logs-${index}`}
                  label={
                    <Flex className="items-center gap-x-2">
                      <Text className="text-base font-medium text-[#020617]">
                        {getActivityLogDescription(log?.action)}
                      </Text>
                      {log?.action === ActivityLogAction.TRANSACTION_BLOCKED ? (
                        <Text>
                          -{' '}
                          <Link
                            href={`${routes.fibonacci.transactionDetail}/${slug}?detailTab=fraudChecks`}
                            className="cursor-pointer text-base font-medium text-[#625CCB]"
                          >
                            View rule applied
                          </Link>
                        </Text>
                      ) : null}
                    </Flex>
                  }
                  description={
                    <Text>
                      {format(new Date(log?.createdAt), 'EEE, MMM dd, yyyy')} •{' '}
                      {format(new Date(log?.createdAt), 'h:mm a')}
                    </Text>
                  }
                  icon={
                    <Box
                      bg={'#F1F5F9'}
                      className="flex h-[24px] w-[24px] items-center justify-center rounded-[24px]"
                    >
                      <IconTransactionActivityLogsElement
                        iconName={log?.action as keyof typeof ActivityLogsIcons}
                      />
                    </Box>
                  }
                />
              ))}
              {/* {
                    } */}
            </StyledStepper>
          </>
        ) : (
          <TransactionsEmptyMessage
            text={'No activity yet for the transaction'}
          />
        )}
      </Card>
    </Box>
  );
};
