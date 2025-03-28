'use client';
import { IconReset } from '@/app/app/(main-app)/fibonacci/customers/[slug]/components/date-filter-button';
import { ErrorPageLayout } from '@/components/layout/error-page-layout';
import {
  useDianType,
  validateOnboardingChatRoute,
} from '@/hooks/logic/diana-logic';
import { useDianaOnboardingConversation } from '@/hooks/logic/diana-onboarding-conversation.hook';
import { routes } from '@/lib/routes';
import ProcessingSVG from '@/public/assets/svg/analysi-progress';
import { IconCheckCircle } from '@/public/assets/svg/icon-check-circle';
import { IconEnergy } from '@/public/assets/svg/icon-energy';
import { IconSparkle } from '@/public/assets/svg/icon-sparkle';
import apis from '@/services/api-services';
import {
  AnalysisUiListModel,
  CreateDianaChat,
  OnboardingDianaChatProjectDetails,
} from '@/types/diana-onboarding-chat';
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Loader,
  Menu,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Chat from './chat';
import { getAnalysisIcon } from './extras';

const DianaOnboardingChatClient = () => {
  const params = useParams<{ slug: string[] }>();
  const projectId = params?.slug?.[0];
  const route = params?.slug?.[1];
  const {
    conversation,
    setConversation,
    setLocationGeometric,
    targetRef,
    scrollableRef,
    onScroll,
    handleSendMessage,
    messageText,
    handleKeyDown,
    isSubmitting,
    triggerAnalysis,
    onChangeUnit,
    unit,
    attachment,
    getMergeList,
    totalSuccess,
    projectStatus,
    isThinking,
    onRemoveAttachment,
    onTagDocChange,
    onChange,
    isSubmittingChatInput,
    handleUpload,
    isUploading,
    analysisFailed,
    acceptedFileType,
  } = useDianaOnboardingConversation(projectId);

  const {
    mutate,
    data,
    isPending,
    status: initChatStatus,
  } = useMutation<
    OnboardingDianaChatProjectDetails[],
    AxiosError,
    CreateDianaChat
  >({
    mutationFn: async ({ projectId }) => {
      const res = await apis.diana.chat.createDianaChat({ projectId });
      return res.data;
    },
  });

  useEffect(() => {
    if (!navigator.onLine) {
      throw new Error('No internet connection available');
    }

    if (initChatStatus !== 'success' && !isPending) {
      mutate({ projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initChatStatus, isPending]);

  useEffect(() => {
    if (initChatStatus === 'success' && data) {
      setConversation(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const disableSend = conversation?.[0]?.allow_empty
    ? false
    : unit?.trim()?.length === 0 ||
      messageText?.trim()?.length === 0 ||
      isPending;

  const { getSingleProject } = useDianType();
  const selectedProject = getSingleProject(route as string);
  const Icon = selectedProject?.Icon || IconEnergy;

  useEffect(() => {
    if (!validateOnboardingChatRoute(route)) {
      redirect(routes.diana.onboarding);
    }
  }, [route]);

  const getStatus = (status: AnalysisUiListModel['status']) => {
    switch (status) {
      case 'success':
        return {
          textClassName: 'text-green-600',
          statusComponent: <IconCheckCircle className="size-[24px]" />,
          label: 'Success',
        };
      case 'running':
        return {
          textClassName: 'text-[#079abf]',
          statusComponent: <Loader size={'16'} />,
          label: 'In Progress',
        };
      case 'none':
        return {
          textClassName: 'text-yellow-600',
          statusComponent: <Loader size={'16'} />,
          label: 'Pending',
        };
      case 'failed':
        return {
          textClassName: 'text-rose-600',
          statusComponent: (
            <UnstyledButton
              onClick={() => {
                triggerAnalysis();
              }}
              className="flex items-center gap-[2px]"
            >
              <IconReset />
              <Text className="font-['TWK Lausanne'] text-sm font-medium text-[#0cae5c]">
                Restart
              </Text>
            </UnstyledButton>
          ),
          label: 'Failed',
        };
      default:
        return {
          textClassName: 'text-rose-600',
          statusComponent: (
            <UnstyledButton className="flex items-center gap-[2px]">
              <IconReset />
              <Text className="font-['TWK Lausanne'] text-sm font-medium text-[#0cae5c]">
                Restart
              </Text>
            </UnstyledButton>
          ),
          label: 'Failed',
        };
    }
  };

  const getAnalysis = () => {
    if (projectStatus?.states)
      return (
        <Box className="w-full xs:w-[470px]">
          <Flex className="relative h-[50px] items-center">
            <Text className="text-left font-twk text-lg font-semibold tracking-tight text-gray-800">
              Running Transaction Analysis
            </Text>
            <Box className="absolute right-[-100px] top-[50%] translate-y-[-50%]">
              <ProcessingSVG
                ongoing={`${totalSuccess}/${getMergeList().length}`}
              />
            </Box>
          </Flex>
          <Card className="inline-flex h-[432px] w-full flex-col items-start justify-start divide-y-[1px] divide-gray-100 overflow-hidden rounded-[10px] border border-gray-300 bg-white p-0 shadow-sm">
            {getMergeList().map((item) => {
              return (
                <Flex
                  className="inline-flex h-[72px] w-full items-center justify-between gap-[15px] bg-white px-[17px] py-[18px] shadow-sm"
                  key={item.label}
                >
                  {getAnalysisIcon(item.value)}
                  {item.icon}
                  <Box className="flex-1">
                    <Text className="line-clamp-1 font-twk text-base font-normal tracking-tight text-gray-800">
                      {item.label}
                    </Text>
                    <Text
                      className={`${
                        getStatus(item?.status).textClassName
                      } font-twk text-sm capitalize`}
                    >
                      {getStatus(item.status).label}
                    </Text>
                  </Box>
                  <Box>{getStatus(item.status).statusComponent}</Box>
                </Flex>
              );
            })}
          </Card>
        </Box>
      );

    return (
      <TypeAnimation
        sequence={['Analysis in progress']}
        wrapper="span"
        className="submitting-text-diana-onboarding"
        speed={40}
      />
    );
  };

  if (isPending && conversation?.length === 0) {
    return (
      <Paper p="sm" className="h-[calc(100vh_-_100px)]">
        <Center style={{ height: '100%' }}>
          <Loader />
        </Center>
      </Paper>
    );
  }

  if (isSubmitting) {
    return (
      <Box className="relative">
        {/* {chatHeader()} */}
        <Container className="relative flex h-[90vh] flex-col items-center justify-center overflow-y-auto">
          {getAnalysis()}
        </Container>
      </Box>
    );
  }

  return (
    <Box className="relative h-[99vh] overflow-hidden">
      <Container size={'lg'}>
        <nav className="sticky top-0 z-[200] flex w-full items-center justify-center">
          <Menu shadow="lg" width={200}>
            <Menu.Target>
              <UnstyledButton className="custom-rounded">
                <Flex className="items-center gap-1">
                  <Icon className="h-[20px]" />
                  <Text
                    c={selectedProject?.color}
                    className="text-14px font-[650]"
                  >
                    {selectedProject?.title}
                  </Text>
                  <Flex className="items-center">
                    <IconSparkle />
                    <Text
                      c={selectedProject?.color}
                      className={`text-14px font-[650]`}
                    >
                      Diana
                    </Text>
                  </Flex>
                </Flex>
              </UnstyledButton>
            </Menu.Target>
          </Menu>
        </nav>
        {analysisFailed && !isSubmitting ? (
          <ErrorPageLayout
            message="This transaction analysis failed. Click on the button below to retry."
            title="Transaction Status: Failed"
          >
            <Button variant="primary" onClick={triggerAnalysis}>
              Analysis failed, Please try again
            </Button>
          </ErrorPageLayout>
        ) : (
          // @ts-expect-error typescript unable to infer types of acceptedFileType
          <Chat
            {...{
              conversation: conversation ?? [],
              setLocationGeometric,
              onChangeUnit,
              acceptedFileType,
              unit: unit ?? undefined,
              onRemoveAttachment,
              onTagDocChange,
              attachment,
              messageText,
              onChange,
              handleKeyDown,
              disableSend,
              handleSendMessage,
              scrollableRef,
              triggerAnalysis,
              onScroll,
              isThinking,
              targetRef,
              isSubmittingChatInput,
              handleUpload,
              isUploading,
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default DianaOnboardingChatClient;
