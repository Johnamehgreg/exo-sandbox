import { IconCopy } from '@/public/assets/svg/icon-copy';
import { IconWarn } from '@/public/assets/svg/icon-warn';
import {
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Divider,
  Flex,
  Loader,
  Modal,
  rem,
  Text,
  Tooltip,
} from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: VoidFunction;
  isProcessing: boolean;
  apiKey?: string;
};

const ApiKeyModal = ({ opened, onClose, isProcessing, apiKey }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="md"
      classNames={{
        body: 'p-0',
      }}
    >
      {isProcessing ? (
        <Flex className="flex-col items-center px-4 py-[24px] md:px-[32px]">
          <Loader mb={'md'} size={'sm'} />
          <Text className="mb-2 text-[16px] font-semibold text-[#020617]">
            Processing
          </Text>

          <Text className="auth-text-title !text-[12px] text-[#475569]">
            This should only take a few moments…
          </Text>
        </Flex>
      ) : (
        <>
          <Box className="px-[32px] py-[24px]">
            <Flex className="flex-col items-center gap-y-2">
              <IconWarn />
              <Text className="text-base font-[550] text-[#171717]">
                API Key Created
              </Text>
              <Text className="mb-[8px] whitespace-pre text-center text-[12px] font-[250] leading-[18px] text-secondary">
                {`	This API key will only be displayed once and must be copied \nand stored securely`}
              </Text>
            </Flex>
            <Flex className="flex-col gap-y-2">
              <Text className="text-[14px] font-medium leading-[21px] text-[#020617]">
                API Key
              </Text>
              <Flex className="items-center justify-between rounded-[7px] border border-gray-200 px-4 py-3">
                <Text
                  lineClamp={1}
                  className="text-[12px] font-[250] leading-[18px] text-secondary"
                >
                  {apiKey}
                </Text>
                <CopyButton value={apiKey as string} timeout={2000}>
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
            </Flex>
          </Box>

          <Divider className="mt-6" />
          <Box className="flex items-center justify-center px-6 py-3">
            <Button
              size="md"
              variant="default"
              className="w-full text-[14px] font-[500] leading-[21px] text-[#020617]"
              onClick={onClose}
            >
              Close Modal
            </Button>
          </Box>
        </>
      )}
    </Modal>
  );
};

export default ApiKeyModal;
