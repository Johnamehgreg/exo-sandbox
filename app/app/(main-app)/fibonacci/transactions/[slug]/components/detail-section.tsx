'use client';

import { TableRiskCard } from '@/components/card/table-risk-card';
import { TableStatusCard } from '@/components/card/table-status-card';
import { DetailItem } from '@/components/transactions/detail-item';
import { colors } from '@/lib/app-config';
import { formattedAmount } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IconChevronDown } from '@/public/assets/svg/icon-chevron-down';
import { IconDevice } from '@/public/assets/svg/icon-device';
import { IconLocation } from '@/public/assets/svg/icon-location';
import { IconSparkleFilled } from '@/public/assets/svg/icon-sparkle-filled';
import { IconUser } from '@/public/assets/svg/icon-user';
import { IconTransaction } from '@/public/assets/svg/nav/fibonacci/icon-transaction';
import { TransactionModel } from '@/types/general';
import {
  Accordion,
  Avatar,
  Box,
  Card,
  Collapse,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { format } from 'date-fns';
import { useState } from 'react';

interface DetailSectionProps {
  transactionDetail?: TransactionModel | null;
  isLoading: boolean;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  transactionDetail,
  isLoading,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  return (
    <Box>
      <Card className="mb-5 rounded-lg border border-gray-200 leading-5 shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)]">
        <Flex className="mb-[14px] items-center gap-x-1.5">
          <IconSparkleFilled />
          <Text className="text-[14px] font-semibold text-p1">
            Transaction Detail Insights
          </Text>
          <Text className="text-sm font-normal text-gray-600">
            | Quality and accuracy may vary.
          </Text>
        </Flex>
        {isLoading ? (
          <>
            <Skeleton width="30%" height={16} animate className="mb-2" />
            <Skeleton width="60%" height={16} animate />
          </>
        ) : (
          <>
            <Collapse
              in={isExpanded}
              transitionDuration={300}
              transitionTimingFunction="ease"
            >
              <Text className="text-[14px] font-normal text-gray-600">
                {transactionDetail?.insight?.comment}
              </Text>
            </Collapse>
            {!isExpanded && (
              <Text className="line-clamp-1 text-[14px] font-normal text-gray-600">
                {transactionDetail?.insight?.comment}
              </Text>
            )}
            <UnstyledButton
              onClick={toggleExpanded}
              className="mt-1 flex items-baseline gap-x-1 text-[14px] font-semibold leading-[18px] text-vibrantgreen"
            >
              <Text>{isExpanded ? 'See less' : 'See more'}</Text>
              <IconChevronDown
                className={cn(
                  'transform transition-transform duration-300 ease-in-out',
                  {
                    'rotate-180': isExpanded,
                  }
                )}
              />
            </UnstyledButton>
          </>
        )}
      </Card>

      <Accordion multiple defaultValue={['transaction']}>
        <Accordion.Item
          py={'xs'}
          mb={'md'}
          className="dashboard-border rounded-[8px] bg-white"
          px={'0.2rem'}
          value="transaction"
        >
          <Accordion.Control
            classNames={{
              label: 'text-[16px] font-medium',
            }}
            icon={<IconTransaction fill={colors.vibrantgreen} />}
          >
            Transaction Information
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.uniqueId}
                title="Unique ID"
                type="text"
                isLoading={isLoading}
              />
              {
                transactionDetail?.transactionData?.transactionDate && (
                  <DetailItem
                    text={format(
                      transactionDetail?.transactionData?.transactionDate || "",
                      "dd MMM, yyyy"
                    )}
                    title="Date"
                    type="text"
                  />
                )
              }
              <DetailItem
                title="Status"
                type="text"
                text={<TableStatusCard status={transactionDetail?.review} />}
                isLoading={isLoading}
              />
              <DetailItem
                text={transactionDetail?.transactionData?.channel}
                title="Channel"
                type="text"
                isLoading={isLoading}
              />
              <DetailItem
                text={transactionDetail?.transactionData?.type}
                title="Type"
                type="text"
                isLoading={isLoading}
              />
              <DetailItem
                text={formattedAmount(
                  transactionDetail?.transactionData?.amount || 0,
                  transactionDetail?.transactionData?.currency || ''
                )}
                title="Amount"
                type="text"
                isLoading={isLoading}
              />
              <DetailItem
                title="Risk level"
                type="risk"
                isLoading={isLoading}
                text={
                  <TableRiskCard
                    title={transactionDetail?.insight?.riskBand || ''}
                  />
                }
              />
              <DetailItem
                text={transactionDetail?.insight?.riskScore?.toFixed(2)}
                title="Risk score"
                type="text"
                isLoading={isLoading}
              />
              <DetailItem
                title="Assigned to"
                type="user"
                isLoading={isLoading}
                text={
                  <>
                    {transactionDetail?.assignedTo?.firstName &&
                      transactionDetail?.assignedTo?.lastName ? (
                      <>
                        <Flex className="items-center gap-3">
                          <Avatar size={32}>
                            <Text className="text-[14px] font-semibold text-[#000]">
                              {upperFirst(
                                transactionDetail?.assignedTo?.firstName?.slice(
                                  0,
                                  1
                                ) || ''
                              )}
                              {upperFirst(
                                transactionDetail?.assignedTo?.lastName?.slice(
                                  0,
                                  1
                                ) || ''
                              )}
                            </Text>
                          </Avatar>
                          <Box>
                            <Text className="black-list-table-item font-medium">
                              {upperFirst(
                                transactionDetail?.assignedTo?.firstName || ''
                              )}{' '}
                              {upperFirst(
                                transactionDetail?.assignedTo?.lastName || ''
                              )}
                            </Text>
                          </Box>
                        </Flex>
                      </>
                    ) : (
                      <Text className="black-list-table-item text-[14px] font-normal text-[#212121]">
                        Nobody
                      </Text>
                    )}
                  </>
                }
              />
              <DetailItem
                title="Sender account"
                text={transactionDetail?.transactionData?.senderAccount}
                type="text"
                isLoading={isLoading}
              />
              <DetailItem
                title="Receiver account"
                text={transactionDetail?.transactionData?.receiverAccount}
                type="text"
                isLoading={isLoading}
              />
              <DetailItem
                title="Narration "
                text={transactionDetail?.transactionData?.narration}
                type="text"
                isLoading={isLoading}
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          py={'xs'}
          mb={'md'}
          className="dashboard-border rounded-[8px] bg-white"
          px={'0.2rem'}
          value="customer"
        >
          <Accordion.Control
            classNames={{
              label: 'text-[16px] font-medium',
            }}
            icon={<IconUser fill={colors.vibrantgreen} />}
          >
            Customer Information
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.uniqueId}
                title="Title"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.accountType}
                title="Account"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.businessCategory}
                title="Business category"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.age}
                title="Age"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.state}
                title="State"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.anonymizedUserData?.country}
                title="Country"
                type="text"
              />
              <DetailItem
                text={
                  transactionDetail?.anonymizedUserData?.isPhoneNumberVerified
                    ? 'Yes'
                    : 'No'
                }
                title="Phone verified"
                type="text"
              />
              <DetailItem
                text={
                  transactionDetail?.anonymizedUserData?.isBanned ? 'Yes' : 'No'
                }
                title="Banned"
                type="text"
              />
              <DetailItem text="N/A" title="Tax number" type="text" />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          py={'xs'}
          mb={'md'}
          className="dashboard-border rounded-[8px] bg-white"
          px={'0.2rem'}
          value="device"
        >
          <Accordion.Control
            classNames={{
              label: 'text-[16px] font-medium',
            }}
            icon={<IconDevice fill={colors.vibrantgreen} />}
          >
            Device Information
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              <DetailItem
                text={transactionDetail?.device?.manufacturer}
                title="Manufacturer"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.device?.model}
                title="Model"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.device?.osName}
                title="OS Name"
                type="text"
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item
          py={'xs'}
          mb={'md'}
          className="dashboard-border rounded-[8px] bg-white"
          px={'0.2rem'}
          value="location"
        >
          <Accordion.Control
            classNames={{
              label: 'text-[16px] font-medium',
            }}
            icon={<IconLocation fill={colors.vibrantgreen} />}
          >
            Location information
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              <DetailItem
                text={transactionDetail?.location?.longitude}
                title="Longitude"
                type="text"
              />
              <DetailItem
                text={transactionDetail?.location?.latitude}
                title="Latitude"
                type="text"
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};
