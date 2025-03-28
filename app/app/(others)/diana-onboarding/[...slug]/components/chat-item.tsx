import MarkdownWithLatex from '@/components/other/mark-down-with-latex';
import { cn } from '@/lib/utils';
import { IconDocument } from '@/public/assets/svg/icon-document';
import { IconMagicWand } from '@/public/assets/svg/icon-magic-wand';
import { OnboardingDianaChatProjectDetails } from '@/types/diana-onboarding-chat';
import { Box, Flex, Text, UnstyledButton } from '@mantine/core';
import { formatDate } from 'date-fns';

interface Props {
  conversation: OnboardingDianaChatProjectDetails;
}

const MessageContent = ({ content }: { content: string }) => (
  <Flex className="mt-[10px] w-full flex-wrap justify-end gap-4">
    <Box className="human-ai-text-typing markdown-format">
      <MarkdownWithLatex content={content} />
    </Box>
  </Flex>
);

const renderMessageContent = (content: string | undefined | null) => {
  if (!content || content === '@@') return null; // note this is a hack to get around the fact that the diana api doesn't allow empty strings. the Machine learning guys should fix this later.
  return <MessageContent {...{ content }} />;
};

const renderFiles = (files?: OnboardingDianaChatProjectDetails['files']) => {
  if (!files || files.length === 0) return null;
  return (
    <Flex className="mt-[10px] w-full flex-wrap justify-end gap-4">
      {files.map((file) => (
        <UnstyledButton
          key={file.url}
          component="a"
          href={file.url}
          target="_blank"
          variant="default"
          className="attachment-file-card"
        >
          <Box className="w-[20px]">
            <IconDocument />
          </Box>
          <Text className="text-md" lineClamp={1}>
            {file.name}
          </Text>
        </UnstyledButton>
      ))}
    </Flex>
  );
};

const ChatItem = ({ conversation }: Props) => {
  if (conversation?.is_system_message && conversation?.id !== 'end') {
    return (
      <Box
        className={cn('py-2.5', {
          'flex-row-reverse': conversation?.is_system_message,
        })}
      >
        <Flex className="px flex-col items-start">
          <Box className="md:w-[70%]">
            <Flex className="w-full gap-[2px]">
              <IconMagicWand />
              <Box className="flex-1">
                <Box className="system-ai-text-typing markdown-format z-10">
                  <MarkdownWithLatex content={conversation?.title as string} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  }
  return (
    <>
      {renderMessageContent(conversation?.text)}
      {renderMessageContent(conversation?.address)}
      {renderMessageContent(conversation?.selected_options?.[0])}
      {renderMessageContent(
        conversation?.date
          ? formatDate(new Date(conversation?.date), 'dd MMM, yyyy')
          : undefined
      )}
      {renderMessageContent(
        conversation?.unit_value && conversation?.unit
          ? `${new Intl.NumberFormat('en-US').format(Number(conversation?.unit_value))} ${conversation?.unit}`
          : undefined
      )}
      {renderFiles(conversation?.files)}
    </>
  );
};

export default ChatItem;
