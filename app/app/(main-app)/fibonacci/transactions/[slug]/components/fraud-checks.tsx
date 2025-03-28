'use client';

import { useGetTransaction } from '@/hooks/query/transaction';
import { colors } from '@/lib/app-config';
import IconSpyLine from '@/public/assets/svg/transaction/icon-spy-line';
import { IconTeamLine } from '@/public/assets/svg/transaction/icon-team-line';
import {
  Accordion,
  Box,
  Center,
  Loader,
  ScrollArea,
  SimpleGrid,
} from '@mantine/core';
import { useParams } from 'next/navigation';
import TransactionsEmptyMessage from '../../../overview/components/transactions-empty-message';
import FraudCheckItem from './fraud-check-item';
import RulesCheckItem from './rules-check-item';

const FraudChecks = () => {
  const { slug } = useParams<{ slug: string }>();
  const { transactionDetail, isLoading } = useGetTransaction({
    id: slug as string,
  });

  const hasRules = (transactionDetail?.insight?.rules?.length || 0) > 0;

  return (
    <Box>
      {isLoading ? (
        <Box className="h-[457px]">
          <Center className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Loader size={'sm'} />
          </Center>
        </Box>
      ) : (
        <Accordion defaultValue={['blacklistChecks', 'rulesChecks']} multiple>
          <Accordion.Item
            py={'xs'}
            mb={'md'}
            className="dashboard-border rounded-[8px] bg-white"
            px={'0.2rem'}
            value="blacklistChecks"
          >
            <Accordion.Control
              classNames={{
                label: 'text-base font-medium text-[#020617]',
              }}
              icon={<IconTeamLine fill={colors.vibrantgreen} />}
            >
              Blacklist Checks
            </Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 3 }} className="gap-y-5">
                <FraudCheckItem
                  title="Sender"
                  id={transactionDetail?.insight?.senderBlacklistId}
                />
                <FraudCheckItem
                  title="Receiver"
                  id={transactionDetail?.insight?.recipientBlacklisted}
                />
                <FraudCheckItem
                  title="Device"
                  id={transactionDetail?.insight?.deviceBlacklistId}
                />
                <FraudCheckItem
                  title="Customer"
                  id={transactionDetail?.insight?.userBlacklistId}
                />
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item
            py={'xs'}
            mb={'md'}
            className="dashboard-border rounded-[8px] bg-white"
            px={'0.2rem'}
            value="rulesChecks"
          >
            <Accordion.Control
              classNames={{
                label: 'text-base font-medium text-[#020617]',
              }}
              icon={<IconSpyLine fill={colors.vibrantgreen} />}
            >
              Rules Checks
            </Accordion.Control>
            <Accordion.Panel>
              {hasRules ? (
                <ScrollArea h={250}>
                  <Box className="space-y-6">
                    {transactionDetail?.insight?.rules?.map((rule, index) => (
                      <RulesCheckItem
                        key={`transactionDetail-insight-rules-${index}`}
                        text={rule?.rule?.description}
                        status={rule?.matched}
                      />
                    ))}
                  </Box>
                </ScrollArea>
              ) : (
                <TransactionsEmptyMessage
                  height={300}
                  text="No Rules checks available for the transaction"
                />
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Box>
  );
};

export default FraudChecks;
