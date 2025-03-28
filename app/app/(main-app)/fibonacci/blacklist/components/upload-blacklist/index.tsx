import { useUploadBlacklist } from '@/hooks/mutate/use-upload-blacklist';
import { colors } from '@/lib/app-config';
import { downloadCSVTemplate } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IconArrowDown } from '@/public/assets/svg/icon-arrow-down';
import { IconChevronDown } from '@/public/assets/svg/icon-chevron-down';
import { IconCsvFile } from '@/public/assets/svg/icon-csv-file';
import { IconTrashSimple } from '@/public/assets/svg/icon-trash-simple';
import IconUploadCloud from '@/public/assets/svg/icon-upload-cloud';
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  Text,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useState } from 'react';
import BlacklistUploadValidationMessage from './blacklist-upload-validation-message';
import { validateFileHeaders } from './validate-file-headers';

const acceptableFiles = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

interface FileValidationState {
  isValid: boolean;
  message: string;
  variant: 'error' | 'success';
}

interface Props {
  refetch?: () => void;
  session: Session | null;
}

const UploadBlacklistModal = ({ refetch, session }: Props) => {
  const accessToken = session?.token;
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<FileValidationState | null>(
    null
  );
  const searchParams = useSearchParams();
  const uploadTab = searchParams.get('upload');

  const handleClose = () => {
    setFile(null);
    setValidation(null);
    const params = new URLSearchParams(searchParams);
    params.delete('upload');
    return router.push(`?${params.toString()}`);
  };

  const onSuccessCallback = () => {
    refetch?.();
    handleClose();
  };
  const { mutate, isPending } = useUploadBlacklist({
    onSuccessCallback,
    accessToken,
  });

  const handleUploadFile = async (file: FileWithPath | null) => {
    if (!file) return;
    const result = await validateFileHeaders(file);
    if (result.error) {
      setValidation({
        isValid: false,
        message: result.error,
        variant: 'error',
      });
      return;
    }
    setValidation({
      isValid: result.isValid,
      message: `Contains ${result.recordCount} blacklist record`,
      variant: 'success',
    });
    setFile(file);
  };

  const handleFileUploadToAzure = (file: File) => {
    if (!file) return;
    mutate(file);
  };

  const handleRemoveFile = () => {
    setValidation(null);
    setFile(null);
  };

  return (
    <Modal
      opened={uploadTab == 'blacklist'}
      onClose={handleClose}
      fullScreen
      title={
        <Box>
          <Text className="text-base leading-normal text-gray-800">
            Upload Blacklist Document
          </Text>
          <Text className="text-[13px] font-light leading-normal text-gray-600">
            CSV or XLSX document containing the list of blacklisted customers,
            devices, or accounts
          </Text>
        </Box>
      }
    >
      <Flex className="flex h-[calc(100vh_-_100px)] flex-col">
        <Center
          mx="auto"
          maw={732}
          className={cn('flex h-full flex-1 flex-col gap-y-2', {
            'gray-out': true,
          })}
        >
          <Dropzone
            // disabled={isPending}
            enablePointerEvents
            multiple={false}
            accept={acceptableFiles}
            onDrop={(file) => {
              handleUploadFile(file[0] || null);
            }}
            maxSize={10 * 1024 * 1024}
            className="hover::!bg-white w-full rounded-xl border-gray-400 bg-white shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <Flex className="w-full cursor-pointer flex-col items-center px-6 pb-2.5 pt-14">
              <IconUploadCloud />
              <Box className="mb-[26px] mt-3 space-y-[6px] text-[14px] font-normal leading-normal text-gray-600">
                <Text inherit className="font-plus">
                  <Text inherit span className="font-twk text-vibrantgreen">
                    Click to upload
                  </Text>{' '}
                  or drag and drop
                </Text>
                <Text inherit>Supports only CSV and XLSX files</Text>
              </Box>
              <UnstyledButton
                onClick={(event) => {
                  event.stopPropagation();
                  downloadCSVTemplate();
                }}
                className="flex items-center gap-x-1 text-[14px] font-medium leading-5 text-[#08A969]"
              >
                <IconArrowDown
                  fill={colors.vibrantgreen}
                  className="h-[14px] w-[14px]"
                />
                Download CSV Template
                <IconChevronDown className="h-[14px] w-[14px] text-vibrantgreen" />
              </UnstyledButton>
            </Flex>
          </Dropzone>
          <Transition
            mounted={!!validation}
            transition="fade-left"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Box style={styles} className="w-full">
                {validation?.isValid && (
                  <Flex className="w-full items-center justify-between rounded-xl bg-gray-50 py-4 pl-4 pr-[26px]">
                    <Flex className="items-center gap-x-3">
                      <IconCsvFile />
                      <Box>
                        <Text className="text-[14px] font-medium leading-5 text-gray-700">
                          {file?.name}
                        </Text>
                        <Text className="text-[13px] font-normal leading-5 text-gray-600">
                          {validation?.message}
                        </Text>
                      </Box>
                    </Flex>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="pointer-events-auto cursor-pointer"
                    >
                      <IconTrashSimple />
                    </button>
                  </Flex>
                )}
                {!validation?.isValid && (
                  <BlacklistUploadValidationMessage
                    variant="error"
                    message={validation?.message as string}
                  />
                )}
              </Box>
            )}
          </Transition>

          <BlacklistUploadValidationMessage message="Files must have headers exactly as shown in the template. Incorrect headers may cause upload errors." />
        </Center>
        {
          <Transition
            mounted={!!(validation && validation?.isValid)}
            transition="fade-left"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Flex style={styles} className="justify-between">
                <Button variant="default" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  loading={isPending}
                  onClick={() => handleFileUploadToAzure(file!)}
                >
                  Upload
                </Button>
              </Flex>
            )}
          </Transition>
        }
      </Flex>
    </Modal>
  );
};

export default UploadBlacklistModal;
