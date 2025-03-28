import { TableStatusCard } from '@/components/card/table-status-card';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { PageLWrapper } from '@/components/layout/page-wrapper';
import { BackButton } from '@/components/other/back-button';
import { TransactionModel } from '@/types/general';
import { Box, Flex, Grid, Skeleton, Tabs, Transition } from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import { ActivitySection } from './activity-section';
import { DetailSection } from './detail-section';
import { transactionDetailsTabList } from './extras';
import FraudChecks from './fraud-checks';
import { NoteSection } from './note-section';
import { TransactionActionCard } from './transaction-action-card';

type Props = {
  refetch: VoidFunction;
  isLoading: boolean;
  transactionDetail: TransactionModel;
  detailTab: string;
  searchParams: URLSearchParams;
  getRedirectUrl: () => string;
};

const TransactionDetailsPureComponent = ({
  refetch,
  isLoading,
  transactionDetail,
  detailTab,
  searchParams,
  getRedirectUrl,
}: Props) => {
  const router = useRouter();
  return (
    <>
      <DashboardStickyHeader label="Transactions" />
      <PageLWrapper
        bottomComponent={
          transactionDetail?._id && (
            <TransactionActionCard
              refetch={refetch}
              transactionDetail={transactionDetail}
            />
          )
        }
      >
        <Box className="dashboard-container-wrapper">
          <BackButton />
          <Flex mb={'lg'} className="flex-wrap items-center gap-4">
            <Box className="page-header">
              Transaction ID:{' '}
              {
                <>
                  {isLoading ? (
                    <Skeleton animate className="inline-block h-4 w-[250px]" />
                  ) : (
                    transactionDetail?._id
                  )}
                </>
              }
            </Box>
            {transactionDetail?.review && (
              <TableStatusCard status={transactionDetail?.review} />
            )}
          </Flex>
          <Tabs
            classNames={{
              list: 'tab-list-style',
            }}
            value={detailTab}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('detailTab', e as string);
              newParams.set('redirect', getRedirectUrl());
              router.push(`?${newParams.toString()}`);
            }}
          >
            <Tabs.List mb={'lg'}>
              {transactionDetailsTabList?.map((tab, index) => (
                <Tabs.Tab
                  key={`transaction-details-tab-list-${index}`}
                  value={tab?.value}
                >
                  {tab?.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <Grid className="mb-[100px]" gutter={'lg'}>
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Transition
                  mounted={detailTab === 'details'}
                  transition="fade-left"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Tabs.Panel style={styles} value="details" className="">
                      <Box className="mb-[100px]">
                        <DetailSection {...{ transactionDetail, isLoading }} />
                      </Box>
                    </Tabs.Panel>
                  )}
                </Transition>
                <Transition
                  mounted={detailTab === 'fraudChecks'}
                  transition="fade-left"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Tabs.Panel style={styles} value="fraudChecks" className="">
                      <FraudChecks />
                    </Tabs.Panel>
                  )}
                </Transition>
                <Transition
                  mounted={detailTab === 'activity'}
                  transition="fade-left"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Tabs.Panel style={styles} value="activity" className="">
                      <ActivitySection />
                    </Tabs.Panel>
                  )}
                </Transition>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <NoteSection />
              </Grid.Col>
            </Grid>
          </Tabs>
        </Box>
      </PageLWrapper>
    </>
  );
};

export default TransactionDetailsPureComponent;
