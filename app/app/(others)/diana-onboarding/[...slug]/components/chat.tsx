import { useDianaOnboardingStore } from '@/app/store/diana-onboarding-store';
import { IconSparkle } from '@/public/assets/svg/icon-sparkle';
import { OnboardingDianaChatProjectDetails } from '@/types/diana-onboarding-chat';
import { AttachmentModel } from '@/types/general';
import {
  Box,
  Button,
  Card,
  Flex,
  Loader,
  Paper,
  Text,
  Transition,
} from '@mantine/core';
import { MIME_TYPES } from '@mantine/dropzone';
import { useParams } from 'next/navigation';
import { Dispatch, Fragment, RefObject, SetStateAction } from 'react';
import ChatItem from './chat-item';
import RenderChatInput from './render-chat-input';

interface Props {
  conversation: OnboardingDianaChatProjectDetails[];
  setLocationGeometric?: Dispatch<
    SetStateAction<{ latitude: string | null; longitude: string | null }>
  >;
  onChangeUnit?: (text: string | null) => void;
  unit?: string;
  onRemoveAttachment?: (id: string) => void;
  onTagDocChange?: (id: string, tag: string) => void;
  attachment?: AttachmentModel[];
  messageText?: string;
  onChange?: (text: string | null) => void;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disableSend?: boolean;
  handleSendMessage?: () => void;
  isThinking: boolean;
  triggerAnalysis: () => void;
  scrollableRef: RefObject<HTMLDivElement>;
  onScroll: () => void;
  targetRef: RefObject<HTMLDivElement>;
  isSubmittingChatInput: boolean;
  handleUpload: (files: File[] | null) => void;
  isUploading: boolean;
  acceptedFileType: () => (typeof MIME_TYPES)[];
}

const Chat = ({
  scrollableRef,
  triggerAnalysis,
  onScroll,
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
  isThinking,
  conversation,
  targetRef,
  isSubmittingChatInput,
  handleUpload,
  isUploading,
  acceptedFileType,
}: Props) => {
  const { setProjectId } = useDianaOnboardingStore();
  const params = useParams<{ slug: string[] }>();
  const projectId = params?.slug?.[0];

  const handleConfirmSubmission = () => {
    setProjectId(projectId!);
    triggerAnalysis();
  };
  return (
    <Card className="h-[99vh] w-full justify-end p-0">
      <Paper
        className="custom-scrollbar"
        ref={scrollableRef}
        style={{ overflowY: 'scroll', flex: 1 }}
      >
        <>
          {[...conversation!]?.reverse()?.map((conversationItem, index) => (
            <Fragment key={`${conversationItem?.id}-conversation-${index}`}>
              <ChatItem conversation={conversationItem} />
            </Fragment>
          ))}
          {conversation?.[0]?.id === 'end' && (
            <Flex className="mt-4">
              <Button onClick={handleConfirmSubmission}>
                Confirm Submission
              </Button>
            </Flex>
          )}

          <Transition
            exitDelay={0}
            enterDelay={500}
            onEnter={() => {
              onScroll?.();
            }}
            mounted={isThinking}
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
        </>
        <Paper
          ref={targetRef}
          p="xl"
          style={{
            width: '100%',
          }}
        />
      </Paper>
      <RenderChatInput
        {...{
          messageText,
          conversation,
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
        }}
      />
    </Card>
  );
};

export default Chat;
