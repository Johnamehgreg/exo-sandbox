import { useTeam } from '@/hooks/mutate/use-team';
import warnIcon from '@/public/image/warn-icon.svg';
import { TeamMemberModel } from '@/types/general';
import { Button, Center, Flex, Image, Modal, Text } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';

import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  member?: TeamMemberModel;
}
export const DeleteTeamModal: React.FC<Props> = ({
  isVisible,
  member,
  onClose,
}) => {
  const { onDeleteTeam, isLoading } = useTeam();
  const queryClient = useQueryClient();

  return (
    <Modal
      opened={isVisible}
      shadow="md"
      onClose={onClose}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="p-4"
    >
      <Center mb={'sm'}>
        <Image loading="lazy" src={warnIcon} alt="" />
      </Center>
      <Text className="mb-2 text-center text-[16px] font-semibold">
        Are you sure you want to delete “{upperFirst(member?.firstName || '')}{' '}
        {upperFirst(member?.lastName || '')}”?
      </Text>
      <Center>
        <Text
          mb={'1.5rem'}
          className="auth-text-title text-center !text-[14px]"
        >
          Deleting a team member is a permanent action and cannot be undone.
          This member will lose access to all project data and resources.
        </Text>
      </Center>

      <Flex align={'center'} justify={'space-between'}>
        <Button size="sm" variant="default" onClick={onClose}>
          Cancel
        </Button>

        <Button
          onClick={() =>
            onDeleteTeam({
              id: member?._id || '',
              cb: () => {
                onClose();
                queryClient.invalidateQueries({
                  queryKey: ['get-all-teams'],
                });
              },
            })
          }
          loading={isLoading}
          style={{
            border: '1px solid #A23D3D',
          }}
          color="#A23D3D"
          variant="light"
        >
          Delete
        </Button>
      </Flex>
    </Modal>
  );
};
