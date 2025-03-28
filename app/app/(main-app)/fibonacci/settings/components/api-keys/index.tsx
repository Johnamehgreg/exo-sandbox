import { PaginationCard } from '@/components/card/pagination-card';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useGenerateApiKey } from '@/hooks/mutate/use-api-keys';
import { useGetApiKeys } from '@/hooks/query/fibonacci-api-keys';
import { Box, Flex, Skeleton, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import SettingLayoutLoader from '../setting-layout-loader';
import ApiKeyModal from './api-key-modal';
import ApiKeysTable from './api-keys-table';
import EmptyApiKey from './empty-api-key';

const ApiKeysSection = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [generatedApikey, setGeneratedApikey] = useState('');
  const {
    apiKeys,
    isLoading,
    refetch: refetchApiKeys,
    updateQuery: updateApiKeysQuery,
    query,
    totalItem,
  } = useGetApiKeys();

  const { mutate, isPending } = useGenerateApiKey(setGeneratedApikey);
  const generateApiKey = () => {
    mutate();
    open();
  };

  return (
    <SettingLayoutLoader
      isEmpty={!apiKeys?.length}
      isLoading={isLoading}
      loaderComponent={
        <Stack>
          <Flex justify={'end'}>
            <Skeleton height={20} width="30%" radius="sm" />
          </Flex>
          <TableSkeleton row={10} col={5} />
        </Stack>
      }
      emptyStateComponent={
        <EmptyApiKey
          buttonLabel="Create New API Key"
          onButtonClick={generateApiKey}
          component={
            <ApiKeyModal
              isProcessing={isPending}
              onClose={close}
              {...{ generatedApikey, opened }}
            />
          }
        />
      }
    >
      <Box>
        <ApiKeysTable {...{ apiKeys, refetchApiKeys, updateApiKeysQuery }} />
        <PaginationCard
          showPageItem
          onChange={(val) => {
            updateApiKeysQuery('page', val);
          }}
          total={totalItem}
          page={query.page}
          setPageSize={(page: number) => {
            updateApiKeysQuery('page', 1);
            updateApiKeysQuery('pageSize', page);
          }}
          pageSize={query.pageSize}
        />
      </Box>
    </SettingLayoutLoader>
  );
};

export default ApiKeysSection;
