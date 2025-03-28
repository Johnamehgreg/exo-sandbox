/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useDianaInsightConvention } from '@/hooks/logic/diana-insight-conversation.hook';
import { colors } from '@/lib/app-config';
import { IconArrowLeft } from '@/public/assets/svg/icon-arrow-left';
import { IconMagicWand } from '@/public/assets/svg/icon-magic-wand';
import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  Loader,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { KeyboardEvent, useEffect, useLayoutEffect } from 'react';
import { ChatInput } from './chat-stick-input';
import { DianaChatBody } from './diana-chat-body';

interface Props {
  insight?: string;
  type?: 'diana' | 'fibonacci';
  stat: any;
  topChildren?: React.ReactNode;
}
export const InsightChatComponent: React.FC<Props> = ({
  insight,
  type,
  stat,
  topChildren,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const project_id = searchParams.get('project_id') as string;
  const diana_tab = searchParams.get('diana_tab')?.replace(/-/g, '_');
  const insight_tab = searchParams.get('insight_tab') as string;
  const queryString = `${insight_tab}_${diana_tab}`;
  const option = searchParams.get('option') as string;
  const isExplore = option === 'explore';

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
    isLoading,
    setMessageText,
    handleKeyDown,
    isStageExit,
    handleMultiStageSelect,
    lastMessage,
    selectedGoal,
    handleSendMessageInsight,
    scrollTargetRef,
    scrollableRef,
  } = useDianaInsightConvention({
    isExplore,
    projectId: project_id,
    type: type || 'diana',
    isInsight: true,
    stat: stat,
    insightQuery: queryString,
    insightText: insight as string,
  });
  useEffect(() => {
    if (conversation.length === 0 && !isExplore) {
      handleSendMessageInsight(insight);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, insight]);

  const navigateBack = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('insight_tab', '');
    params.set('option', '');
    router.push(`?${params.toString()}`);
  };

  useLayoutEffect(() => {
    if (!insight) {
      navigateBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insight]);

  const handleSearch = useDebouncedCallback(async () => {
    if (isExplore && conversation.length === 0) {
      handleSendMessage(insight);
    }
  }, 500);

  useLayoutEffect(() => {
    if (conversation.length === 0 && !isExplore) {
      handleSendMessageInsight(insight);
    }
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, insight, isExplore]);

  return (
    <>
      <Box className="dashboard-container-wrapper relative overflow-hidden">
        <UnstyledButton
          onClick={() => {
            navigateBack();
          }}
          className="hover-scale absolute left-1 z-[30] flex items-center justify-center gap-[4px] rounded-[4px] border-[1px] border-solid border-gray-300 bg-white px-[8px] py-[2px] text-[14px] text-[550] text-p1 sm:left-[20px]"
        >
          <IconArrowLeft fill={colors.P1} />
          <Text className="hidden md:block"> Back</Text>
        </UnstyledButton>

        {isLoading && (
          <Center className="h-[90vh] w-full">
            <Loader size={'md'} />
          </Center>
        )}

        {!isLoading && (
          <Container py={0} size={'sm'} className=" ">
            <Card className="h-[90vh] w-full p-0">
              <Paper
                className="custom-scrollbar"
                ref={scrollableRef}
                style={{ overflowY: 'scroll', flex: 1 }}
              >
                {topChildren}
                <DianaChatBody
                  {...{
                    isExplore: true,
                    conversation,
                    handleSendMessage,
                    messageList,
                    handleMultiStageSelect,
                    isProcessing,
                    isInsight: true,
                    classNameChat: '!w-full',
                    onScroll,
                    systemIcon: (
                      <Flex className="h-[30px] w-[30px] items-center justify-center rounded-full border-[1px] border-solid border-gray-200">
                        <IconMagicWand />
                      </Flex>
                    ),
                  }}
                />
                <Paper
                  ref={scrollTargetRef}
                  p="xl"
                  style={{
                    width: '100%',
                  }}
                />
              </Paper>

              <ChatInput
                {...{
                  messageText,
                  attachment,
                  disableUpload: disableUpload(),
                  lastMessage,
                  selectedGoal,
                  inputClassName: {
                    input: '!text-[14px]',
                  },
                  disableSend: isStageExit(),
                  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) =>
                    handleKeyDown(event),
                  handleUpload: (files: any) => {
                    handleUpload(files);
                  },
                  handleSendMessage,
                  onChange: (text: string) => setMessageText(text),
                  onRemoveAttachment: (id) => removeItem(id),
                  handleMultiStageSelect: (stageData) =>
                    handleMultiStageSelect(stageData),
                  showGoals:
                    // @ts-expect-error typescript unable to infer type
                    lastMessage?.stage_values?.length > 0 &&
                    lastMessage?.onboarding_stage === 'main_goal' &&
                    selectedGoal?.length > 0,
                  placeholder: 'Ask questions about anything on this transaction',
                  className: 'min-h-[78px]',
                  canUpload: false
                }}
              />
            </Card>
          </Container>
        )}
      </Box>
    </>
  );
};
