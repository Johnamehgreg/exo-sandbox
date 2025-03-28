'use client';

import { useTransaction } from '@/hooks/mutate/use-transaction';
import { useUpload } from '@/hooks/mutate/use-upload';
import { useGetTransactionNote } from '@/hooks/query/transaction';
import { colors } from '@/lib/app-config';
import { noteTransactionSchema } from '@/lib/validator/auth';
import { IconAttachment } from '@/public/assets/svg/icon-attachment';
import { IconQuestionMark } from '@/public/assets/svg/icon-question-mark';
import {
  Box,
  Button,
  Center,
  FileButton,
  Flex,
  Image,
  Loader,
  Text,
  Textarea,
  UnstyledButton,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useParams } from 'next/navigation';
import { NoteHistory } from './note-history';

const initialValues: { note: string; attachment: string } = {
  note: '',
  attachment: '',
};

export const NoteSection = () => {
  const form = useForm({
    initialValues,
    validate: yupResolver(noteTransactionSchema),
  });
  const { onCreateTransactionNote, isLoading } = useTransaction();
  const { isUploading, onUploadFile } = useUpload();
  const { slug } = useParams<{ slug: string }>();
  const { refetch } = useGetTransactionNote({ id: slug as string });
  const onSaveNote = () => {
    onCreateTransactionNote({
      values: {
        note: form.values.note,
        attachment: form.values.attachment || null,
      },
      transactionId: slug as string,
      cb() {
        form.reset();
        refetch();
      },
    });
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    onUploadFile({
      file: file,
      cb(uri) {
        form.setFieldValue('attachment', uri);
      },
    });
  };
  return (
    <>
      <Box pt={'sm'} px={0} className="dashboard-border rounded-[4px] bg-white">
        <Box px={'sm'}>
          <Text mb={'xs'} className="text-[12px] font-medium text-[#475569]">
            Transaction Note
          </Text>
          <form
            className="w-full"
            onSubmit={form.onSubmit(() => onSaveNote())}
            style={{ position: 'relative' }}
          >
            <Textarea
              mb={'md'}
              {...form.getInputProps('note')}
              classNames={{
                input: 'rounded-[6.68px] min-h-[111px]',
              }}
              placeholder="Enter transaction note"
            />
            <Flex
              mb={'md'}
              className="flex-wrap items-end justify-between gap-2"
            >
              <FileButton
                onChange={(file) => {
                  handleImageUpload(file || null);
                }}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Box className="flex-col">
                    <Text className="mantine-InputWrapper-error mb-1 text-[12px]">
                      {form.errors.attachment}
                    </Text>

                    {form.values.attachment ? (
                      <UnstyledButton className="relative" {...props}>
                        {isUploading && (
                          <Center className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <Loader size={'sm'} />
                          </Center>
                        )}
                        <Flex className="dashboard-border h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-md !border-dashed">
                          <Image
                            loading="lazy"
                            src={form.values.attachment}
                            alt="note-history"
                            className=" "
                          />
                        </Flex>
                      </UnstyledButton>
                    ) : (
                      <Button
                        loading={isUploading}
                        className="w-auto px-0"
                        variant="transparent"
                        size="xs"
                        {...props}
                      >
                        <Flex className="items-center gap-1">
                          <IconAttachment className="w-4" />
                          <Text className="text-[12px] font-medium text-[#000]">
                            Add attachment
                          </Text>
                        </Flex>
                      </Button>
                    )}
                  </Box>
                )}
              </FileButton>
              <Button
                loading={isLoading}
                type="submit"
                variant="default"
                size="xs"
              >
                Add note
              </Button>
            </Flex>
          </form>
        </Box>

        <Box
          p={'sm'}
          className="dashboard-border !border-x-0 !border-b-0 bg-white"
        >
          <IconQuestionMark fill={colors.vibrantgreen} className="mb-1" />
          <Text className="mb-1 text-[12px] font-medium text-[#475569]">
            Why transaction notes are important?
          </Text>
          <Text className="text-[10px] font-normal text-[#475569]">
            Transaction notes help auditors know why the action performed on any
            transaction was done.
          </Text>
        </Box>
      </Box>
      <Box className="px-2">
        <NoteHistory />
      </Box>
    </>
  );
};
