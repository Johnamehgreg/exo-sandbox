import { IconWarn } from '@/public/assets/svg/icon-warn';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  MantineStyleProp,
  Modal,
  Text,
} from '@mantine/core';
import React from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  buttonText?: string;
  cancelBtnText?: string | React.ReactNode;
  children?: React.ReactNode;
  hideIcon?: boolean;
  buttonBgColor?: string;
  buttonStyle?: MantineStyleProp;
  disableCloseOutside?: boolean;
  onSubmit?: () => void;
  Icon?: React.ElementType;
  position?: 'left' | 'center';
  isProcessing?: boolean;
  form?: { onSubmit?: (callback: () => void) => void };
  leftClassName?: string;
  rightClassName?: string;
}
export const ActionModal: React.FC<Props> = ({
  isVisible,
  buttonStyle,
  disableCloseOutside,
  hideIcon,
  position,
  title,
  buttonText,
  Icon,
  message,
  children,
  onClose,
  onSubmit,
  form,
  // buttonBgColor,
  isProcessing,
  cancelBtnText,
  leftClassName,
  rightClassName,
}) => {
  return (
    <Modal
      onClick={(e) => {
        e.stopPropagation();
      }}
      opened={isVisible}
      shadow="md"
      centered
      classNames={{
        body: ' px-0 ',
      }}
      size={'md'}
      radius={'16px'}
      onClose={() => {
        if (disableCloseOutside) return null;
        onClose();
      }}
      className="!p-0"
      withCloseButton={false}
    >
      <form
        className="w-full"
        // @ts-expect-error typescript unable to infer types
        onSubmit={form?.onSubmit?.(() => onSubmit?.())}
        style={{ position: 'relative' }}
      >
        {isProcessing ? (
          <>
            <Flex className="flex-col items-center px-4 py-[24px] md:px-[32px]">
              <Loader mb={'md'} size={'sm'} />
              <Text
                style={{
                  textAlign: position,
                }}
                className="mb-2 whitespace-pre-line text-[16px] font-semibold text-[#020617]"
              >
                Processing
              </Text>

              <Text
                style={{
                  textAlign: position,
                }}
                className="auth-text-title whitespace-pre-line !text-[12px] text-[#475569]"
              >
                This should only take a few moments…
              </Text>
            </Flex>
          </>
        ) : (
          <>
            <Box style={{}} className="px-3 py-[24px] md:px-[28px]">
              {!hideIcon && (
                <Center mb={'sm'}>
                  {Icon ? React.createElement(Icon) : <IconWarn />}
                </Center>
              )}
              <Flex
                align={position}
                className="flex-col justify-center space-y-2"
              >
                <Text
                  style={{
                    textAlign: position || 'center',
                  }}
                  className="mx-auto max-w-[250px] whitespace-pre-line text-base font-medium leading-6 tracking-[-0.32px] text-text"
                >
                  {title}
                </Text>

                <Text
                  style={{
                    textAlign: position || 'center',
                  }}
                  className="auth-text-title whitespace-pre-line !text-[12px] leading-6 text-secondary"
                >
                  {message}
                </Text>
              </Flex>
              {children}
            </Box>
            <Divider className="mb-4" />

            <Flex className="mx-6 gap-6" align={'center'} justify={'space-between'} >
              <Button size="sm" variant="default" onClick={onClose} className={`${leftClassName}`}  >
                {cancelBtnText || 'Cancel'}
              </Button>

              <Button
                type={form ? 'submit' : 'button'}
                  onClick={(e) => {
                  e.stopPropagation();
                  if (!form) return onSubmit?.();
                }}
                size="sm"
                className={`!bg-error-600 text-white hover:text-white ${rightClassName}`}
                style={{
                  ...buttonStyle,
                }}
              >
                {buttonText || ' Remove'}
              </Button>
            </Flex>
          </>
        )}
      </form>
    </Modal>
  );
};
