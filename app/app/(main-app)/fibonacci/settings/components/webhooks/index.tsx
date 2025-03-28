import { useAddWebhook } from '@/components/other/use-webhook';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useGetWebhook } from '@/hooks/query/webhook';
import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EmptyApiKey from '../api-keys/empty-api-key';
import SettingLayoutLoader from '../setting-layout-loader';
import WebHooksModal from './web-hooks-modal';
import WebHooksTable from './web-hooks-table';

const Webhook = () => {
  const [opened, { open, close }] = useDisclosure();
  const { webhook, isLoading } = useGetWebhook();
  const { mutate, isPending: isPendingAddWebHook } = useAddWebhook(close);

  const handleSubmit = (data: { url: string }) => {
    mutate({ url: data?.url });
  };

  return (
    <SettingLayoutLoader
      isEmpty={!webhook}
      isLoading={isLoading}
      loaderComponent={
        <Stack>
          <TableSkeleton row={10} col={5} />
        </Stack>
      }
      emptyStateComponent={
        <EmptyApiKey
          buttonLabel="Create New Webhook"
          onButtonClick={open}
          component={
            <WebHooksModal
              title="Add New Webhook"
              opened={opened}
              onClose={close}
              onSubmit={handleSubmit}
              buttonLabel="Add Service"
              isProcessing={isPendingAddWebHook}
            />
          }
        />
      }
    >
      <WebHooksModal
        title="Add New Webhook"
        opened={opened}
        onClose={close}
        onSubmit={handleSubmit}
        buttonLabel="Add Service"
        isProcessing={isPendingAddWebHook}
      />
      <WebHooksTable data={webhook} />
    </SettingLayoutLoader>
  );
};

export default Webhook;
