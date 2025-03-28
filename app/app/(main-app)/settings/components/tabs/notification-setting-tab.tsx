import { useNotification } from '@/hooks/mutate/use-notification';
import { useGetUserProfile } from '@/hooks/query/user';
import { NotificationModel } from '@/types/general';
import {
  Box,
  Card,
  Skeleton,
  Stack,
  Switch,
  Text,
  Transition,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { SettingsType, SettingTabsType } from '../extras';

interface Prop {
  currentTab: SettingTabsType;
}

const notificationInitalValues = {
  dailySummaries: false,
  weeklyReports: false,
  updatesFromAIAgent: false,
  criticalAlerts: false,
  systemUpdates: false,
};

export const NotificationSetting = ({ currentTab }: Prop) => {
  const [notification, setNotification] = useState<NotificationModel>(
    notificationInitalValues
  );
  const { user, isLoading } = useGetUserProfile();
  const { onUpdateTeam } = useNotification();

  useEffect(() => {
    if (user?.notificationSettings) {
      setNotification({
        dailySummaries: user?.notificationSettings?.dailySummaries || false,
        weeklyReports: user?.notificationSettings?.weeklyReports || false,
        updatesFromAIAgent:
          user?.notificationSettings?.updatesFromAIAgent || false,
        criticalAlerts: user?.notificationSettings?.criticalAlerts || false,
        systemUpdates: user?.notificationSettings?.systemUpdates || false,
      });
    }
  }, [user?.notificationSettings]);

  return (
    <Transition
      mounted={currentTab === SettingsType.Notifications}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
      enterDelay={500}
    >
      {(styles) => (
        <Card style={styles} className="px-[24px] py-[32px]">
          <Box className="w-full">
            <Text className="dashboard-text-header font-twk">
              Tell us how you want to be notified
            </Text>
            <Text mb={'lg'} className="dashboaard-text-title font-twk">
              Edit and maintain key details about your organization
            </Text>
            {isLoading ? (
              <Stack gap="md">
                {[...Array(5)].map((_, index) => (
                  <Box
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box className="py-2">
                      <Skeleton height={16} width={180} radius="sm" mb={10} />
                      <Skeleton height={12} width={250} radius="sm" mt={4} />
                    </Box>
                    <Skeleton height={32} width={52} radius="xl" />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Card p={0} radius={'4px'} className="dashboard-border">
                <Card
                  px={'sm'}
                  className="dashboard-border-1 flex flex-row items-center justify-between gap-4 rounded-none !border-x-0 !border-t-0 px-0"
                >
                  <Box>
                    <Text
                      lineClamp={2}
                      fw={500}
                      className="font-twk !text-[14px]"
                    >
                      Daily Summaries
                    </Text>
                    <Text className="dashboaard-text-title font-twk !text-[12px]">
                      Receive daily summaries on business performance and AI
                      agents
                    </Text>
                  </Box>
                  <Switch
                    checked={notification.dailySummaries}
                    onChange={(event) => {
                      setNotification({
                        ...notification,
                        dailySummaries: event.target.checked,
                      });
                      onUpdateTeam({
                        values: {
                          dailySummaries: event.target.checked,
                        },
                      });
                    }}
                    size="md"
                  />
                </Card>
                <Card
                  px={'sm'}
                  className="dashboard-border-1 flex flex-row items-center justify-between rounded-none !border-x-0 !border-t-0 px-0"
                >
                  <Box>
                    <Text
                      lineClamp={2}
                      fw={500}
                      className="font-twk !text-[14px]"
                    >
                      Weekly Reports
                    </Text>
                    <Text className="dashboaard-text-title font-twk !text-[12px]">
                      Receive weekly reports on business performance and AI
                      agents{' '}
                    </Text>
                  </Box>
                  <Switch
                    onChange={(event) => {
                      setNotification({
                        ...notification,
                        weeklyReports: event.target.checked,
                      });
                      onUpdateTeam({
                        values: {
                          weeklyReports: event.target.checked,
                        },
                      });
                    }}
                    checked={notification.weeklyReports}
                    size="md"
                  />
                </Card>
                <Card
                  px={'sm'}
                  className="dashboard-border-1 flex flex-row items-center justify-between rounded-none !border-x-0 !border-t-0 px-0"
                >
                  <Box>
                    <Text
                      lineClamp={2}
                      fw={500}
                      className="font-twk !text-[14px]"
                    >
                      Updates from AI agents
                    </Text>
                    <Text className="dashboaard-text-title font-twk !text-[12px]">
                      Notify me when there are updates from my active agents
                    </Text>
                  </Box>
                  <Switch
                    onChange={(event) => {
                      setNotification({
                        ...notification,
                        updatesFromAIAgent: event.target.checked,
                      });
                      onUpdateTeam({
                        values: {
                          updatesFromAIAgent: event.target.checked,
                        },
                      });
                    }}
                    checked={notification.updatesFromAIAgent}
                    size="md"
                  />
                </Card>
                <Card
                  px={'sm'}
                  className="dashboard-border-1 flex flex-row items-center justify-between rounded-none !border-x-0 !border-t-0 px-0"
                >
                  <Box>
                    <Text
                      lineClamp={2}
                      fw={500}
                      className="font-twk !text-[14px]"
                    >
                      Critical alerts and reminders
                    </Text>
                    <Text className="dashboaard-text-title font-twk !text-[12px]">
                      Notify me for AI downtime or isssues
                    </Text>
                  </Box>
                  <Switch
                    onChange={(event) => {
                      setNotification({
                        ...notification,
                        criticalAlerts: event.target.checked,
                      });
                      onUpdateTeam({
                        values: {
                          criticalAlerts: event.target.checked,
                        },
                      });
                    }}
                    checked={notification.criticalAlerts}
                    size="md"
                  />
                </Card>
                <Card
                  px={'sm'}
                  className="dashboard-border-1 flex flex-row items-center justify-between rounded-none !border-0 !border-x-0 px-0"
                >
                  <Box>
                    <Text
                      lineClamp={2}
                      fw={500}
                      className="font-twk !text-[14px]"
                    >
                      System Updates and Announcements
                    </Text>
                    <Text className="dashboaard-text-title font-twk !text-[12px]">
                      Notify me on any system updates or annoucements
                    </Text>
                  </Box>
                  <Switch
                    onChange={(event) => {
                      setNotification({
                        ...notification,
                        systemUpdates: event.target.checked,
                      });
                      onUpdateTeam({
                        values: {
                          systemUpdates: event.target.checked,
                        },
                      });
                    }}
                    checked={notification.systemUpdates}
                    size="md"
                  />
                </Card>
              </Card>
            )}
          </Box>
        </Card>
      )}
    </Transition>
  );
};
