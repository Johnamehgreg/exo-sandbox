import { PasswordInputCustom } from '@/components/input/password-input';
import { useAuth } from '@/hooks/mutate/use-auth';
import { changePasswordSchema } from '@/lib/validator/auth';
import { Box, Button, Card, Flex, List, Text, Transition } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { SettingsType, SettingTabsType } from '../extras';

interface Props {
  currentTab: SettingTabsType;
}

const initialValues: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
} = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const ChangePasswordSettingTab = ({ currentTab }: Props) => {
  const { onChangePassword, isLoading } = useAuth();

  const form = useForm({
    initialValues,
    validate: yupResolver(changePasswordSchema),
  });

  return (
    <Transition
      mounted={currentTab === SettingsType.ChangePassword}
      transition="fade-left"
      duration={400}
      enterDelay={500}
      timingFunction="ease"
    >
      {(styles) => (
        <Card className="px-[24px] py-[32px]">
          <form
            className="w-full"
            onSubmit={form.onSubmit((value) => {
              onChangePassword({
                values: {
                  oldPassword: value.oldPassword || '',
                  newPassword: value.newPassword || '',
                },
                successCallBack: () => {
                  form.reset();
                },
              });
            })}
          >
            <Box className="w-full" style={{ ...styles }}>
              <Text className="dashboard-text-header font-twk">
                Change password
              </Text>
              <Text mb={'lg'} className="dashboaard-text-title font-twk">
                Keep your profile up-to-date with the latest details
              </Text>

              <List className="mb-5" listStyleType="disc">
                <Text
                  mb={'0.2rem'}
                  className="text-[#020617]"
                  fz={'sm'}
                  fw={'bold'}
                >
                  Your password must have:
                </Text>
                <List.Item className="text-[#475569]" mb={'0.2rem'} fz={'xs'}>
                  Must be 8 - 64 characters long
                </List.Item>
                <List.Item className="text-[#475569]" mb={'0.2rem'} fz={'xs'}>
                  Must contain lowercase and uppercase characters
                </List.Item>
                <List.Item className="text-[#475569]" mb={'0.2rem'} fz={'xs'}>
                  Must contain number characters
                </List.Item>
                <List.Item className="text-[#475569]" mb={'0.2rem'} fz={'xs'}>
                  Cannot contain your name or email address
                </List.Item>
                <List.Item className="text-[#475569]" mb={'0.2rem'} fz={'xs'}>
                  Must contain a special character
                </List.Item>
              </List>

              <PasswordInputCustom
                mb={'1rem'}
                {...form.getInputProps('oldPassword')}
                label="Old password"
              />
              <PasswordInputCustom
                mb={'1rem'}
                {...form.getInputProps('newPassword')}
                label="New password"
              />
              <PasswordInputCustom
                {...form.getInputProps('confirmPassword')}
                label="Confirm password"
              />
              <Flex className="justify-end">
                <Button
                  disabled={isLoading}
                  size="xs"
                  loading={isLoading}
                  type="submit"
                >
                  Change password
                </Button>
              </Flex>
            </Box>
          </form>
        </Card>
      )}
    </Transition>
  );
};
