import { ActionModal } from '@/components/modal/action-modal';
import { useFibonacciTeam } from '@/hooks/mutate/use-fibonacci-team';
import { useGetSettingRole } from '@/hooks/query/fibonacci-s-role';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { TeamMemberModel } from '@/types/general';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Menu,
  Table,
  Text,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  teams: TeamMemberModel[];
  onEdit: (member: TeamMemberModel) => void;
}
export const TeamSettingTable: React.FC<Props> = ({ teams, onEdit }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberModel>(
    {}
  );
  const { onDeleteTeam, isLoading } = useFibonacciTeam();

  const { roles } = useGetSettingRole();
  const getRole = (roleId: string) => {
    if (roles) {
      const role = roles.find((roleObj) => roleObj._id === roleId);
      return role?.name;
    }
    return '';
  };

  const rows = teams?.map((member) => (
    <Table.Tr key={member._id}>
      <Table.Td>
        <Box className="table-item-padding">
          <Flex className="items-center gap-3">
            <Avatar size={32}>
              <Text className="table-item-text">
                {upperFirst(member?.firstName?.slice(0, 1) || '')}
                {upperFirst(member?.lastName?.slice(0, 1) || '')}
              </Text>
            </Avatar>
            <Box>
              <Text className="table-item-text">
                {upperFirst(member?.firstName || '')}{' '}
                {upperFirst(member?.lastName || '')}
              </Text>
              <Text className="text-[12px] font-normal text-[#475569]">
                {member?.email || ''}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Table.Td>
      <Table.Td>
        <Text className="table-item-padding table-item-text">
          {getRole(member?.permissions?.fibonacci || '') || '-'}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text className="table-item-padding table-item-text">
          {format(member?.createdAt || '', 'dd MMM, yyyy')}
        </Text>
      </Table.Td>

      <Table.Td>
        <Flex className="justify-end">
          <Menu withArrow trigger="hover">
            <Menu.Target>
              <ActionIcon
                onClick={(e) => {
                  e.stopPropagation();
                }}
                bg={'transparent'}
              >
                <IconVerticalStack fill="#98A2B3" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(member);
                }}
                className="min-w-[130px] text-[12px] font-normal"
              >
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                onClick={(e) => {
                  setSelectedTeamMember(member);
                  e.stopPropagation();
                  setShowDelete(true);
                }}
                className="min-w-[130px] text-[12px] font-normal"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="overflow-x-scroll">
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
              <Text className="table-head-text table-head-padding">Name</Text>
            </Table.Th>
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
        isProcessing={isLoading}
        buttonText="Delete member"
        message={`Deleting team member ${selectedTeamMember?.email} means that \nthey  will no longer have access to Fibonacci.`}
        title={`Are you sure you want to delete \nthis team member?`}
        onClose={() => {
          setShowDelete(false);
        }}
        onSubmit={() => {
          onDeleteTeam({
            id: selectedTeamMember._id || '',
            cb() {
              setShowDelete(false);
            },
          });
        }}
        isVisible={showDelete}
      />
    </Box>
  );
};
