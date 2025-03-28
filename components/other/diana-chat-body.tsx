import { StateModel } from '@/hooks/logic/diana-insight-conversation.hook';
import { IconDocument } from '@/public/assets/svg/icon-document';
import { IconDrop } from '@/public/assets/svg/icon-drop';
import { IconMagicWand } from '@/public/assets/svg/icon-magic-wand';
import { IconSparkle } from '@/public/assets/svg/icon-sparkle';
import { IconTCheck } from '@/public/assets/svg/transaction/icon-t-check';
import { DianaChatModel } from '@/types/general';
import {
  Box,
  Button,
  Flex,
  Loader,
  Text,
  Tooltip,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import React from 'react';
import KeyMetrics from './key-metrics';
import MarkdownWithLatex from './mark-down-with-latex';

interface Props {
  conversation?: DianaChatModel[];
  handleSendMessage?: (message: string) => void;
  isInsight?: boolean;
  messageList?: (message: string) => string[];
  handleMultiStageSelect?: ({
    conversationId,
    stage,
  }: {
    conversationId: string;
    stage: StateModel;
  }) => void;
  isCompleted?: boolean;
  projectType?: string;
  triggerAnalysis?: () => void;
  isProcessing?: boolean;
  onScroll?: () => void;
  classNameChat?: string;
  classNameChatText?: string;
  systemIcon?: React.ReactNode;
  topChildren?: React.ReactNode;
  isExplore?: boolean;
}
export const DianaChatBody: React.FC<Props> = (props) => {
  const theme = useMantineTheme();

  const {
    conversation,
    projectType,
    handleSendMessage,
    handleMultiStageSelect,
    isCompleted,
    messageList,
    triggerAnalysis,
    isProcessing,
    onScroll,
    classNameChat,
    classNameChatText,
    systemIcon,
    isInsight,
    topChildren,
    isExplore,
  } = props;

  return (
    <Box>
      {topChildren}
      {conversation?.map((conversationItem, index) => (
        <div key={`${conversationItem?.id}-conversation-${index}`}>
          <Box
            className={`${
              conversationItem?.type !== 'human'
                ? 'flex py-[10px]'
                : 'flex w-full flex-row-reverse py-[10px]'
            }`}
          >
            {conversationItem?.type !== 'human' && (
              <Flex className="px flex-col items-start">
                {isExplore && (
                  <Box className="flex items-center justify-center gap-1 px-2 py-2">
                    <IconSparkle />
                    <Text className="text-[1.25rem]">Answer</Text>
                  </Box>
                )}
                <Box className={`sm:w-[60%] ${classNameChat}`}>
                  <Flex className="w-full gap-[2px]">
                    {!isInsight && (
                      <div className=" ">{systemIcon || <IconMagicWand />}</div>
                    )}

                    <Box>
                      <Box
                        className={`system-ai-text-typing markdown-format z-10 ${classNameChatText}`}
                      >
                        {typeof conversationItem?.message === 'string' ? (
                          <MarkdownWithLatex
                            content={conversationItem.message}
                          />
                        ) : conversationItem?.message?.answer ? (
                          <>
                            <MarkdownWithLatex
                              content={conversationItem?.message?.answer}
                            />
                            {conversationItem?.message?.key_indicators && (
                              <KeyMetrics
                                key_indicators={
                                  conversationItem?.message?.key_indicators
                                }
                              />
                            )}
                          </>
                        ) : (
                          (conversationItem?.message as string | undefined) ||
                          ''
                        )}
                      </Box>
                      {/* @ts-expect-error typescript unable to infer type*/}
                      {(conversationItem?.stage_values?.length as number) >
                        0 && (
                        <Flex className="mt-[12px] flex-wrap items-center gap-2 overflow-hidden">
                          <IconDrop className="ml-2 mr-[-8px] mt-[-30px] h-[40px] w-[40px]" />
                          {conversationItem.onboarding_stage !== 'main_goal' &&
                            // @ts-expect-error typescript unable to infer type
                            conversationItem?.stage_values?.map(
                              (stage: string) => {
                                const selected = () => {
                                  const message =
                                    conversation[index + 1]?.message;

                                  if (typeof message === 'string') {
                                    return (
                                      message.toLocaleLowerCase() ===
                                      (stage as string)?.toLocaleLowerCase()
                                    );
                                  }
                                  return false; // Or handle the case where message is not a string
                                };
                                return (
                                  <UnstyledButton
                                    disabled={conversation.length !== index + 1}
                                    key={stage as string}
                                    onClick={() => {
                                      handleSendMessage?.(stage as string);
                                    }}
                                    className={`${
                                      selected()
                                        ? 'diana-stage-item-selected'
                                        : 'diana-stage-item'
                                    } ${classNameChatText}`}
                                  >
                                    <Text className="text-md" component="p">
                                      {stage as string}
                                    </Text>
                                    {selected() && (
                                      <IconTCheck
                                        fill={
                                          theme.colors[theme.primaryColor][4]
                                        }
                                      />
                                    )}
                                  </UnstyledButton>
                                );
                              }
                            )}

                          {conversationItem.onboarding_stage === 'main_goal' &&
                            //   @ts-expect-error typescript unable to infer type
                            conversationItem?.stage_values?.map(
                              (stage: StateModel) => {
                                const selected = () => {
                                  const nextConversation =
                                    conversation[index + 1];
                                  const chatList = messageList?.(
                                    nextConversation?.message as string
                                  );
                                  if (stage.isSelected) return true;
                                  if ((chatList || []).length > 0) {
                                    const valList = chatList?.map((obj) => {
                                      return obj?.replace(' ', '');
                                    });
                                    return valList?.find(
                                      (lastStage: string) =>
                                        stage.key === lastStage
                                    );
                                  }
                                };
                                return (
                                  <UnstyledButton
                                    disabled={index + 1 !== conversation.length}
                                    onClick={() => {
                                      handleMultiStageSelect?.({
                                        conversationId:
                                          conversationItem.id as string,
                                        stage: stage,
                                      });
                                    }}
                                    key={stage?.value as string}
                                    className={`${
                                      selected()
                                        ? 'diana-stage-item-selected'
                                        : 'diana-stage-item'
                                    } ${classNameChatText}`}
                                  >
                                    <Tooltip
                                      withArrow
                                      color={
                                        theme.colors[theme.primaryColor][6]
                                      }
                                      label={stage?.value as string}
                                    >
                                      <Flex className="items-center">
                                        <Text
                                          component="p"
                                          className={`text-md ${classNameChatText}`}
                                        >
                                          {stage!.key}
                                        </Text>
                                        {selected() && (
                                          <IconTCheck
                                            fill={
                                              theme.colors[
                                                theme.primaryColor
                                              ][4]
                                            }
                                          />
                                        )}
                                      </Flex>
                                    </Tooltip>
                                  </UnstyledButton>
                                );
                              }
                            )}
                        </Flex>
                      )}
                      {conversation.length === index + 1 && isCompleted && (
                        <>
                          {projectType !== 'real_estate' && (
                            <Button
                              onClick={triggerAnalysis}
                              className="mt-[10px] text-md"
                            >
                              Confirm Information
                            </Button>
                          )}
                        </>
                      )}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )}
            {conversationItem?.type === 'human' && (
              <>
                {isExplore && (
                  <Box className="w-full px-2">
                    <Text className="text-brand-p2 text-[1.875rem] font-[550] leading-[2.25rem]">
                      {upperFirst(conversationItem?.message as string)}
                    </Text>
                  </Box>
                )}
                {!isExplore && (
                  <Box className="flex flex-col items-end">
                    {messageList?.(conversationItem?.message as string)
                      ?.length === 0 && (
                      <Text
                        className={`human-ai-text-typing markdown-format ${classNameChatText}`}
                      >
                        <MarkdownWithLatex
                          content={conversationItem?.message as string}
                        />
                      </Text>
                    )}

                    {(conversationItem?.file_objects?.length as number) > 0 && (
                      <Flex className="mt-[10px] w-full flex-wrap justify-end gap-4">
                        {conversationItem.file_objects?.map((file) => {
                          return (
                            <UnstyledButton
                              key={file?.url}
                              component="a"
                              href={file?.url}
                              target="_blank"
                              variant="default"
                              className="attachment-file-card"
                            >
                              <Box className="w-[20px]">
                                <IconDocument />
                              </Box>
                              <Text
                                className={`text-md ${classNameChatText}`}
                                lineClamp={1}
                              >
                                {file?.name}
                              </Text>
                            </UnstyledButton>
                          );
                        })}
                      </Flex>
                    )}
                    {(messageList?.(conversationItem?.message as string) || [])
                      .length > 0 && (
                      <Flex className="mt-[10px] w-full flex-wrap justify-end gap-4">
                        {messageList?.(
                          conversationItem?.message as string
                        )?.map((text: string) => {
                          return (
                            <Box key={text} className="goad-item-card">
                              <Text
                                className={`human-ai-text-typing ${classNameChatText}`}
                              >
                                {text}
                              </Text>
                            </Box>
                          );
                        })}
                      </Flex>
                    )}
                  </Box>
                )}
              </>
            )}
          </Box>
        </div>
      ))}
      <Transition
        exitDelay={0}
        enterDelay={500}
        onEnter={() => {
          onScroll?.();
        }}
        mounted={isProcessing as boolean}
        transition="fade-up"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Flex className="mb-4 justify-start">
            <Box style={styles} className={`ai-text-isTyping-wrapper`}>
              <IconSparkle />
              <Text className="ai-text-isTyping-text">Thinking</Text>
              <Loader size={'xs'} type="dots" />
            </Box>
          </Flex>
        )}
      </Transition>
    </Box>
  );
};
