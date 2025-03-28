/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUiStore } from "@/app/store/ui.store";
import { useDianaInsightConvention } from '@/hooks/logic/diana-insight-conversation.hook';
import { useQueryParams } from "@/hooks/logic/use-query-parems";
import { colors } from "@/lib/app-config";
import { IconAskChat } from "@/public/assets/svg/icon-ask-chat";
import { IconAtom } from "@/public/assets/svg/icon-atom";
import { IconDash } from "@/public/assets/svg/icon-dash";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { IconArrowRightIos } from "@/public/assets/svg/icon-right-arrow-ios";
import {
  ActionIcon,
  Box,
  Card,
  Center,
  Flex,
  Loader,
  Menu,
  Paper,
  Text,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useParams } from 'next/navigation';
import { ChatInput } from "../other/chat-stick-input";
import { DianaChatBody } from "../other/diana-chat-body";


export const AskDianaModal = () => {
  const { projectId } = useParams();
  const {
    conversation,
    messageList,
    handleSendMessage,
    onScroll,
    isProcessing,
    attachment,
    removeItem,
    disableUpload,
    handleUpload,
    messageText,
    setMessageText,
    handleKeyDown,
    isStageExit,
    handleMultiStageSelect,
    lastMessage,
    selectedGoal,
    isRecommendationLoading,
    chatRecommendation,
    isLoading,
    scrollTargetRef,
    scrollableRef,
  } = useDianaInsightConvention({ projectId: projectId as string, type: "diana" });
  const { showAskDiana, setShowAskDiana } = useUiStore();
  const showSuggestions = conversation?.length === 0;
  const { queryParams } = useQueryParams();
  const diana_tab = queryParams?.diana_tab?.replace(/-/g, " ");
  const insight_tab = queryParams?.insight_tab?.replace(/_/g, " ");

  return (
    <Transition
      mounted={showAskDiana}
      transition="slide-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Box
          style={styles}
          className={`fixed lg:relative transition-all right-0  w-fit   z-40 lg:z-0  `}
        >
          <Card
            className={`ask-diana-modal-wrapper transition-all shadow-lg mt-2.5  `}
          >
            <Box className=" text-white w-full justify-between border-b-[1px] border-gray-300 flex h-[48px] flex-row items-center gap-2 py-3 px-[20px]">
              <Flex className="items-center gap-2">
                <IconAskChat />
                <Text className="text-md font-twk text-gray-800 font-semibold">
                  Ask Diana
                </Text>
              </Flex>

              <ActionIcon
                size={32}
                className=" text-palegreen lg:hidden size-[32px] p-2"
                onClick={() => setShowAskDiana(false)}
              >
                <IconDash />
              </ActionIcon>
            </Box>
            {isLoading ? (
              <Center className="h-full w-full">
                <Loader size={"md"} />
              </Center>
            ) : (
              <>
                <Paper
                  className="w-full custom-scrollbar  bg-gray-100  "
                  p={10}
                  ref={scrollableRef}
                  style={{
                    overflowY: "scroll",
                    flex: !showSuggestions ? 1 : 0,
                  }}
                >
                  <DianaChatBody
                    {...{
                      conversation,
                      handleSendMessage,
                      messageList,
                      handleMultiStageSelect,
                      isProcessing,
                      onScroll,

                      classNameChat: "!w-full",
                      classNameChatText: "!text-sm font-[550]",
                      classNameHumanText: "bg-white ml-[34px]",
                      systemIcon: (
                        <Flex className="w-[30px] items-center justify-center rounded-full border-gray-200 border-solid border-[1px] h-[30px]">
                          <Box className="size-[32px] bg-[#E2F0D9]  rounded-[6px]">
                            <IconAtom />
                          </Box>
                        </Flex>
                      ),
                    }}
                  />
                  <Paper
                    ref={scrollTargetRef}
                    p="xl"
                    className="bg-transparent"
                    style={{
                      width: "100%",
                    }}
                  />
                </Paper>

                <Box
                  style={{
                    flex: showSuggestions ? 1 : 0,
                  }}
                  className=" transition-all  flex-col gap-[10px] flex justify-center items-center"
                >
                  {showSuggestions && (
                    <Text className="text-[24px] text-p1 font-[550] ">
                      What can I help with?
                    </Text>
                  )}
                  {false && (
                    <Flex className="items-center justify-between gap-[2px] px-[8px] py-[6px] bg-[#E2F0D9] w-full border-t-[1px] border-x-0 border-b-0 border-t-gray-300">
                      <Flex className="gap-[2px] items-center">
                        <Text
                          component="p"
                          className="text-[12px] line-clamp-1 capitalize font-[450] text-gray-800"
                        >
                          {diana_tab}

                          {insight_tab && (
                            <Text
                              component="span"
                              className="text-[12px]  font-[350] text-gray-800"
                            >
                              {" "}
                              {">"} {upperFirst(insight_tab)}
                            </Text>
                          )}
                        </Text>
                      </Flex>
                      <Menu width={150}>
                        <Menu.Target>
                          <UnstyledButton className="!size-[18px] border-gray-300 bg-white flex items-center justify-center rounded-[6px] border-[1px] border-solid">
                            <IconDropDown className="size-[11px] " />
                          </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item className="text-[12px] text-gray-700">
                            Transfer my data
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Flex>
                  )}
                  <ChatInput
                    {...{
                      messageText,
                      attachment,
                      disableUpload: disableUpload(),
                      lastMessage,
                      selectedGoal,
                      disableSend: isStageExit(),
                      handleKeyDown: (event) => handleKeyDown(event),
                      handleUpload(files) {
                        handleUpload(files as any);
                      },
                      handleSendMessage,
                      onChange: (text: string) => setMessageText(text),
                      onRemoveAttachment: (id) => removeItem(id),
                      handleMultiStageSelect: (stageData) =>
                        handleMultiStageSelect(stageData),
                      showGoals:
                        (lastMessage?.stage_values as [] || [])?.length > 0 &&
                        lastMessage?.onboarding_stage === "main_goal" &&
                        selectedGoal?.length > 0,
                      placeholder:
                        "Ask questions about anything on this transaction",
                      className:
                        "min-h-[78px]  border-t-[1px] border-x-0 border-b-0 border-t-gray-300 !w-full !rounded-[0px]",
                      inputClassName: {
                        input: "!text-sm",
                      },
                      hideFooter: true,
                      wrapperClassName: " !rounded-[0px]",
                      btnSendWrapperClassName: "!bg-vibrantgreen",
                      btnSendIconColor: "#fff",
                    }}
                  />
                  {showSuggestions && (
                    <>
                      {isRecommendationLoading ? (
                        <Center className="py-4">
                          <Loader size={"sm"} />
                        </Center>
                      ) : (
                        <Flex className="flex-wrap max-h-[200px] overflow-y-scroll px-2  gap-[8px] justify-center ">
                          {chatRecommendation
                            .slice(0, 4)
                            ?.map((suggestText) => {
                              return (
                                <UnstyledButton
                                  onClick={() => {
                                    handleSendMessage(suggestText);
                                  }}
                                  className="flex gap-[4px] shadow-sm hover:shadow-md items-center  bg-gray-100 py-[3px] px-[6px] rounded-[6px] border-gray-300 border-[1px] border-solid"
                                  key={suggestText}
                                >
                                  <Text component="p" className="text-[13px]">
                                    {suggestText}
                                  </Text>
                                  <IconArrowRightIos
                                    fill={colors.P1}
                                    className="!w-0"
                                  />
                                </UnstyledButton>
                              );
                            })}
                        </Flex>
                      )}
                    </>
                  )}
                </Box>
              </>
            )}
          </Card>
        </Box>
      )}
    </Transition>
  );
};
