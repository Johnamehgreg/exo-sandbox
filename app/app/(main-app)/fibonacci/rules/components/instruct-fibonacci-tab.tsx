import {
  ActionIcon,
  Box,
  Flex,
  Loader,
  ScrollArea,
  Tabs,
  Textarea,
  Transition,
} from '@mantine/core';

import { useRulesChat } from '@/hooks/logic/use-rules-chat';
import { colors } from '@/lib/app-config';
import { cn } from '@/lib/utils';
import { IconInstructorChart } from '@/public/assets/svg/bar-instructor-chat';
import { IconFibonacciGreen } from '@/public/assets/svg/icon-fibonacci-green';
import { IconSend } from '@/public/assets/svg/icon-send';
import React from 'react';
import InitialInstructFibonacci from './initial-instruct-fibonacci';

interface Props {
  tab: string;
  currentTab: string;
}

const InstructFibonacciTab: React.FC<Props> = ({ tab, currentTab }) => {
  const {
    conversation,
    handleSendMessage,
    isLoadingCreateRule,
    conversationEndRef,
    form,
    handleKeyDown,
    session,
    onCreateRule,
    setConversation,
  } = useRulesChat();
  return (
    <>
      <Transition
        mounted={currentTab === tab}
        transition="fade-left"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Tabs.Panel style={styles} value={tab}>
            <Box
              className={cn(
                'sticky top-10 mx-auto flex h-[calc(100vh_-_350px)] flex-col px-4',
                {
                  'justify-end': !conversation?.length,
                }
              )}
            >
              <Box className="h-full flex-1">
                <Transition
                  transition="fade-left"
                  duration={300}
                  mounted={!!conversation?.length}
                  timingFunction="ease-in"
                >
                  {(styles) => (
                    <Box style={styles} className="h-full flex-1">
                      <ScrollArea className={`h-full flex-1 px-4 pt-8`}>
                        <Flex className="flex-col gap-[24px] overflow-y-auto">
                          {conversation.map((message) => (
                            <Box
                              key={message.ruleId}
                              className={`flex items-start gap-2 ${
                                message.sender === 'user'
                                  ? 'justify-end'
                                  : 'justify-start'
                              } `}
                            >
                              {message.sender === 'fibonacci' && (
                                <Box className="grid h-10 w-10 place-content-center rounded-full border border-gray-200 bg-white">
                                  <IconFibonacciGreen className="h-6 w-6" />
                                </Box>
                              )}
                              <Box
                                style={{
                                  backgroundColor:
                                    message.sender === 'user'
                                      ? colors.vibrantgreen
                                      : '#F8FAFC',
                                  borderRadius:
                                    message.sender === 'user'
                                      ? '8px 8px 0px 8px'
                                      : '0px 8px 8px 8px',
                                  border:
                                    message.sender === 'user'
                                      ? ''
                                      : '1px solid #E2E8F0',
                                }}
                                className="max-w-[70%] p-2"
                              >
                                <Box
                                  className="text-[14px]"
                                  style={{
                                    color:
                                      message.sender === 'user'
                                        ? '#FFFFFF'
                                        : '#020617',
                                  }}
                                >
                                  {message.isInstruction &&
                                  message.sender === 'fibonacci' ? (
                                    <> {message?.description}</>
                                  ) : (
                                    <>{message?.description}</>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          ))}
                          <Transition
                            exitDelay={0}
                            enterDelay={500}
                            mounted={isLoadingCreateRule}
                            transition="fade-up"
                            duration={300}
                            timingFunction="ease"
                          >
                            {(styles) => (
                              <Box
                                style={styles}
                                className={`flex items-start justify-start gap-2`}
                              >
                                <IconInstructorChart className="h-6 w-6" />
                                <Box
                                  style={{
                                    backgroundColor: '#F8FAFC',
                                    borderRadius: '0px 8px 8px 8px',
                                    border: '1px solid #E2E8F0',
                                  }}
                                  className="max-w-[70%] p-2"
                                >
                                  <Loader size={'sm'} type="dots" />
                                </Box>
                              </Box>
                            )}
                          </Transition>
                          <div
                            className="mb-10 mt-4"
                            ref={conversationEndRef}
                          />
                        </Flex>
                      </ScrollArea>
                      <Box>
                        <form
                          className=""
                          onSubmit={form.onSubmit(() =>
                            handleSendMessage(form.values.description)
                          )}
                        >
                          <Box className="py-6">
                            <Flex className="dashboard-border h-[74px] w-full items-center justify-end gap-1 rounded-[8px] bg-[#F8FAFC80] pr-4">
                              <Textarea
                                placeholder="Ask me anything"
                                onKeyDown={(event) => handleKeyDown(event)}
                                classNames={{
                                  input: '!border-0 bg-[#F8FAFC80]',
                                }}
                                className="w-full"
                                value={form.values.description}
                                onChange={(e) => {
                                  form.setValues({
                                    description: e.target.value,
                                  });
                                }}
                              />
                              <Flex
                                className={`${isLoadingCreateRule && 'opacity-50'}`}
                              >
                                <ActionIcon
                                  type="submit"
                                  disabled={isLoadingCreateRule}
                                  bg="transparent"
                                >
                                  <IconSend />
                                </ActionIcon>
                              </Flex>
                            </Flex>
                          </Box>
                        </form>
                      </Box>
                    </Box>
                  )}
                </Transition>
              </Box>
              {!conversation?.length ? (
                <InitialInstructFibonacci
                  onCreateRule={({ values, cb, errorCb }) => {
                    onCreateRule({
                      values,
                      cb: cb && ((res) => cb(res!)),
                      errorCb,
                    });
                  }}
                  session={session}
                  isLoadingCreateRule={isLoadingCreateRule}
                  setConversation={setConversation}
                />
              ) : null}
            </Box>
          </Tabs.Panel>
        )}
      </Transition>
    </>
  );
};

export default InstructFibonacciTab;
