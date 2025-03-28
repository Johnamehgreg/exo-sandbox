import ErrorCard from '@/components/card/error-card';
import { useFibonacciTeam } from '@/hooks/mutate/use-fibonacci-team';
import { useGetSettingRole } from '@/hooks/query/fibonacci-s-role';
import { fibonacciTeamSchema } from '@/lib/validator/auth';
import { IconClose } from '@/public/assets/svg/icon-close';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { TeamMemberModel } from '@/types/general';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect, useState } from 'react';

const initialValues: TeamMemberModel = {
  firstName: '',
  lastName: '',
  email: '',
  roleId: '',
};
interface Props {
  isVisible: boolean;
  onClose: () => void;
  isCreate: boolean;
  selectedTeamMember: TeamMemberModel;
}

export const TeamFModal: React.FC<Props> = ({
  isVisible,
  onClose,
  isCreate,
  selectedTeamMember,
}) => {
  const [error, setError] = useState('');
  const [roleList, setRoleList] = useState<{ label: string; value: string }[]>(
    []
  );
  const { roles } = useGetSettingRole();
  const form = useForm({
    initialValues,
    validate: yupResolver(fibonacciTeamSchema),
  });
  const handleClose = () => {
    onClose();
    setError('');
    form.reset();
    form.resetTouched();
  };
  const { onCreateTeam, onUpdateTeam, isLoading } = useFibonacciTeam();

  useEffect(() => {
    if (roles) {
      const newList = roles?.map((roleItem) => {
        return {
          label: roleItem.name || '',
          value: roleItem?._id || '',
        };
      });
      setRoleList(newList);
    }
  }, [roles]);

  const onSubmit = () => {
    if (isCreate) {
      return onCreateTeam({
        values: form.values,
        cb() {
          handleClose();
        },
        errorCb(message) {
          setError(message);
        },
      });
    }
    onUpdateTeam({
      values: form.values,
      id: selectedTeamMember?._id || '',
      cb() {
        handleClose();
      },
      errorCb(message) {
        setError(message);
      },
    });
  };

  useEffect(() => {
    if (selectedTeamMember && !isCreate) {
      form.setValues({
        firstName: selectedTeamMember.firstName || '',
        lastName: selectedTeamMember.lastName || '',
        email: selectedTeamMember.email || '',
        roleId: selectedTeamMember.permissions?.fibonacci || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreate, selectedTeamMember]);

  return (
    <Drawer
      shadow="md"
      opened={isVisible}
      size={'sm'}
      onClose={() => {
        if (isLoading) return null;
        handleClose();
      }}
      offset={8}
      radius="md"
      classNames={{
        body: '!p-0 ',
      }}
      position="right"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <form className="w-full" onSubmit={form.onSubmit(onSubmit)}>
        <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
          <Text className="px-4 !font-sans text-[16px] font-semibold">
            Add team member
          </Text>
          <ActionIcon variant="white" onClick={() => onClose()}>
            <IconClose />
          </ActionIcon>
        </Flex>
        <Box className="h-[calc(100vh-140px)] flex-1 overflow-y-scroll px-4 pt-8">
          <Box className="px-4">
            <ErrorCard error={error} />
          </Box>
          <Box>
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
              mb={'md'}
              label="Email"
              {...form.getInputProps('email')}
              placeholder="Enter work email address "
            />
            <Select
              {...form.getInputProps('roleId')}
              mb={'2rem'}
              classNames={{
                input: 'rounded-[8px] ',
              }}
              rightSection={<IconDropDown className="w-3" />}
              label="Role"
              placeholder="Select role  "
              data={roleList}
              nothingFoundMessage="No role available"
            />
          </Box>
        </Box>
        <Flex className="dashboard-border h-[68px] items-center justify-between !border-x-0 !border-b-0 px-4">
          <Button
            type="submit"
            size="sm"
            variant="default"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" loading={isLoading}>
            {isCreate ? 'Add' : 'Update'} member
          </Button>
        </Flex>
      </form>
    </Drawer>
  );
};
