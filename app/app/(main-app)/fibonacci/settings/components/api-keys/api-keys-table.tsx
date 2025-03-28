import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Flex,
  Menu,
  Table,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ActionModal } from '@/components/modal/action-modal';
import { useApKeys, useGenerateApiKey } from '@/hooks/mutate/use-api-keys';
import {
  ApiKeysQueryParams,
  useGetApiKeys,
} from '@/hooks/query/fibonacci-api-keys';
import { cn } from '@/lib/utils';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { ApiKeys } from '@/types/general';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import ApiKeyModal from './api-key-modal';
import { fibonacciDocs } from '@/lib/links';

const tableHeadings = [
  'API Key',
  'Date Created',
  'Last Used Date',
  'Status',
  '',
];

interface Props {
  apiKeys: ApiKeys[];
  refetchApiKeys: VoidFunction;
  updateApiKeysQuery: (
    field: keyof ApiKeysQueryParams,
    value: ApiKeysQueryParams[keyof ApiKeysQueryParams]
  ) => void;
}

const ApiKeysTable = ({
  apiKeys,
  refetchApiKeys,
  updateApiKeysQuery,
}: Props) => {
  const [apikeyID, setApikeyID] = useState('');
  const [generatedApikey, setGeneratedApikey] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [
    openedGenerateApiKeyModal,
    { open: openGenerateApiKeyModal, close: closeGenerateApiKeyModal },
  ] = useDisclosure(false);
  const {
    apiKeys: apiActiveKey,
    updateQuery,
    refetch: refetchActiveApiKey,
  } = useGetApiKeys();

  const cb = () => {
    close();
    refetchApiKeys();
    refetchActiveApiKey();
  };
  const { isPending, mutate } = useApKeys(cb);
  const {
    isPending: isPendingGeneratingApiActiveKey,
    mutate: mutateGeneratingApiActiveKey,
  } = useGenerateApiKey(setGeneratedApikey);

  const handleGenerateApiKey = () => {
    mutateGeneratingApiActiveKey();
    openGenerateApiKeyModal();
    updateApiKeysQuery('page', 1);
  };

  useEffect(() => {
    updateQuery('status', 'active');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKeys]);

  const rows = apiKeys?.map((apiKey) => (
    <Table.Tr key={apiKey?._id}>
      <Table.Td>
        <Text className="table-item-text table-item-padding">
          {apiKey?.maskedApiKey}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text className="table-item-text table-item-padding">
          {apiKey?.createdAt ? format(apiKey?.createdAt, 'dd MMM, yyyy') : '-'}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text className="table-item-text table-item-padding">
          {apiKey?.lastUsedAt
            ? format(apiKey?.lastUsedAt, 'dd MMM, yyyy')
            : '-'}
        </Text>
      </Table.Td>
      <Table.Td>
        <Flex
          className={cn(
            'h-[29px] w-[94px] items-center justify-center rounded',
            {
              'bg-[#EEF7F2] text-[#177A48]': apiKey?.status === 'active',
              'bg-[#F1F5F9] text-[#64748B]': apiKey?.status === 'inactive',
            }
          )}
        >
          <Text className="text-sm font-normal capitalize leading-[21px]">
            {apiKey?.status}
          </Text>
        </Flex>
      </Table.Td>
      <Table.Td>
        {apiKey?.status === 'active' ? (
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
                    setApikeyID(apiKey?._id);
                    e.stopPropagation();
                    open();
                  }}
                  className="min-w-[130px] text-[12px] font-normal"
                >
                  Revoke Key
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ) : null}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="">
      {/* API key created Modal */}
      <ApiKeyModal
        isProcessing={isPendingGeneratingApiActiveKey}
        onClose={closeGenerateApiKeyModal}
        apiKey={generatedApikey}
        opened={openedGenerateApiKeyModal}
      />

      <Flex className="justify-end mb-6 gap-x-5 items-center">
        <Anchor href={fibonacciDocs} target="_blank" className="text-sm">View the Docs</Anchor>

        <Button
          disabled={isPendingGeneratingApiActiveKey || !!apiActiveKey.length}
          onClick={handleGenerateApiKey}
          className="text-sm font-medium leading-[21px] disabled:cursor-not-allowed disabled:bg-p1 disabled:text-palegreen"
        >
          Create New API Key
        </Button>
      </Flex>

      <Box className="dashboard-border table-container relative overflow-x-scroll">
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <ActionModal
          isProcessing={isPending}
          buttonText="Revoke Key"
          message="Revoking this key will render the key inactive forever"
          title="Are you sure you want to revoke this key?"
          onClose={close}
          onSubmit={() => {
            mutate(apikeyID);
          }}
          isVisible={opened}
        />
      </Box>
    </Box>
  );
};

export default ApiKeysTable;
