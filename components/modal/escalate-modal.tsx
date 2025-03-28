import { useTransaction } from '@/hooks/mutate/use-transaction';
import { useGetTeamMember } from '@/hooks/query/team';
import { escalateTransactionSchema } from '@/lib/validator/auth';
import { EscalateModel } from '@/types/general';
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
  Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useState } from 'react';
import ErrorCard from '../card/error-card';
import { UserInput } from '../input/user-input';

const initialValues: EscalateModel = {
  escalateTo: '',
  reason: '',
};
interface Props {
  isVisible: boolean;
  onClose: () => void;
  transactionId: string;
}

export const EscalateModal: React.FC<Props> = ({
  isVisible,
  onClose,
  transactionId,
}) => {
  const [error, setError] = useState('');

  const { onEscalateCase, isLoading } = useTransaction();

  const {
    teamMembers,
    updateQuery,
    isLoading: isLoadingMembers,
  } = useGetTeamMember({ assigned: 1, isEnabled: isVisible });

  const form = useForm({
    initialValues,
    validate: yupResolver(escalateTransactionSchema),
  });

  const onSubmit = () => {
    const data = {
      escalateTo: form.values.escalateTo,
      reason: form.values.reason,
      transactionId,
    };
    onEscalateCase({
      values: data,
      cb() {
        onClose();
      },
      errorCb(message) {
        setError(message);
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
      onClick={(e) => {
        e.stopPropagation();
      }}
      onClose={() => {
        if (isLoading) return null;
        onClose();
      }}
      withCloseButton={false}
    >
      <form className="w-full" onSubmit={form.onSubmit(onSubmit)}>
        <Box className="w-full py-4">
          <div className="grid gap-1">
            <Text className="px-4 !font-sans text-[16px] font-semibold">
              Escalate transaction
            </Text>
            <Text className="px-4 text-[12px] font-[250] text-gray-600">
              {transactionId}
            </Text>
          </div>

          <ErrorCard error={error} />
          <Divider className="my-4" />

          <Box className="h-[270px] px-4">
            <UserInput
              onChange={(e) => {
                form.setFieldValue('escalateTo', e);
              }}
              data={teamMembers}
              error={form.errors.country!}
              label="Select user"
              placeholder="Select user"
              {...{ updateQuery, isLoadingMembers }}
            />

            <Textarea
              label="Reason"
              placeholder="Enter reason"
              h={70}
              rows={10}
              {...form.getInputProps('reason')}
              classNames={{
                input: 'rounded-[6.68px] !h-full',
                wrapper: 'h-full',
                label: '!text-gray-800 !text-[12px] !font-[400]',
              }}
            />
          </Box>
          <Divider className="my-4" />

          <Flex className="items-center justify-between px-4">
            <Button size="xs" variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="xs" loading={isLoading}>
              Escalate
            </Button>
          </Flex>
        </Box>
      </form>
    </Modal>
  );
};
