import { fileTypeIcon } from '@/components/other/file-type-icon';
import { toast } from '@/components/ui/toast';
import { getDocumentType } from '@/lib/helper';
import { IconArrowUp } from '@/public/assets/svg/icon-arrow-up';
import { IconAttachmentChat } from '@/public/assets/svg/icon-attachment-chat';
import { IconCloseCircle } from '@/public/assets/svg/icon-close-circle';
import { IconTrash } from '@/public/assets/svg/icon-trash';
import { OnboardingDianaChatProjectDetails } from '@/types/diana-onboarding-chat';
import { AttachmentModel } from '@/types/general';
import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Loader,
  Popover,
  Select,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { MIME_TYPES } from '@mantine/dropzone';
import { upperFirst, useClickOutside } from '@mantine/hooks';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import BaseInput, { ChatBaseProps } from './base-input';
import { formatNumberDisplay } from './extras';
import LocationInput from './location-Input';

interface Props extends ChatBaseProps {
  conversation: OnboardingDianaChatProjectDetails[];
  setLocationGeometric?: Dispatch<
    SetStateAction<{ latitude: string | null; longitude: string | null }>
  >;
  onChangeUnit?: (text: string | null) => void;
  unit?: string;
  onRemoveAttachment?: (id: string) => void;
  onTagDocChange?: (id: string, tag: string) => void;
  attachment?: AttachmentModel[];
  isSubmittingChatInput: boolean;
  handleUpload: (files: File[] | null) => void;
  isUploading: boolean;
  acceptedFileType: () => (typeof MIME_TYPES)[];
}

interface SelectOptionsChatInput extends ChatBaseProps {
  conversationItem: OnboardingDianaChatProjectDetails;
}

interface UnitChatInputProps extends ChatBaseProps {
  conversationItem: OnboardingDianaChatProjectDetails;
  onChangeUnit?: (text: string | null) => void;
  unit?: string;
}

interface FileInputProps {
  attachment?: AttachmentModel[];
  handleUpload?: (files: File[]) => void;
  disableUpload?: boolean;
  onRemoveAttachment?: (id: string) => void;
  onTagDocChange?: (id: string, tag: string) => void;
  disableSend?: boolean;
  handleSendMessage?: () => void;
  isUploading: boolean;
  isSubmittingChatInput: boolean;
  acceptedFileType: () => (typeof MIME_TYPES)[];
}

const TextChatInput: FC<ChatBaseProps> = (props) => (
  <Box className="min-h-[250px]">
    <BaseInput {...props} />
  </Box>
);

const LocationChatInput: FC<ChatBaseProps> = (props) => {
  const { disableSend, handleSendMessage, onChange } = props;
  const [disableSendLocation, setDisableSendLocation] = useState(true);

  return (
    <Box className="min-h-[200px]">
      <LocationInput
        setDisableSendLocation={setDisableSendLocation}
        {...props}
      />
      <Flex className="justify-end">
        <Button
          className="mt-2 disabled:cursor-not-allowed disabled:bg-p1"
          onClick={() => {
            handleSendMessage?.();
            onChange?.(null);
          }}
          disabled={disableSend || disableSendLocation}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

const SelectDateChatInput: FC<ChatBaseProps> = (props) => {
  const { disableSend, handleSendMessage, onChange } = props;

  return (
    <Box className="min-h-[400px] w-fit">
      <Text>Select Date</Text>
      <DatePicker
        minDate={new Date()}
        onChange={(date) => {
          if (!date) return;
          onChange?.(date?.toISOString());
        }}
      />
      <Flex className="justify-end">
        <Button
          className="disabled:cursor-not-allowed disabled:bg-p1"
          onClick={() => {
            handleSendMessage?.();
            onChange?.(null);
          }}
          disabled={disableSend}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

const UnitChatInput: FC<UnitChatInputProps> = (props) => {
  const {
    handleSendMessage,
    onChange,
    messageText,
    conversationItem,
    onChangeUnit,
    unit,
    isSubmittingChatInput,
    isNumber,
    validation,
  } = props;

  const disableSendButton = !(
    (unit ?? '').trim().length > 0 && (messageText ?? '').trim().length > 0
  );

  const textInputValue = messageText ? formatNumberDisplay(messageText) : '';

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove commas and trim extra spaces
    const value = e.target.value.replace(/,/g, '').trim();

    if (isNumber) {
      // Allow clearing the input
      if (value === '') {
        onChange?.('');
        return;
      }

      // Allow only digits with an optional single decimal point
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }

      // If the user just entered a trailing dot (e.g. "12."), update with the raw value
      if (value.endsWith('.')) {
        onChange?.(value);
        return;
      }

      // Use parseFloat for numeric validation
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) return;

      if (
        typeof validation?.min_value === 'number' &&
        numericValue < validation.min_value
      ) {
        return;
      }

      if (
        typeof validation?.max_value === 'number' &&
        numericValue > validation.max_value
      ) {
        return;
      }

      // Instead of converting the number to a string (which would lose decimals like "12.0"),
      // store the raw input value so decimals are preserved.
      onChange?.(value);
    } else {
      // When isNumber is false, allow all input (including digits)
      onChange?.(value);
    }
  };

  const handleSubmit = () => {
    handleSendMessage?.();
    onChange?.(null);
    onChangeUnit?.(null);
  };
  return (
    <Box className="min-h-[150px] w-fit">
      <Flex gap="sm" className="items-center">
        <TextInput
          value={textInputValue}
          onChange={handleOnChange}
          placeholder="Input value"
          disabled={isSubmittingChatInput}
        />
        <Select
          value={unit || null}
          onChange={(value) => onChangeUnit?.(value ?? '')}
          data={conversationItem?.options}
          placeholder="select unit"
          disabled={isSubmittingChatInput}
        />
      </Flex>
      <Flex className="mt-4 justify-end">
        <Button
          className="disabled:cursor-not-allowed disabled:bg-p1"
          onClick={handleSubmit}
          disabled={disableSendButton}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

const SelectOptionsChatInput: FC<SelectOptionsChatInput> = (props) => {
  const {
    disableSend,
    handleSendMessage,
    onChange,
    messageText,
    conversationItem,
    isSubmittingChatInput,
  } = props;

  return (
    <Box className="min-h-[160px] w-full">
      <Text className="">Select Option</Text>
      <Select
        data={conversationItem?.options}
        value={messageText || null}
        onChange={(value) => {
          onChange?.(value);
        }}
        placeholder="Select option"
        disabled={isSubmittingChatInput}
        clearable
      />
      <Flex className="mt-4 justify-end">
        <Button
          className="disabled:cursor-not-allowed disabled:bg-p1"
          onClick={() => {
            handleSendMessage?.();
            onChange?.('');
          }}
          disabled={disableSend}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

const FileInput: FC<FileInputProps> = (props) => {
  const {
    handleUpload,
    disableUpload,
    onRemoveAttachment,
    onTagDocChange,
    attachment,
    handleSendMessage,
    acceptedFileType,
    isSubmittingChatInput,
  } = props;
  const resetRef = useRef<() => void>(null);
  const [opened, setOpened] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const ref = useClickOutside(() => setOpened(false));
  const diableSendUpload =
    attachment?.length === 0 ||
    !attachment?.every((file) => !file.isUploading) ||
    isSubmittingChatInput;
  const disableFileUpload =
    disableUpload ||
    !attachment?.every((file) => !file.isUploading) ||
    isSubmittingChatInput;
  const theme = useMantineTheme();
  const onDrop = useCallback((acceptedFiles: File[] | null) => {
    if (disableFileUpload) {
      toast({
        message: 'Upload not allowed',
        variant: 'info',
      });
      return;
    }
    if (acceptedFiles) {
      handleUpload?.(acceptedFiles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Box
      {...getRootProps({
        onClick: (event) => event.stopPropagation(),
        role: 'div',
      })}
      style={{
        cursor: isDragActive ? 'progress' : '',
      }}
      className="dashboard-gray-bg p-y[4px] sticky bottom-2 flex min-h-[200px] w-full flex-col rounded-[16px] !border-none !outline-none"
    >
      <Flex
        className={`chat-input-wrapper min-h-[164px] flex-col !rounded-[12px] border-gray-400 ${
          isDragActive && 'border-[1px] border-vibrantgreen'
        } ${isDragActive && 'border-dashed'}`}
      >
        {(attachment || [])?.length > 0 && (
          <Flex className="flex-wrap gap-2">
            {attachment?.map((attachmentItem, index) => (
              <Popover
                key={`attachment-${index}`}
                transitionProps={{
                  transition: 'fade-up',
                  duration: 300,
                }}
                shadow="xs"
                opened={opened && selectedTag === attachmentItem?.id}
                width={200}
                position="top"
                withArrow
              >
                <Popover.Target>
                  <Box
                    onClick={() => {
                      setSelectedTag(attachmentItem?.id as string);
                      setOpened((prev) => !prev);
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                    className="attachment-card group relative flex items-center justify-start gap-2"
                  >
                    <Tooltip
                      disabled={opened}
                      key={attachmentItem.url}
                      position="top"
                      arrowSize={8}
                      label={'click to tag document'}
                      withArrow
                      classNames={{
                        tooltip: `py-1 px-2 rounded-md  text-[#F5F5F5] shadow-md transition-all `,
                      }}
                      transitionProps={{
                        transition: 'fade-up',
                        duration: 300,
                      }}
                    >
                      <Box className="flex flex-1 items-center">
                        <Box className="px-2">
                          {fileTypeIcon(attachmentItem?.file?.type as string)}
                          {attachmentItem.isErrored && (
                            <IconCloseCircle fill="#fff" />
                          )}
                        </Box>
                        <Flex className="flex-1 flex-col">
                          <Box className="w-[90px]">
                            <Text
                              className="text-[14px] font-medium text-[#1F2937]"
                              lineClamp={1}
                            >
                              {upperFirst(attachmentItem?.file?.name || '')}
                            </Text>
                          </Box>
                          <Text
                            className="text-[12px] font-medium text-[#4B5563]"
                            lineClamp={1}
                          >
                            {getDocumentType(
                              attachmentItem?.file?.type as string
                            )}
                          </Text>
                        </Flex>
                      </Box>
                    </Tooltip>
                    <Box className="flex h-[54px] w-[50px] items-center justify-center bg-[#F3F4F6]">
                      {attachmentItem?.isUploading && (
                        <Loader size={'xs'} color="#3B82F6" />
                      )}
                      {attachmentItem.isErrored && (
                        <IconCloseCircle
                          onClick={(e) => {
                            e.stopPropagation();
                            if (disableFileUpload) return;
                            onRemoveAttachment?.(attachmentItem.id as string);
                          }}
                          className="cursor-pointer"
                          fill="#F93F4F"
                        />
                      )}
                      {attachmentItem.isUploaded && (
                        <ActionIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            if (disableFileUpload) return;
                            onRemoveAttachment?.(attachmentItem.id as string);
                          }}
                          className=" "
                          variant="transparent"
                        >
                          <IconTrash />
                        </ActionIcon>
                      )}
                    </Box>
                  </Box>
                </Popover.Target>
                <Popover.Dropdown ref={ref}>
                  <TextInput
                    value={attachmentItem?.file_category}
                    onChange={(e) => {
                      onTagDocChange?.(
                        attachmentItem.id as string,
                        e.target.value as string
                      );
                    }}
                    description="Optional"
                    placeholder="Tag document"
                    size="xs"
                  />
                </Popover.Dropdown>
              </Popover>
            ))}
          </Flex>
        )}

        <Flex className="items-center justify-between">
          <FileButton
            resetRef={resetRef}
            multiple
            accept={acceptedFileType() as unknown as string}
            disabled={disableFileUpload}
            onChange={(files) => {
              handleUpload?.(files as File[]);
              resetRef.current?.();
            }}
          >
            {(props) => (
              <Box opacity={disableFileUpload ? 0.6 : 1} className="flex-col">
                <ActionIcon {...props} size={'lg'} disabled={disableFileUpload}>
                  <IconAttachmentChat
                    fill={
                      !disableFileUpload
                        ? theme.colors[theme.primaryColor][4]
                        : ''
                    }
                  />
                </ActionIcon>
              </Box>
            )}
          </FileButton>

          <ActionIcon
            opacity={diableSendUpload ? 0.5 : 1}
            disabled={diableSendUpload}
            size={'lg'}
            bg={theme.colors[theme.primaryColor][6]}
            onClick={() => {
              if (diableSendUpload) return null;
              handleSendMessage?.();
            }}
            radius={10}
          >
            <IconArrowUp
              className="h-[15px] w-[15px]"
              fill={theme.colors[theme.primaryColor][4]}
            />
          </ActionIcon>
        </Flex>
      </Flex>
    </Box>
  );
};

const RenderChatInput = ({
  conversation,
  messageText,
  onChange,
  handleKeyDown,
  disableSend,
  handleSendMessage,
  setLocationGeometric,
  onChangeUnit,
  unit,
  onRemoveAttachment,
  onTagDocChange,
  attachment,
  isSubmittingChatInput,
  handleUpload,
  isUploading,
  acceptedFileType,
}: Props) => {
  const conversationItem = conversation?.length ? conversation[0] : null;

  if (!conversationItem) return null;
  const isNumber = conversationItem?.is_number;
  const validation = conversationItem?.validation;

  const renderChatInput = () => {
    switch (conversationItem?.type) {
      case 'text':
        return (
          <TextChatInput
            {...{
              messageText,
              onChange,
              handleKeyDown,
              handleSendMessage,
              disableSend,
              isSubmittingChatInput,
              isNumber,
              validation: validation ?? undefined,
            }}
          />
        );
      case 'location':
        return (
          <LocationChatInput
            {...{
              messageText,
              onChange,
              handleKeyDown,
              handleSendMessage,
              disableSend,
              setLocationGeometric,
              isSubmittingChatInput,
            }}
          />
        );
      case 'date':
        return (
          <SelectDateChatInput
            {...{
              messageText,
              onChange,
              handleKeyDown,
              handleSendMessage,
              disableSend,
              isSubmittingChatInput,
            }}
          />
        );
      case 'options':
        return (
          <SelectOptionsChatInput
            {...{
              messageText,
              onChange,
              handleKeyDown,
              handleSendMessage,
              disableSend,
              conversationItem,
              isSubmittingChatInput,
            }}
          />
        );
      case 'unit':
        return (
          <UnitChatInput
            {...{
              messageText,
              onChange,
              handleKeyDown,
              handleSendMessage,
              disableSend,
              conversationItem,
              onChangeUnit,
              unit,
              isSubmittingChatInput,
              isNumber,
              validation: validation ?? undefined,
            }}
          />
        );
      case 'file':
        return (
          <FileInput
            {...{
              messageText,
              onChange,
              handleKeyDown,
              handleSendMessage,
              disableSend,
              conversationItem,
              onRemoveAttachment,
              onTagDocChange,
              attachment,
              isSubmittingChatInput,
              handleUpload,
              isUploading,
              acceptedFileType,
            }}
          />
        );
      default:
        return null;
    }
  };

  return renderChatInput();
};

export default RenderChatInput;
