import { ActionModal } from '@/components/modal/action-modal';
import {
  useAddWebhook,
  useDisableWebhook,
} from '@/components/other/use-webhook';
import { toast } from '@/components/ui/toast';
import { useGenerateNewWebhookKey } from '@/hooks/query/webhook';
import { cn } from '@/lib/utils';
import { IconCopy } from '@/public/assets/svg/icon-copy';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { WebhookModel } from '@/types/general';
import {
  ActionIcon,
  Anchor,
  Box,
  CopyButton,
  Flex,
  Menu,
  rem,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { format } from 'date-fns';
import { useState } from 'react';
import WebHooksModal from './web-hooks-modal';
import { fibonacciDocs } from '@/lib/links';

const menuItemClass = 'text-[12px] font-normal min-w-[130px]';

const tableHeadings = [
  'Endpoint URL',
  'Secret Key',
  'Last Delivery Time',
  'Status',
  '',
];

type Props = {
  data: WebhookModel;
};
const WebHooksTable = ({ data }: Props) => {
  const [isEnabledGenerateWebhookKey, setIsEnabledGenerateWebhookKey] =
    useState(false);

  const [
    openedEditUrlModal,
    { open: openEditUrlModal, close: closeEditUrlModal },
  ] = useDisclosure();

  const [
    openedDisableWebHook,
    { open: openDisableWebHook, close: closeDisableWebHookModal },
  ] = useDisclosure();

  const [
    openedGenerateKeyModal,
    { open: openGenerateKeyModal, close: closeGenerateKeyModal },
  ] = useDisclosure();

  const handleToggleWebhook = () => openDisableWebHook(); // Use this for both enable/disable
  const handleEditUrl = () => openEditUrlModal();
  const handleGenerateNewWebhookKey = () => openGenerateKeyModal();

  const editUrlModalCb = () => {
    closeDisableWebHookModal();
    closeEditUrlModal();
  };

  const generateNewWebhookKeyCb = () => {
    setIsEnabledGenerateWebhookKey(false);
    toast({
      message: 'New webhook key generated successfully',
      variant: 'success',
    });
    closeGenerateKeyModal();
  };

  const { isFetching } = useGenerateNewWebhookKey(
    isEnabledGenerateWebhookKey,
    generateNewWebhookKeyCb
  );
  const { mutate, isPending: isPendingWebHook } = useAddWebhook(editUrlModalCb);
  const { isPendingDisableWebhook, mutateDisabledWebhook } = useDisableWebhook(
    closeDisableWebHookModal
  );

  const handleSubmitEditUrl = (data: { url: string }) => {
    mutate({ url: data?.url });
  };

  // Handle enabling/disabling webhook based on current status
  const handleSubmitToggleWebhook = () => {
    if (data?.status === 'enabled') {
      // Disable webhook if it's currently enabled
      mutateDisabledWebhook();
    } else {
      // Enable webhook if it's currently disabled
      mutate({ url: data?.url });
    }
  };

  const rows = () => (
    <Table.Tr key={data?._id}>
      <Table.Td>
        <Text className="table-item-padding table-item-text">{data?.url}</Text>
      </Table.Td>
      <Table.Td>
        <Flex className="table-item-padding items-center gap-x-[10px]">
          <Text lineClamp={1} className="table-item-text">
            {data?.secret.slice(0, 4)} #### #### ####
          </Text>
          <CopyButton value={data?.secret as string} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy'}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? 'teal' : 'gray'}
                  variant="subtle"
                  onClick={copy}
                >
                  {copied ? (
                    <IconCopy style={{ width: rem(20) }} />
                  ) : (
                    <IconCopy style={{ width: rem(20) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Text className="table-item-padding table-item-text">
          {data?.createdAt ? format(data?.createdAt, 'dd-MMM-yyyy') : '-'}
        </Text>
      </Table.Td>
      <Table.Td>
        <Flex
          className={cn(
            'table-item-padding h-[29px] w-[94px] items-center justify-center rounded bg-[#F1F5F9] text-[#64748B]',
            {
              'bg-[#EEF7F2] text-[#177A48]': data?.status === 'enabled',
            }
          )}
        >
          <Text className="table-item-text">
            {data?.status === 'enabled' ? 'Active' : 'Inactive'}
          </Text>
        </Flex>
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
                  handleToggleWebhook();
                }}
                className={menuItemClass}
              >
                {data?.status === 'enabled'
                  ? 'Disable Webhook'
                  : 'Enable Webhook'}
              </Menu.Item>

              <Menu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditUrl();
                }}
                className={menuItemClass}
              >
                Edit URL
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  handleGenerateNewWebhookKey();
                }}
                className={menuItemClass}
              >
                Generate New Key
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
  return (
    <>
      <WebHooksModal
        isProcessing={isPendingWebHook}
        onClose={closeEditUrlModal}
        opened={openedEditUrlModal}
        onSubmit={handleSubmitEditUrl}
        buttonLabel="Save Changes"
        title="Edit URL"
        initialData={{
          url: data?.url,
        }}
      />

      <ActionModal
        isProcessing={isPendingDisableWebhook || isPendingWebHook}
        buttonText={`${data?.status === 'enabled' ? 'Disable Webhook' : 'Enable Webhook'
          }`}
        title={`Are you sure you want to ${data?.status === 'enabled' ? 'disable' : 'enable'
          } this webhook?`}
        onClose={closeDisableWebHookModal}
        onSubmit={handleSubmitToggleWebhook}
        isVisible={openedDisableWebHook}
        buttonBgColor={`${data?.status === 'enabled' ? '#C73E1D' : '#625CCB'}`}
      />

      <ActionModal
        isProcessing={isFetching}
        buttonText="Generate New Key"
        title="Are you sure you want to generate new key?"
        onClose={closeGenerateKeyModal}
        onSubmit={() => {
          setIsEnabledGenerateWebhookKey(true);
        }}
        buttonBgColor="#625CCB"
        isVisible={openedGenerateKeyModal}
      />
      <Flex className="justify-end mb-6 gap-x-5 items-center">
        <Anchor href={fibonacciDocs} target="_blank" className="text-sm">View the Docs</Anchor>
      </Flex>
      <Box className="table-container dashboard-border relative max-h-[500px] overflow-x-scroll">
        <Table
          className="!m-0"
          horizontalSpacing="sm"
          highlightOnHover
          verticalSpacing="xs"
        >
          <Table.Thead bg={'#F8FAFC'}>
            <Table.Tr>
              {tableHeadings?.map((heading, index) => (
                <Table.Th key={`table-headings-${index}`}>
                  <Text className="table-head-text table-head-padding">
                    {heading}
                  </Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows()}</Table.Tbody>
        </Table>
      </Box>
    </>
  );
};

export default WebHooksTable;
