import { ActionModal } from '@/components/modal/action-modal';
import { EscalateModal } from '@/components/modal/escalate-modal';
import { TransactionActionComponent } from '@/components/modal/transaction-action-component';
import { useTransaction } from '@/hooks/mutate/use-transaction';
import { noteSchema } from '@/lib/validator/auth';
import { IconApproved } from '@/public/assets/svg/icon-approved';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { TransactionModel } from '@/types/general';
import { Box, Button, Flex, Textarea, useMantineTheme } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useState } from 'react';

interface TransactionActionCardProps {
  refetch?: () => void;
  transactionDetail: TransactionModel | null;
}

export const TransactionActionCard: React.FC<TransactionActionCardProps> = ({
  refetch,
  transactionDetail,
}) => {
  const [showEsModal, setShowEsModal] = useState(false);
  const [showBsModal, setShowBsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [isApprovedClick, setIsApprovedClick] = useState(false);
  const theme = useMantineTheme();
  const { onApprovedTransaction, isLoading } = useTransaction();

  const initialValues: { note: string } = {
    note: '',
  };

  const form = useForm({
    initialValues,
    validate: yupResolver(noteSchema),
  });

  const onSaveNote = () => {
    onApprovedTransaction({
      values: {
        approve: isApprovedClick,
        note: form.values.note || '',
      },
      transactionId: transactionDetail?._id as string,
      cb() {
        form.reset();
        refetch?.();
        setShowApproveModal(false);
      },
    });
  };

  return (
    <Box className="mt-[300px]">
      <Flex
        className={`index-3 dashboard-horizontal-padding bottom-0 right-0 z-[1000] flex w-full flex-col flex-wrap items-center justify-between gap-4 bg-p1 py-4 transition-all xs:flex-row`}
      >
        <TransactionActionComponent
          refetch={refetch}
          transactionId={transactionDetail?._id}
          label={
            <Button
              rightSection={<IconDropDown className="w-3" />}
              size="xs"
              className="w-full bg-[#fff] text-[#000] xs:w-[100px]"
            >
              Actions
            </Button>
          }
        />
        {(transactionDetail?.review === 'needs_review' ||
          !transactionDetail?.review) && (
          <Flex className="w-full flex-col gap-2 xs:w-auto xs:flex-row">
            <Button
              onClick={() => {
                setIsApprovedClick(false);
                setShowApproveModal(true);
              }}
              className="w-full border-danger text-danger xs:w-auto"
              size="xs"
              style={{
                border: '1px solid #A23D3D',
              }}
              bg="#FAEDEB"
              variant="light"
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                setIsApprovedClick(true);
                setShowApproveModal(true);
              }}
              className="w-full bg-vibrantgreen text-white xs:w-auto"
              size="xs"
            >
              Approve
            </Button>
          </Flex>
        )}

        <EscalateModal
          isVisible={showEsModal}
          onClose={() => {
            setShowEsModal(false);
          }}
          transactionId={transactionDetail?._id as string}
        />
        <ActionModal
          buttonText={'Blacklist account'}
          message="Adding a user to blacklist means the user won’t be able to complete transactions, anywhere and anytime"
          title="Are you sure you want to add user to blacklist"
          isVisible={showBsModal}
          onClose={() => {
            setShowBsModal(false);
          }}
        />

        <ActionModal
          form={form}
          isProcessing={isLoading}
          position="left"
          // position={isApprovedClick ? "center" : "left"}
          Icon={IconApproved}
          buttonText={isApprovedClick ? 'Approve' : 'Reject'}
          hideIcon={!isApprovedClick}
          title={
            isApprovedClick
              ? 'Are you sure you want to approve this transaction?'
              : 'Are you sure you want to reject this transaction?'
          }
          message={
            isApprovedClick ? (
              <span>
                Approving transaction
                <span className="px-1 font-bold">TXN61290918</span>
                means that the transaction will go through and this cannot be
                undone
              </span>
            ) : (
              <span>
                Rejecting transaction
                <span className="px-1 font-bold">TXN61290918</span>
                means that the transaction will go through and this cannot be
                undone
              </span>
            )
          }
          isVisible={showApproveModal}
          // position='flex-end'
          buttonStyle={{
            backgroundColor: isApprovedClick
              ? theme.colors[theme.primaryColor][6]
              : '',
          }}
          onSubmit={() => {
            onSaveNote();
            form.reset();
          }}
          onClose={() => {
            form.reset();
            setShowApproveModal(false);
          }}
        >
          <Textarea
            mb={'lg'}
            {...form.getInputProps('note')}
            label="Note"
            placeholder="Enter note"
            resize="vertical"
            rows={10}
            h={111}
            maxRows={10}
            classNames={{
              input: 'rounded-[6.68px] !h-full',
              wrapper: 'h-full',
            }}
          />
        </ActionModal>
      </Flex>
    </Box>
  );
};
