import {
  ActionIcon,
  Box,
  Flex,
  Menu,
  Select,
  Table,
  Text,
} from '@mantine/core';

import { ActionModal } from '@/components/modal/action-modal';
import { useRole } from '@/hooks/mutate/use-roles';
import { roleDeleteSchema } from '@/lib/validator/auth';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { SettingsFRoleModel } from '@/types/general';
import { useForm, yupResolver } from '@mantine/form';
import { format } from 'date-fns';
import React, { useState } from 'react';

interface Props {
  rolesList: SettingsFRoleModel[];
  onEdit?: (role: SettingsFRoleModel) => void;
}
export const RoleSettingTable: React.FC<Props> = ({ rolesList, onEdit }) => {
  const [showDelete, setShowDelete] = useState(false);
  const { isLoading, onDeleteRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<{
    id: string;
    name: string;
  }>();

  const getRoleList = () => {
    const newList = rolesList
      ?.filter((role) => role._id !== selectedRole?.id)
      ?.map((role) => {
        return {
          value: role?._id || '',
          label: role?.name || '',
        };
      });
    return newList;
  };

  const initialValues: { role: string } = {
    role: '',
  };

  const form = useForm({
    initialValues,
    validate: yupResolver(roleDeleteSchema),
  });

  const onDelete = () => {
    onDeleteRole({
      id: selectedRole?.id as string,
      roleId: form.values.role,
      cb() {
        setShowDelete(false);
      },
    });
  };

  const rows = rolesList?.map((element) => (
    <Table.Tr key={element._id}>
      <Table.Td>
        <Text className="table-item-padding table-item-text">
          {element?.name}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text className="table-item-padding table-item-text">
          {' '}
          {format(element?.createdAt || '', 'dd MMM, yyyy')}
        </Text>
      </Table.Td>

      <Table.Td>
        <Flex className="justify-end">
          <Menu withArrow>
            <Menu.Target>
              <ActionIcon bg={'transparent'}>
                <IconVerticalStack fill="#98A2B3" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  onEdit?.(element);
                }}
                className="min-w-[130px] text-[12px] font-normal"
              >
                Edit
              </Menu.Item>
              {rolesList.length > 1 && (
                <Menu.Item
                  color="red"
                  onClick={() => {
                    setShowDelete(true);
                    setSelectedRole({
                      name: element?.name as string,
                      id: element?._id as string,
                    });
                  }}
                  className="min-w-[130px] text-[12px] font-normal"
                >
                  Delete
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="overflow-x-auto">
      {/* <Table.ScrollContainer className="!m-0" minWidth={900}> */}
      <Table
        // bg={'red'}
        className="!m-0"
        horizontalSpacing="sm"
        highlightOnHover
        verticalSpacing="xs"
      >
        <Table.Thead bg={'#F8FAFC'}>
          <Table.Tr>
            <Table.Th>
              <Text className="table-head-text table-head-padding">Role</Text>
            </Table.Th>

            <Table.Th>
              <Text className="table-head-text table-head-padding">
                Date added
              </Text>
            </Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* </Table.ScrollContainer> */}

      <ActionModal
        form={form}
        isProcessing={isLoading}
        position="left"
        hideIcon={true}
        onSubmit={() => onDelete()}
        buttonText="Delete role"
        message={
          <span>
            Deleting <span className="font-bold">{selectedRole?.name}</span>{' '}
            means that every team member assigned to this role needs to be
            re-assigned.
          </span>
        }
        title="Are you sure you want to delete this role"
        onClose={() => {
          form.reset();
          setShowDelete(false);
        }}
        isVisible={showDelete}
      >
        <Select
          classNames={{
            option: '!text-[14px]',
            input: 'rounded-[8px] ',
          }}
          rightSection={<IconDropDown className="w-3" />}
          label="Role"
          {...form.getInputProps('role')}
          size="sm"
          placeholder="Select Role"
          data={getRoleList()}
        />
      </ActionModal>
    </Box>
  );
};
