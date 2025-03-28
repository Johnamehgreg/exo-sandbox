import ErrorCard from '@/components/card/error-card';
import { useTeam } from '@/hooks/mutate/use-team';
import { teamMemberSchema } from '@/lib/validator/auth';
import { TeamMemberModel } from '@/types/general';
import {
  Box,
  Button,
  Card,
  Flex,
  Modal,
  SimpleGrid,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const initialValues: TeamMemberModel = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  agentAccess: [],
};
interface Props {
  isVisible: boolean;
  onClose: () => void;
  member?: TeamMemberModel;
}

export const TeamModal: React.FC<Props> = ({ isVisible, onClose, member }) => {
  const { onCreateTeam, onUpdateTeam, isLoading } = useTeam();
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const isEdit = member?._id;
  const form = useForm({
    initialValues,
    validate: yupResolver(teamMemberSchema),
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-all-teams'],
    });
    onClose();
  };

  const onSubmit = () => {
    if (isEdit) {
      onUpdateTeam({
        errorCb: (err) => setError(err),
        values: form.values,
        cb: () => onSuccess(),
        id: member?._id || '',
      });
      return;
    }
    onCreateTeam({
      errorCb: (err) => setError(err),
      values: form.values,
      cb: () => onSuccess(),
    });
  };
  useEffect(() => {
    if (member) {
      form.setValues({
        firstName: member?.firstName || '',
        lastName: member?.lastName || '',
        email: member?.email || '',
        agentAccess: member?.agentAccess || [],
        role: 'admin',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);
  return (
    <Modal
      onClick={(e) => {
        e.stopPropagation();
      }}
      shadow="md"
      classNames={{
        title: 'text-[16px] font-medium !font-sans',
      }}
      opened={isVisible}
      onClose={onClose}
      title={`${isEdit ? 'Edit' : 'Add'} Team Member`}
    >
      <form className="w-full" onSubmit={form.onSubmit(onSubmit)}>
        <Box className="w-full">
          <ErrorCard error={error} />
          <SimpleGrid mb={'md'} cols={{ base: 1, sm: 2 }}>
            <TextInput
              {...form.getInputProps('firstName')}
              placeholder="John"
              disabled={!!isEdit}
              label="First name"
            />
            <TextInput
              {...form.getInputProps('lastName')}
              placeholder="Doe"
              disabled={!!isEdit}
              label="Last name"
            />
          </SimpleGrid>

          <TextInput
            {...form.getInputProps('email')}
            placeholder="Acme corporation"
            disabled={!!isEdit}
            label="Work email"
            mb={'md'}
          />

          <Switch.Group
            mb={'lg'}
            {...form.getInputProps('agentAccess')}
            label="AI agent access"
            classNames={{
              label: 'label-text',
            }}
          >
            <Card mb={'xs'} p={0} radius={'4px'} className="dashboard-border">
              <Card
                px={'sm'}
                className="dashboard-border-1 flex flex-row items-center justify-between rounded-none !border-x-0 !border-t-0 px-0"
              >
                <Box>
                  <Text lineClamp={2} fw={500} className="!text-[0.75rem]">
                    Fibonacci
                  </Text>
                </Box>
                <Switch value={'fibonacci'} size="md" />
              </Card>
              <Card
                px={'sm'}
                className="dashboard-border-1 flex flex-row items-center justify-between rounded-none !border-x-0 !border-y-0 px-0"
              >
                <Box>
                  <Text lineClamp={2} fw={500} className="!text-[0.75rem]">
                    Diana
                  </Text>
                </Box>
                <Switch value={'diana'} size="md" />
              </Card>
            </Card>
          </Switch.Group>

          <Flex className="justify-end">
            <Button loading={isLoading} type="submit" size="xs">
              {isEdit ? 'Edit' : 'Add'} team member
            </Button>
          </Flex>
        </Box>
      </form>
    </Modal>
  );
};
