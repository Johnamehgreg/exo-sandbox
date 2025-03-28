import DataNotFound from '@/components/other/DataNotFound';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useGetTeamMember } from '@/hooks/query/team';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { TeamMemberModel } from '@/types/general';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Menu,
  Table,
  Text,
  Transition,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { format } from 'date-fns';
import { useState } from 'react';
import { DeleteTeamModal } from '../delete-team-modal';
import { SettingsType, SettingTabsType } from '../extras';
import { TeamModal } from '../team-modal';

interface Props {
  currentTab: SettingTabsType;
}

export const TeamSettingTab = ({ currentTab }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { teamMembers, isLoading } = useGetTeamMember({
    isEnabled: currentTab === SettingsType.Team,
  });
  const [ShowDelete, setShowDelete] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberModel>({});

  const handleCloseTeamModal = () => {
    setShowModal(false);
  };

  const handleDeleteTeamModal = () => {
    setShowDelete(false);
  };

  const rows = teamMembers?.map((member) => (
    <Table.Tr key={member._id}>
      <Table.Td>
        <Flex className="table-item-padding" align={'center'} gap={'xs'}>
          <Avatar size={32}>
            <Text className="text-[14px] font-semibold text-[#000]">
              {upperFirst(member?.firstName?.slice(0, 1) || '')}
              {upperFirst(member?.lastName?.slice(0, 1) || '')}
            </Text>
          </Avatar>
          <Box>
            <Text lineClamp={2} fw={500} className="table-item-text">
              {upperFirst(member?.firstName || '')}{' '}
              {upperFirst(member?.lastName || '')}
            </Text>
            <Text className="dashboaard-text-title !text-[12px]">
              {member?.email || ''}
            </Text>
          </Box>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Text
          tt={'capitalize'}
          lineClamp={2}
          className="table-item-padding table-item-text text-center"
        >
          {member?.agentAccess?.length === 0 && '-'}
          {member?.agentAccess?.map(
            (access, index) =>
              `${access}${
                index + 1 !== member?.agentAccess?.length ? ', ' : ''
              }`
          )}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text
          miw={100}
          lineClamp={2}
          fw={500}
          className="table-item-padding table-item-text text-center"
        >
          {member?.lastLogin
            ? format(member?.lastLogin || '', 'dd MMM, yyyy')
            : '-'}
        </Text>
      </Table.Td>
      <Table.Td>
        {!member.isOwner && (
          <Menu withArrow>
            <Menu.Target>
              <ActionIcon bg={'transparent'}>
                <IconVerticalStack fill="#98A2B3" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setSelectedMember(member);
                  setShowModal(true);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                onClick={() => {
                  setSelectedMember(member);
                  setShowDelete(true);
                }}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Transition
      mounted={currentTab === SettingsType.Team}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
      enterDelay={500}
    >
      {(styles) => (
        <Card className="px-[24px] py-[32px]">
          <Box className="w-full" style={{ ...styles }}>
            <Flex
              mb={'lg'}
              className="flex-wrap items-center justify-between gap-5"
            >
              <Box>
                <Text className="dashboard-text-header font-twk">
                  Manage team
                </Text>
                <Text className="dashboaard-text-title font-twk">
                  Effortlessly manage and onboard team members
                </Text>
              </Box>
              <Button
                onClick={() => {
                  setShowModal(true);
                  setSelectedMember({});
                }}
              >
                New team member
              </Button>
            </Flex>
            {isLoading ? (
              <TableSkeleton col={3} row={5} />
            ) : teamMembers?.length ? (
              <Card radius={'4px'} className="dashboard-border !p-0">
                <Table.ScrollContainer minWidth={500}>
                  <Table highlightOnHover verticalSpacing="md">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>
                          <Text className="table-head-text table-head-padding">
                            Team member
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text className="table-head-text table-head-padding text-center">
                            Access
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text className="table-head-text table-head-padding text-center">
                            Last login
                          </Text>
                        </Table.Th>
                        <Table.Th></Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Card>
            ) : (
              <DataNotFound message="No team member found" />
            )}
            <TeamModal
              member={selectedMember}
              isVisible={showModal}
              onClose={handleCloseTeamModal}
            />
            <DeleteTeamModal
              member={selectedMember}
              isVisible={ShowDelete}
              onClose={handleDeleteTeamModal}
            />
          </Box>
        </Card>
      )}
    </Transition>
  );
};
