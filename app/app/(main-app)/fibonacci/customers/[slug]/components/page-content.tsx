import { BackButton } from '@/components/other/back-button';
import Tab from '@/components/other/tab';
import { CustomerDetailsResponse } from '@/types/general';
import { Box, Button, Container, Flex, Tabs, Transition } from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import CustomerActivitySection from './customer-activity-section';
import CustomerDetailsSection from './customer-details-section';
import { CustomerDetailsTabsType, CustomerDetailsTabType } from './page-client';
import SanctionSection from './sanction-section';
import { useRunCheck } from '@/hooks/mutate/use-run-check';

type Props = {
  activeTab: CustomerDetailsTabsType;
  newParams: URLSearchParams;
  isLoading: boolean;
  customerDetail: CustomerDetailsResponse;
  customerDetailsTabs: CustomerDetailsTabsType[];
};

const PageContent = ({
  activeTab,
  newParams,
  isLoading,
  customerDetail,
  customerDetailsTabs,
}: Props) => {
  const router = useRouter();
  const { mutate, isPending } = useRunCheck();

  return (
    <Container fluid className="dashboard-container-wrapper">
      <Box className="rounded-xl py-[34px] sm:bg-white sm:px-[38px]">
        <BackButton />
        <Tabs
          classNames={{
            list: 'tab-list-style',
          }}
          value={activeTab}
          onChange={(e) => {
            newParams.set('detailTab', e as string);
            router.push(`?${newParams.toString()}`);
          }}
        >
          <Flex className="mb-6 items-center justify-between">
            <Tabs.List mb={'lg'}>
              {customerDetailsTabs?.map((tabItem, index) => (
                <Tab
                  tab={activeTab}
                  tabName={tabItem}
                  key={`tabList-${index}`}
                />
              ))}
            </Tabs.List>
            {activeTab === CustomerDetailsTabType.Sanctions && (
              <Button loading={isPending} onClick={() => mutate()}>
                Run Check
              </Button>
            )}
          </Flex>
          <Transition
            mounted={activeTab === CustomerDetailsTabType.Details}
            transition="fade-left"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Tabs.Panel style={styles} value={CustomerDetailsTabType.Details}>
                <CustomerDetailsSection {...{ isLoading, customerDetail }} />
              </Tabs.Panel>
            )}
          </Transition>
          <Transition
            mounted={activeTab === CustomerDetailsTabType.Transactions}
            transition="fade-left"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Tabs.Panel
                style={styles}
                value={CustomerDetailsTabType.Transactions}
              >
                <CustomerActivitySection customerId={customerDetail?.user_id} />
              </Tabs.Panel>
            )}
          </Transition>
          <Transition
            mounted={activeTab === CustomerDetailsTabType.Sanctions}
            transition="fade-left"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Tabs.Panel
                style={styles}
                value={CustomerDetailsTabType.Sanctions}
              >
                <SanctionSection />
              </Tabs.Panel>
            )}
          </Transition>
        </Tabs>
      </Box>
    </Container>
  );
};

export default PageContent;
