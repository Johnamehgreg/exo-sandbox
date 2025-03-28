import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';

import { useForm, yupResolver } from '@mantine/form';
import { useEffect } from 'react';
import { InferType, object, string } from 'yup';

const createWebhookSchema = object({
  url: string().url('Invalid url').required('URL is required'),
});

type FormData = InferType<typeof createWebhookSchema>;

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: { url: string }) => void;
  title: string;
  initialData?: { url: string };
  buttonLabel: string;
  isProcessing: boolean;
};

const WebHooksModal = ({
  opened,
  onClose,
  onSubmit,
  title,
  initialData = { url: '' },
  buttonLabel,
  isProcessing,
}: Props) => {
  const form = useForm<FormData>({
    initialValues: {
      url: initialData.url,
    },
    validate: yupResolver(createWebhookSchema),
  });

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Modal
      opened={opened}
      radius={16}
      onClose={handleClose}
      closeButtonProps={{
        hidden: true,
      }}
      centered
      size="md"
      classNames={{
        body: 'p-0',
        root: 'rounded-lg ',
        header: 'p-0  hidden',
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Box className="p-[32px_24px]">
          <Text className="mb-[16px] text-base font-[550] text-text">
            {title}
          </Text>
          <TextInput
            {...form.getInputProps('url')}
            placeholder="Url"
            label="Url"
          />
        </Box>
        <Divider />
        <Flex className="justify-between px-6 py-3">
          <Button
            type="button"
            variant="default"
            onClick={handleClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isProcessing}>
            {buttonLabel}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default WebHooksModal;
