import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { IconArrowUp } from '@/public/assets/svg/icon-arrow-up';
import { OnboardingDianaChatInputValidation } from '@/types/diana-onboarding-chat';
import {
  ActionIcon,
  Box,
  Flex,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { formatNumberDisplay } from './extras';

export interface ChatBaseProps {
  messageText?: string;
  onChange?: (text: string | null) => void;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disableSend?: boolean;
  handleSendMessage?: () => void;
  isSubmittingChatInput: boolean;
  isNumber?: boolean;
  validation?: OnboardingDianaChatInputValidation;
}

const BaseInput = ({
  messageText,
  onChange,
  handleSendMessage,
  disableSend,
  handleKeyDown,
  isSubmittingChatInput,
  isNumber,
  validation,
}: ChatBaseProps) => {
  const [onFocus, setOnFocus] = useState(false);
  const theme = useMantineTheme();

  const textAreaValue =
    isNumber && messageText
      ? formatNumberDisplay(messageText)
      : messageText || '';

  const handleSend = () => {
    if (disableSend) return;
    messageText = messageText?.trim();
    // Prevent sending if input is numbers-only when isNumber is false
    if (!isNumber && messageText && /^\d+$/.test(messageText)) {
      toast({
        variant: 'error',
        message:
          'Please enter alphanumeric characters only (letters and numbers). Special characters and pure numbers are not allowed.',
      });
      return;
    }
    handleSendMessage?.();
    onChange?.('');
  };

  const handleOnKeyDownChange = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line
      if (disableSend) return;
      messageText = messageText?.trim();
      if (!isNumber && messageText && /^\d+$/.test(messageText)) {
        toast({
          variant: 'error',
          message:
            'Please enter alphanumeric characters only (letters and numbers). Special characters and pure numbers are not allowed.',
        });
        return;
      }
      handleKeyDown?.(e);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (isNumber) {
      // Remove commas for processing
      value = value.replace(/,/g, '').trim();
      // Allow clearing the input.
      if (value === '') {
        onChange?.('');
        return;
      }

      // Only allow valid numeric input patterns
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }

      // Check for a trailing dot (e.g. "12.")
      // In this case, store the raw value so the user can continue typing.
      if (value.endsWith('.')) {
        onChange?.(value);
        return;
      }

      // Validate numeric value.
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) return;

      if (validation) {
      }

      // Still enforce max value limits to prevent invalid inputs
      if (
        typeof validation?.max_value === 'number' &&
        numericValue > validation.max_value
      ) {
        return;
      }

      onChange?.(value);
    } else {
      // For non-numeric input, allow alphanumeric.
      if (/[^a-zA-Z0-9 ]/.test(value)) {
        return;
      }
      onChange?.(value);
    }
  };

  return (
    <Box className="dashboard-gray-bg p-y[4px] sticky bottom-2 flex w-full flex-col rounded-[16px]">
      <Flex
        className={cn(
          'chat-input-wrapper min-h-[164px] flex-col !rounded-[12px] border-gray-400',
          {
            'border-[1px] border-vibrantgreen': onFocus,
          }
        )}
      >
        <Flex className="h-full w-full flex-1">
          <Textarea
            variant="unstyled"
            className="w-full outline-none"
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            value={textAreaValue}
            disabled={!!isSubmittingChatInput}
            onChange={handleTextChange}
            size="lg"
            radius={0}
            classNames={{
              wrapper: 'w-full !px-0 !py-0 rounded-0 !text-[16px]',
              input: `!rounded-0 !px-0 !py-0 !font-[250] text-[16px] placeholder:text-gray-400 placeholder:text-[250] border-0 !bg-transparent`,
            }}
            placeholder="Start typing..."
            onKeyDown={handleOnKeyDownChange}
          />
        </Flex>
        <Flex className="items-center justify-end">
          <ActionIcon
            opacity={disableSend ? 0.5 : 1}
            disabled={disableSend}
            size="lg"
            bg={theme.colors[theme.primaryColor][6]}
            onClick={handleSend}
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

export default BaseInput;
