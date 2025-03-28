import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { Box, Container, Tabs, Transition } from '@mantine/core';
import ApiKeysSection from './api-keys';
import { settingsTabList, SettingsTabsType, SettingsTabType } from './extras';
import RoleSection from './role';
import TeamSection from './teams';
import Webhook from './webhooks';
import PreferencesSection from './preference';

type Props = {
  activeTab: SettingsTabsType;
  handleTabChange: (e: string | null) => void;
};

const FibonacciSettingsPureComponent = ({
  activeTab,
  handleTabChange,
}: Props) => {
  return (
    <Box>
      <DashboardStickyHeader label="Instructions" />
      <Container fluid className="dashboard-container-wrapper">
        <Box>
          <Tabs
            classNames={{
              list: 'tab-list-style',
            }}
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tabs.List mb={'lg'}>
              {settingsTabList.map((tab, index) => (
                <Tabs.Tab key={`settingsTabList-${index}`} value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <Transition
              mounted={activeTab === SettingsTabType.Team}
              transition="fade-left"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel
                  style={styles}
                  value={SettingsTabType.Team}
                  className=""
                >
                  <TeamSection />
                </Tabs.Panel>
              )}
            </Transition>
            <Transition
              mounted={activeTab === SettingsTabType.Role}
              transition="fade-left"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel
                  style={styles}
                  value={SettingsTabType.Role}
                  className=""
                >
                  <RoleSection />
                </Tabs.Panel>
              )}
            </Transition>

            <Transition
              mounted={activeTab === SettingsTabType.Webhooks}
              transition="fade-left"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel
                  style={styles}
                  value={SettingsTabType.Webhooks}
                  className=""
                >
                  <Webhook />
                </Tabs.Panel>
              )}
            </Transition>
            <Transition
              mounted={activeTab === SettingsTabType.ApiKeys}
              transition="fade-left"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel
                  style={styles}
                  value={SettingsTabType.ApiKeys}
                  className=""
                >
                  <ApiKeysSection />
                </Tabs.Panel>
              )}
            </Transition>
            <Transition
              mounted={activeTab === SettingsTabType.Preferences}
              transition="fade-left"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel
                  style={styles}
                  value={SettingsTabType.Preferences}
                  className=""
                >
                  <PreferencesSection />
                </Tabs.Panel>
              )}
            </Transition>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default FibonacciSettingsPureComponent;
