import { CountryInput } from '@/components/input/country-input';
import { useOrganization } from '@/hooks/mutate/use-organization';
import { useGetUserProfile } from '@/hooks/query/user';
import { organizationSchema } from '@/lib/validator/auth';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { OrganizationModel } from '@/types/general';
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Loader,
  Paper,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Transition,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect } from 'react';
import {
  organizationIndustryList,
  SettingsType,
  SettingTabsType,
} from '../extras';

interface Props {
  currentTab: SettingTabsType;
}

const initialValues: OrganizationModel = {
  name: '',
  industry: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postalCode: '',
  country: '',
  licenseNumber: '',
  taxId: '',
};

export const OrganizationSettingTab = ({ currentTab }: Props) => {
  const { user, isLoading: isLoadingOrganization } = useGetUserProfile();
  const form = useForm({
    initialValues,
    validate: yupResolver(organizationSchema),
  });

  const { isLoading, onUpdateOrganization } = useOrganization();

  useEffect(() => {
    if (user?.organization) {
      form.setValues({
        name: user?.organization?.name || '',
        industry: user?.organization?.industry || '',
        addressLine1: user?.organization?.addressLine1 || '',
        addressLine2: user?.organization?.addressLine2 || '',
        city: user?.organization?.city || '',
        postalCode: user?.organization?.postalCode || '',
        country: user?.organization?.country || '',
        licenseNumber: user?.organization?.licenseNumber || '',
        taxId: user?.organization?.taxId || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.organization]);

  return (
    <Transition
      mounted={currentTab === SettingsType.Organization}
      enterDelay={500}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Card className="px-[24px] py-[32px]">
          <form
            className="w-full"
            onSubmit={form.onSubmit((values) => {
              onUpdateOrganization({ values: values });
            })}
          >
            <Box className="w-full" style={{ ...styles }}>
              <Text className="dashboard-text-header font-twk">
                Organization details
              </Text>
              <Text mb={'lg'} className="dashboaard-text-title font-twk">
                Edit and maintain key details about your organization
              </Text>

              {isLoadingOrganization ? (
                <Paper p="sm" style={{ height: '100px' }} mb={20}>
                  <Center style={{ height: '100%' }}>
                    <Loader />
                  </Center>
                </Paper>
              ) : (
                <>
                  <TextInput
                    {...form.getInputProps('name')}
                    placeholder="Acme corporation"
                    label="Company name"
                    mb={'md'}
                  />

                  <Select
                    mb={'md'}
                    label="Industry"
                    rightSection={<IconDropDown />}
                    placeholder="Pick Industry"
                    {...form.getInputProps('industry')}
                    data={organizationIndustryList}
                  />

                  <TextInput
                    {...form.getInputProps('companyName')}
                    placeholder="84  Lee Road"
                    {...form.getInputProps('addressLine1')}
                    label="Address Line 1"
                    mb={'md'}
                  />
                  <TextInput
                    {...form.getInputProps('addressLine2')}
                    placeholder="84  Lee Road"
                    label="Address Line 2"
                    mb={'md'}
                  />
                  <CountryInput
                    value={form.values.country}
                    onChange={(e) => {
                      form.setFieldValue('country', `${e.name}`);
                    }}
                    error={form.errors.country!}
                    label="Country"
                  />
                  <SimpleGrid mb={'md'} cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      {...form.getInputProps('city')}
                      placeholder="LA"
                      label="City"
                    />
                    <TextInput
                      {...form.getInputProps('postalCode')}
                      placeholder="E64464"
                      label="Post code"
                    />
                  </SimpleGrid>

                  <SimpleGrid mb={'md'} cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      {...form.getInputProps('licenseNumber')}
                      placeholder="License number"
                      type="number"
                      label="Business license number"
                    />
                    <TextInput
                      {...form.getInputProps('taxId')}
                      placeholder="number"
                      type="number"
                      label="Tax Identification number"
                    />
                  </SimpleGrid>
                  <Flex className="justify-end">
                    <Button loading={isLoading} type="submit" size="xs">
                      {user?.organization?.name
                        ? 'Update detail'
                        : 'Save detail'}
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
