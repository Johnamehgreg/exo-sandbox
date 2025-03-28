/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateModel } from '@/hooks/logic/diana-insight-conversation.hook';
import { getDocumentType } from '@/lib/helper';
import { IconArrowUp } from '@/public/assets/svg/icon-arrow-up';
import { IconAttachmentChat } from '@/public/assets/svg/icon-attachment-chat';
import { IconCloseCircle } from '@/public/assets/svg/icon-close-circle';
import { IconTrash } from '@/public/assets/svg/icon-trash';
import { AttachmentModel, DianaChatModel } from '@/types/general';
import {
  ActionIcon,
  Box,
  FileButton,
  Flex,
  Loader,
  Popover,
  Text,
  TextInput,
  Textarea,
  Tooltip,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { upperFirst, useClickOutside } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from '../ui/toast';
import { fileTypeIcon } from './file-type-icon';

export interface Props {
  messageText?: string;
  onChange?: (text: string) => void;
  acceptedFileType?: string;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disableUpload?: boolean;
  handleUpload?: (files: File[] | null) => void;
  disableSend?: boolean;
  handleSendMessage?: () => void;
  attachment?: AttachmentModel[];
  showGoals?: boolean;
  selectedGoal?: StateModel[];
  lastMessage?: DianaChatModel;
  placeholder?: string;
  handleMultiStageSelect?: (type: {
    conversationId: string;
    stage: StateModel;
  }) => void;
  onRemoveAttachment?: (id: string) => void;
  onTagDocChange?: (id: string, value: string) => void;
  className?: string;
  inputClassName?: { wrapper?: string; input?: string };
  hideFooter?: boolean;
  canUpload?: boolean;
}

export const ChatInput: React.FC<Props> = (props) => {
  const theme = useMantineTheme();
  const {
    messageText,
    onChange,
    disableUpload,
    acceptedFileType,
    handleUpload,
    disableSend,
    handleSendMessage,
    attachment,
    onRemoveAttachment,
    selectedGoal,
    showGoals,
    lastMessage,
    className,
    inputClassName,
    handleKeyDown,
    placeholder,
    handleMultiStageSelect,
    hideFooter,
    onTagDocChange,
    canUpload = true
  } = props;
  const resetRef = useRef<() => void>(null);
  const searchParams = useSearchParams();
  const project_type = searchParams.get('project_type') as string;

  const [selectedTag, setSelectedTag] = useState<string>('');
  const [onFocus, setOnFocus] = useState(false);
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const disableDocumentPopup = project_type !== 'real_estate';

  const onDrop = useCallback((acceptedFiles: File[] | null) => {
    if (disableUpload) {
      toast({
        message: 'Upload not allowed',
        variant: 'info',
      });
      return;
    }
    handleUpload?.(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <>
      <Box
        {...getRootProps({
          onClick: (event) => event.stopPropagation(),
          role: 'div',
        })}
        style={{
          cursor: isDragActive ? 'progress' : '',
        }}
        className="dashboard-gray-bg p-y[4px] sticky bottom-2 flex w-full flex-col rounded-[16px]"
      >
        <Flex
          className={`chat-input-wrapper min-h-[164px] flex-col !rounded-[12px] border-gray-400 ${className} ${(onFocus || isDragActive) && 'border-[1px] border-vibrantgreen'
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
                  disabled={disableDocumentPopup}
                  opened={opened && selectedTag === attachmentItem?.id}
                  width={200}
                  position="top"
                  withArrow
                >
                  <Popover.Target>
                    <Box
                      onClick={() => {
                        setSelectedTag(attachmentItem?.id as string);
                        setOpened((o) => !o);
                      }}
                      style={{
                        cursor: 'pointer',
                      }}
                      className="attachment-card group relative flex items-center justify-start gap-2"
                    >
                      <Tooltip
                        disabled={disableDocumentPopup || opened}
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
          {showGoals && (
            <Flex className="flex-wrap gap-2">
              {selectedGoal?.map((stageItem: StateModel) => (
                <Box
                  key={stageItem.value as string}
                  className="group relative flex items-center justify-start gap-2"
                >
                  <ActionIcon
                    onClick={() => {
                      handleMultiStageSelect?.({
                        conversationId: lastMessage?.id as string,
                        stage: stageItem,
                      });
                      // Call removeItem function when the close icon is clicked
                    }}
                    className="absolute right-0 top-0 z-20 transition-all group-hover:block md:hidden"
                    variant="transparent"
                  >
                    <IconCloseCircle
                      style={{ transform: 'scale(1.3)' }}
                      fill="#fff"
                    />
                  </ActionIcon>
                  <div className="selected-goal-card !w-auto">
                    <Flex className="flex-col">
                      <Text className="text-[12px] font-medium text-white">
                        {stageItem.key}
                      </Text>
                    </Flex>
                  </div>
                </Box>
              ))}
            </Flex>
          )}
          <Flex className="w-full flex-1">
            <Textarea
              variant="unstyled"
              className={`${(attachment || [])?.length > 0 && 'py-4'
                } w-full outline-none`}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              value={messageText as string}
              onChange={(e) => {
                onChange?.(e.target.value);
              }}
              size="lg"
              radius={0}
              classNames={{
                wrapper: `w-full !px-0   !py-0 rounded-0 ${inputClassName?.wrapper}`,
                input: `!rounded-0 !px-0 !py-0 !font-[250] text-[16px] placeholder:text-gray-400 placeholder:text-[250]   border-0 ${inputClassName?.input}`,
              }}
              placeholder={placeholder || 'Start typing...'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevent adding a new line
                  handleKeyDown?.(e);
                }
              }}
            />
          </Flex>

          <Flex className="items-center justify-between">
            {
              canUpload &&
              <FileButton
                resetRef={resetRef}
                multiple
                accept={acceptedFileType}
                disabled={disableUpload}
                onChange={(files) => {
                  handleUpload?.(files as any);
                }}
              >
                {(props) => (
                  <Box opacity={disableUpload ? 0.6 : 1} className="flex-col">
                    <ActionIcon {...props} size={'lg'} disabled={disableUpload}>
                      <IconAttachmentChat
                        fill={
                          !disableUpload
                            ? theme.colors[theme.primaryColor][4]
                            : ''
                        }
                      />
                    </ActionIcon>
                  </Box>
                )}
              </FileButton>
            }
            <ActionIcon
              opacity={disableSend ? 0.5 : 1}
              disabled={disableSend}
              size={'lg'}
              bg={theme.colors[theme.primaryColor][6]}
              onClick={() => {
                if (disableSend) return null;
                handleSendMessage?.();
              }}
              radius={10}
              className='ml-auto'
            >
              <IconArrowUp
                className="h-[15px] w-[15px]"
                fill={theme.colors[theme.primaryColor][4]}
              />
            </ActionIcon>
          </Flex>
        </Flex>

        <Transition mounted={!hideFooter} transition="fade-up" duration={0}>
          {(styles) => (
            <Text
              style={styles}
              className="my-3 text-center font-sans text-[12px] text-gray-600"
            >
              {location.pathname.includes('diana') ? 'Diana' : 'Fibonacci'} may
              make mistakes. Please double check responses.
            </Text>
          )}
        </Transition>
      </Box>
    </>
  );
};
