import { Box, Container, Tabs, Text } from '@mantine/core';
import { settingsTabList, SettingTabsType } from './extras';
import { ChangePasswordSettingTab } from './tabs/change-password-setting-tab';
import { NotificationSetting } from './tabs/notification-setting-tab';
import { OrganizationSettingTab } from './tabs/organization-setting-tab';
import ProfileSettingTab from './tabs/profile-setting-tab';
import { TeamSettingTab } from './tabs/team-setting-tab';

type Props = {
  activeTab: SettingTabsType;
  handleTabChange: (e: string | null) => void;
  filteredTabs: (typeof settingsTabList)[number][];
};

const SettingsPagePureComponent = ({
  activeTab,
  handleTabChange,
  filteredTabs,
}: Props) => {
  return (
    <Box className="dashboard-vertical-padding scroll-layout">
      <Container className="mx-0" size={'sm'} w={'100%'}>
        <Text mb={'lg'} className="page-header">
          Settings
        </Text>
        <Tabs
          classNames={{
            list: 'tap-wrapper-list',
          }}
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List mb={'lg'}>
            {filteredTabs.map((tab: (typeof settingsTabList)[number]) => {
              return (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
          <ProfileSettingTab currentTab={activeTab} />
          <OrganizationSettingTab currentTab={activeTab} />
          <ChangePasswordSettingTab currentTab={activeTab} />
          <TeamSettingTab currentTab={activeTab} />
          <NotificationSetting currentTab={activeTab} />
        </Tabs>
      </Container>
    </Box>
  );
};

export default SettingsPagePureComponent;
