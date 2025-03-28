'use client';
import {
  AttachmentModel,
  DianaChatModel,
  FibonacciMessageModel,
} from '@/types/general';
import { useScrollIntoView } from '@mantine/hooks';
import { File } from 'buffer';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../mutate/use-chat';
import { useUpload } from '../mutate/use-upload';
import { useFetchAnimation } from '../query/animation-data';
import {
  useAskDianaChatRecommendation,
  useAskDianaConversationChat,
} from '../query/chat';
const ruleId = uuidv4();

export interface StateModel {
  key?: string;
  value?: string;
  isSelected?: boolean;
}
export const useDianaInsightConvention = ({
  projectId,
  isExplore,
  isInsight,
  type,
  stat,
  insightQuery,
  insightText,
}: {
  projectId: string;
  isInsight?: boolean;
  isExplore?: boolean;
  insightQuery?: string;
  insightText?: string;
  type?: 'diana' | 'fibonacci';
  stat?: unknown;
}) => {
  const [conversation, setConversation] = useState<DianaChatModel[]>([]);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();
  const resetRef = useRef<() => void>(null);
  const {
    onCreateAskDianaChat,
    onCreateFibonacciInsightChat,
    onCreateScenariosChat,
    isLoading: isProcessing,
  } = useChat();
  const { onUploadFile } = useUpload();
  const [messageText, setMessageText] = useState<string>('');
  const [attachment, setAttachment] = useState<AttachmentModel[]>([]);
  const { data } = useFetchAnimation('/assets/diana_onboarding_loader.json');

  const { chatConversation, shouldFetch, isFetching, status, isLoading } =
    useAskDianaConversationChat({
      isExplore,
      projectId: projectId,
      insightText: insightText,
      section: insightQuery as string,
      disableFetch: !insightText,
    });
  const {
    chatRecommendation,
    isFetching: isRecommendationFetching,
    status: recommendationStatus,
    isLoading: isRecommendationLoading,
  } = useAskDianaChatRecommendation({
    projectId: projectId,
    enabled: type === 'diana',
  });
  const lastMessage = conversation[conversation.length - 1];
  const disableSend = () => {
    return messageText.trim().length === 0 || isProcessing;
  };

  const finalFunc = () => {
    setAttachment([]);
    setMessageText('');
  };

  const errorFunction = () => {
    setTimeout(() => {
      const newMessage: DianaChatModel = {
        project_id: `${ruleId}${new Date().toISOString()}`,
        message: 'Some thing went wrong please try again?',
        type: 'system',
      };
      setConversation((con) => [...con, newMessage]);
    }, 400);
  };

  const successFunction = (res: unknown) => {
    const newMessage: DianaChatModel = {
      project_id: projectId,
      // @ts-expect-error typescript unable to infer types
      message: res,
      type: 'ai',
    };
    setConversation((con) => [...con, newMessage]);
  };

  // @ts-expect-error typescript unable to infer types
  const selectedGoal: StateModel[] = lastMessage?.stage_values?.filter(
    (stageObj: StateModel) => stageObj.isSelected
  );
  const handleSendMessage = (message?: string) => {
    const messageConversation =
      // @ts-expect-error typescript unable to infer types
      (lastMessage?.stage_values?.length as number) > 0 || message
        ? message
        : messageText;
    const uploadedAttachment = attachment
      ?.filter((attachObj) => attachObj?.isUploaded)
      ?.map((fileObj) => {
        return {
          name: fileObj.file?.name,
          type: fileObj.file?.type,
          url: fileObj.url,
        };
      });
    const goalConversation =
      selectedGoal
        ?.map((item, index) => `(${index + 1}) ${item.key}`)
        ?.join(' ') || messageConversation;
    const insightMessageValue = isInsight
      ? {
          current_insight_title: insightQuery,
          current_insight_text: insightText,
        }
      : {};
    const messageValue: DianaChatModel = {
      message: goalConversation,
      project_id: ruleId,
      file_objects: uploadedAttachment as DianaChatModel['file_objects'],
      type: 'human',
    };
    setConversation((prevConversation) => [...prevConversation, messageValue]);
    const values = {
      ...insightMessageValue,
      message: goalConversation as string,
      file_objects: uploadedAttachment as DianaChatModel['file_objects'],
      file_key: lastMessage?.onboarding_stage as string,
      project_id: projectId,
    };
    if (uploadedAttachment.length === 0) {
      delete values.file_objects;
    }
    if (isExplore) {
      const scenariosValues = {
        ...insightMessageValue,
        project_id: projectId,
        message: messageConversation as string,
        file_uploaded: false,
        file_url: '',
        file_type: '',
      };
      onCreateScenariosChat({
        values: scenariosValues,
        cb(res: unknown) {
          successFunction(res);
        },
        errorCb() {
          errorFunction();
        },
      });
    } else if (type === 'fibonacci') {
      const fibonacciValue: FibonacciMessageModel = {
        message: goalConversation as string,
        stat: stat,
        statInsight: insightText as string,
      };
      onCreateFibonacciInsightChat({
        values: fibonacciValue,
        cb(res: unknown) {
          // @ts-expect-error typescript unable to infer types
          successFunction(res?.response);
        },
        errorCb() {
          errorFunction();
        },
      });
    } else if (type === 'diana') {
      onCreateAskDianaChat({
        values,
        cb(res: unknown) {
          successFunction(res);
        },
        errorCb() {
          errorFunction();
        },
      });
    }

    finalFunc();
  };

  const handleSendMessageInsight = (message?: string) => {
    const messageValue: DianaChatModel = {
      message: message,
      project_id: ruleId,
      type: 'ai',
    };
    setConversation([messageValue]);
    setMessageText('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isStageExit()) return null;
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const onScroll = () => {
    scrollIntoView();
  };
  const handleUpload = (files: File[]) => {
    if (!files) return;
    const newList = files.map((fileItem) => ({
      file: fileItem,
      id: uuidv4(),
      isUploaded: false,
      isErrored: false,
    }));
    // @ts-expect-error typescript unable to infer types
    setAttachment((prevItems) => {
      const updatedList = [...prevItems, ...newList];
      newList.forEach((obj) => {
        onUploadFile({
          // @ts-expect-error typescript cannot infer types
          file: obj.file,
          hidePopup: true,
          fileId: obj.id,
          cb(uri, id) {
            setAttachment((currentItems) =>
              currentItems?.map((item) =>
                item.id === id ? { ...item, isUploaded: true, url: uri } : item
              )
            );
          },
          errorCb({ id }) {
            setAttachment((currentItems) =>
              currentItems?.map((item) =>
                item.id === id ? { ...item, isErrored: true } : item
              )
            );
          },
        });
      });
      return updatedList;
    });
  };
  const removeItem = (itemToRemove: string) => {
    setAttachment((prevItems) =>
      prevItems.filter((item) => item.id !== itemToRemove)
    );
  };

  useEffect(() => {
    if (chatConversation) {
      setConversation((con) => [...con, ...chatConversation]);
    }
  }, [chatConversation]);
  useEffect(() => {
    if (conversation.length > 1) {
      onScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  const handleMultiStageSelect = ({
    conversationId,
    stage,
  }: {
    conversationId: string;
    stage: StateModel;
  }) => {
    const newList = conversation?.map((item) => {
      if (item.id === conversationId) {
        // @ts-expect-error typescript unable to infer types
        const stageList = item.stage_values?.map((stateItem: StateModel) => {
          const objValue =
            selectedGoal?.length === 3 ? false : !stateItem.isSelected;
          if (stage.key === stateItem.key) {
            const updatedStageList = {
              ...stateItem,
              isSelected: objValue,
            };
            return updatedStageList;
          }
          return stateItem;
        });
        const updateItem = {
          ...item,
          stage_values: stageList,
        };
        return updateItem;
      }
      return item;
    });
    setConversation(newList);
  };

  const isStageExit = () => {
    // if (!isMainGoalIncomplete && lastMessage?.stage_values?.length > 0) return false;
    if (attachment.length > 0) return false;
    if (
      lastMessage?.onboarding_stage === 'main_goal' &&
      selectedGoal?.length > 0
    )
      return false;
    return disableSend();
  };
  const disableUpload = () => {
    return !lastMessage?.upload_state;
  };

  const messageList = (message: string): string[] => {
    return (
      message
        ?.match(/\)\s*([^()]+)/g) // Finds all matches where text follows a closing parenthesis
        ?.map((item) => item.trim().slice(1)) || []
    );
  };
  return {
    conversation,
    scrollTargetRef: targetRef,
    scrollableRef,
    messageList,
    data,
    isLoading,
    isFetching,
    status,
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
    resetRef,
    handleMultiStageSelect,
    lastMessage,
    selectedGoal,
    chatConversation,
    handleSendMessageInsight,
    chatRecommendation,
    isRecommendationFetching,
    recommendationStatus,
    isRecommendationLoading,
    shouldFetch,
  };
};
