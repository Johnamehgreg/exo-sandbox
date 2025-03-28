import { PhoneInput } from '@/components/input/phone-input';
import { useUser } from '@/hooks/mutate/use-user';
import { useGetUserProfile } from '@/hooks/query/user';
import { profileSchema } from '@/lib/validator/auth';
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Transition,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect } from 'react';
import { SettingsType, SettingTabsType } from '../extras';

interface Props {
  currentTab: SettingTabsType;
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  iso2: '',
};

const ProfileSettingTab = ({ currentTab }: Props) => {
  const { isLoading, onChangeProfile } = useUser();
  const { user, isLoading: isLoadingProfile } = useGetUserProfile();
  const form = useForm({
    initialValues,
    validate: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        iso2: user?.iso2 || '',
        jobTitle: user?.jobTitle || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Transition
      mounted={currentTab === SettingsType.Profile}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
      enterDelay={500}
    >
      {(styles) => (
        <Card className="px-[24px] py-[32px]">
          <form
            className="w-full"
            onSubmit={form.onSubmit((value) => {
              onChangeProfile(value);
            })}
          >
            <Box className="w-full" style={{ ...styles }}>
              <Text className="dashboard-text-header font-twk">
                Edit Profile
              </Text>
              <Text mb={'lg'} className="dashboaard-text-title font-twk">
                Keep your profile up-to-date with the latest details
              </Text>
              {isLoadingProfile ? (
                <Paper p="sm" style={{ height: '100px' }} mb={20}>
                  <Center style={{ height: '100%' }}>
                    <Loader />
                  </Center>
                </Paper>
              ) : (
                <>
                  <SimpleGrid mb={'md'} cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      {...form.getInputProps('firstName')}
                      placeholder="John"
                      label="First name"
                    />
                    <TextInput
                      {...form.getInputProps('lastName')}
                      placeholder="Doe"
                      label="Last name"
                    />
                  </SimpleGrid>
                  <TextInput
                    {...form.getInputProps('email')}
                    placeholder="Acme corporation"
                    label="Work email"
                    mb={'md'}
                  />
                  <TextInput
                    mb={'md'}
                    {...form.getInputProps('jobTitle')}
                    placeholder="Product Designer"
                    label="Job title"
                  />
                  <PhoneInput
                    iso2={form.values.iso2}
                    value={form.values.phoneNumber}
                    error={
                      form?.errors?.phoneNumber
                        ? `${form?.errors?.phoneNumber}`
                        : ''
                    }
                    onChangesIso2={(val) => {
                      form.setFieldValue('iso2', val);
                    }}
                    onChange={(val) => {
                      form.setFieldValue('phoneNumber', `${val}`);
                    }}
                    label="Phone number"
                    placeholder="Enter phone number"
                  />
                  <Flex className="justify-start">
                    <Button loading={isLoading} type="submit" size="xs">
                      Edit Profile
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          </form>
        </Card>
      )}
    </Transition>
  );
};

export default ProfileSettingTab;
