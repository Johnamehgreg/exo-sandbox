import {
  ActionIcon,
  Loader,
  Menu,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { ActionModal } from './action-modal';

import { useBlacklist } from '@/hooks/mutate/use-blacklist';
import { useBlacklistTransaction } from '@/hooks/query/blacklist';
import { noteSchema } from '@/lib/validator/auth';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { useForm, yupResolver } from '@mantine/form';
import { EscalateModal } from './escalate-modal';
interface Props {
  label?: React.ReactNode;
  transactionId?: string;
  refetch?: () => void;
}

export const TransactionActionComponent: React.FC<Props> = ({
  label,
  refetch,
  transactionId,
}) => {
  const [isMenuOpened, setisMenuOpened] = useState(false);
  const [showEsModal, setShowEsModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<string>('');
  const theme = useMantineTheme();
  const {
    blacklistDetail,
    refetch: blacklistRefetch,
    isLoading: isLoadingBlacklistDetails,
  } = useBlacklistTransaction({
    isEnabled: isMenuOpened,
    transactionId: transactionId as string,
  });
  const initialValues: { note: string } = {
    note: '',
  };

  const form = useForm({
    initialValues,
    validate: yupResolver(noteSchema),
  });

  const actionList = [
    { label: 'Escalate', value: 'escalate' },
    {
      label: blacklistDetail?.user?.blacklisted
        ? 'Unblacklist user'
        : 'Blacklist user',
      value: 'user',
    },
    {
      label: blacklistDetail?.device?.blacklisted
        ? 'Unblacklist device'
        : 'Blacklist device',
      value: 'device',
    },
    {
      label: blacklistDetail?.sender?.blacklisted
        ? 'Unblacklist sender account'
        : 'Blacklist sender account',
      value: 'sender',
    },
    {
      label: blacklistDetail?.recipient?.blacklisted
        ? 'Unblacklist receiver account'
        : 'Blacklist receiver account',
      value: 'receiver',
    },
  ];
  const getActionType = () => {
    switch (actionType) {
      case 'user':
        return {
          title: `Are you sure you want to ${
            blacklistDetail?.user?.blacklisted ? 'remove' : 'add'
          } user  ${blacklistDetail?.user?.blacklisted ? 'from' : 'to'} blacklist`,
          message:
            'Adding a user to blacklist means the user won’t be able to complete transactions, anywhere and anytime',
          showNote: true,
          isBlacklisted: blacklistDetail?.user?.blacklisted,
          position: 'left',
          type: 'users',
          hideIcon: true,
          blacklistType: 'user',
          blacklistId: blacklistDetail?.user?.id,
          buttonTText: blacklistDetail?.user?.blacklisted
            ? 'Unblacklist user '
            : 'Blacklist user',
        };
      case 'device':
        return {
          title: `Are you sure you want to ${
            blacklistDetail?.device?.blacklisted
              ? 'remove device from blacklist'
              : 'add device to blacklist'
          } `,
          message:
            'Adding a device to blacklist means a user won’t be able to use a device to complete transactions, anywhere and anytime',
          showNote: true,
          isBlacklisted: blacklistDetail?.device?.blacklisted,
          hideIcon: true,
          position: 'left',
          type: 'devices',
          blacklistType: 'device',
          blacklistId: blacklistDetail?.device?.id,
          buttonTText: blacklistDetail?.device?.blacklisted
            ? 'Unblacklist device'
            : 'Blacklist device',
        };
      case 'sender':
        return {
          title: `Are you sure you want to ${
            blacklistDetail?.sender?.blacklisted
              ? 'remove sender account from blacklist'
              : 'add sender account to blacklist'
          }`,
          message:
            'Adding a sender account to blacklist means the account won’t be able to complete transactions, anywhere and anytime',
          showNote: true,
          blacklistId: blacklistDetail?.sender?.id,
          buttonTText: blacklistDetail?.sender?.blacklisted
            ? 'Unblacklist sender account'
            : 'Blacklist sender account',
          isBlacklisted: blacklistDetail?.sender?.blacklisted,
          position: 'center',
          type: 'accounts',
          blacklistType: 'sender',
        };
      case 'receiver':
        return {
          title: `Are you sure you want to ${
            blacklistDetail?.recipient?.blacklisted
              ? 'remove receiver account from blacklist'
              : 'add receiver account to blacklist'
          } `,
          message:
            'Adding a receiver account to blacklist means the account won’t be able to complete transactions, anywhere and anytime',
          showNote: true,
          buttonTText: blacklistDetail?.recipient?.blacklisted
            ? 'Unblacklist receiver account'
            : 'Blacklist receiver account',
          isBlacklisted: blacklistDetail?.recipient?.blacklisted,
          position: 'center',
          blacklistId: blacklistDetail?.recipient?.id,
          type: 'accounts',
          blacklistType: 'recipient',
        };
      default:
        return {
          title: 'Are you sure you want to add receiver account to blacklist',
          message:
            'Adding a receiver account to blacklist means the account won’t be able to complete transactions, anywhere and anytime',
          showNote: true,
          buttonTText: 'Blacklist account',
          position: 'center',
          type: 'recipient',
        };
    }
  };

  const clearForm = () => {
    form.reset();
    form.setValues({
      note: '',
    });
  };

  const { onBlacklist, isLoading } = useBlacklist();
  const { onDeleteBlacklist, isLoading: isProcessing } = useBlacklist();

  const handleSubmit = () => {
    if (getActionType()?.blacklistId && getActionType()?.isBlacklisted) {
      return onDeleteBlacklist({
        id: getActionType()?.blacklistId as string,
        type: getActionType()?.type as string,
        cb() {
          clearForm();
          refetch?.();
          blacklistRefetch();
          setShowActionModal(false);
        },
      });
    }
    onBlacklist({
      values: {
        type: getActionType().blacklistType || 'device',
        note: form.values.note.trim(),
        transactionId: transactionId || '',
      },
      cb() {
        clearForm();
        refetch?.();
        blacklistRefetch();
        setShowActionModal(false);
      },
    });
  };
  return (
    <>
      <Menu withArrow trigger="hover" onChange={(val) => setisMenuOpened(val)}>
        <Menu.Target>
          {label ? (
            label
          ) : (
            <ActionIcon
              onClick={(e) => {
                e.stopPropagation();
              }}
              bg={'transparent'}
            >
              <IconVerticalStack fill="#98A2B3" />
            </ActionIcon>
          )}
        </Menu.Target>
        <Menu.Dropdown>
          {isLoadingBlacklistDetails ? (
            <Loader />
          ) : (
            <>
              {actionList.map((item) => {
                return (
                  <Menu.Item
                    key={item.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.value === 'escalate') {
                        setShowEsModal(true);
                        return;
                      }
                      setActionType(item.value);
                      setShowActionModal(true);
                    }}
                    className="min-w-[130px] text-[12px] font-normal"
                  >
                    {item.label}
                  </Menu.Item>
                );
              })}
            </>
          )}
        </Menu.Dropdown>
      </Menu>
      <EscalateModal
        isVisible={showEsModal}
        onClose={() => {
          setShowEsModal(false);
        }}
        transactionId={transactionId as string}
      />
      <ActionModal
        isProcessing={isLoading || isProcessing || isLoadingBlacklistDetails}
        // @ts-expect-error typescript unable to infer types
        form={getActionType()?.blacklistId ? false : form}
        onSubmit={handleSubmit}
        message={getActionType()?.isBlacklisted ? '' : getActionType()?.message}
        hideIcon={getActionType()?.hideIcon}
        position="center"
        title={getActionType()?.title}
        buttonText={getActionType()?.buttonTText}
        buttonBgColor={
          getActionType()?.isBlacklisted
            ? theme.colors[theme.primaryColor][6]
            : ''
        }
        onClose={() => {
          clearForm();
          setShowActionModal(false);
        }}
        isVisible={showActionModal}
      >
        {getActionType()?.showNote && !getActionType()?.isBlacklisted && (
          <Textarea
            {...form.getInputProps('note')}
            label="Note"
            placeholder="Enter note"
            classNames={{
              input: 'rounded-[6.68px] h-[100px]',
            }}
          />
        )}
      </ActionModal>
    </>
  );
};
