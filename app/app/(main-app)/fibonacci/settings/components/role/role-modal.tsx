import ErrorCard from '@/components/card/error-card';
import { useRole } from '@/hooks/mutate/use-roles';
import { useGetPermissions } from '@/hooks/query/permission';
import { roleSchema } from '@/lib/validator/auth';
import { SettingsFRoleModel } from '@/types/general';
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect, useState } from 'react';

const initialValues: SettingsFRoleModel = {
  name: '',
  permissions: [],
};

interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedRole: SettingsFRoleModel;
  isCreate: boolean;
}

export const RoleFModal: React.FC<Props> = ({
  isVisible,
  onClose,
  isCreate,
  selectedRole,
}) => {
  const [error, setError] = useState('');

  const { onCreateRole, isLoading, onUpdateRole } = useRole();
  const form = useForm({
    initialValues,
    validate: yupResolver(roleSchema),
  });

  const { permissions } = useGetPermissions();
  const [permissionList, setPermissionList] = useState<
    {
      label?: string;
      value?: string;
      isSelected?: boolean;
    }[]
  >([]);

  // Sync permissions with the form
  useEffect(() => {
    if (permissions) {
      const newList = permissions?.map((per) => ({
        label: per.description,
        value: per.key,
        isSelected: false,
      }));
      setPermissionList(newList);
    }
  }, [permissions]);

  // Sync selectedRole with form values
  useEffect(() => {
    if (isVisible) {
      if (isCreate) {
        form.setValues(initialValues); // Reset form for create mode
      } else {
        form.setValues({
          name: selectedRole.name,
          permissions: selectedRole.permissions,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isCreate, selectedRole]);

  const onSubmit = () => {
    if (isCreate) {
      return onCreateRole({
        values: form.values,
        cb() {
          onClose();
        },
        errorCb(error) {
          setError(error);
        },
      });
    }

    onUpdateRole({
      values: form.values,
      id: selectedRole._id as string,
      cb() {
        onClose();
      },
      errorCb(error) {
        setError(error);
      },
    });
  };

  return (
    <Modal
      shadow="md"
      classNames={{
        body: ' p-0',
      }}
      opened={isVisible}
      centered
      size={'sm'}
      onClose={() => {
        if (isLoading) return false;
        form.reset(); // Reset form on close
        onClose();
      }}
      withCloseButton={false}
    >
      <form className="w-full" onSubmit={form.onSubmit(onSubmit)}>
        <Box className="w-full py-4">
          <Text className="px-4 !font-sans text-[16px] font-semibold">
            {isCreate ? 'Create' : 'Update'} role
          </Text>
          <ErrorCard error={error} />
          <Divider className="my-4" />

          <Box className="px-4">
            <TextInput
              classNames={{
                label: 'label-text',
              }}
              mb={'md'}
              label="Role name"
              placeholder="Loan officer"
              {...form.getInputProps('name')}
            />
            <Switch.Group
              mb={'lg'}
              {...form.getInputProps('permissions')}
              label="Access level"
              classNames={{
                label: 'label-text',
              }}
            >
              <Box mb={'xs'} p={0} className="dashboard-border rounded-[8px]">
                {permissionList?.map((perObject, index) => (
                  <Box key={perObject?.value}>
                    <Box
                      px={'sm'}
                      className="flex flex-row items-center justify-between px-0 py-2"
                    >
                      <Box>
                        <Text
                          lineClamp={2}
                          fw={500}
                          className="!text-[12px] font-normal text-[#181630]"
                        >
                          {perObject?.label}
                        </Text>
                      </Box>
                      <Switch value={perObject.value} size="lg" />
                    </Box>
                    {permissionList.length !== index + 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </Switch.Group>
          </Box>
          <Divider className="my-4" />

          <Flex className="items-center justify-between px-4">
            <Button type="button" size="xs" variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button loading={isLoading} type="submit" size="xs">
              {isCreate ? 'Create' : 'Update'} role
            </Button>
          </Flex>
        </Box>
      </form>
    </Modal>
  );
};
