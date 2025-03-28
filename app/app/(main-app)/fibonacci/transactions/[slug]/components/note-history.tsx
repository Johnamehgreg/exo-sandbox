'use client';

import { Box, Image, Modal, Overlay, UnstyledButton } from '@mantine/core';
import { useGetTransactionNote } from '@/hooks/query/transaction';
import { IconRecent } from '@/public/assets/svg/icon-recent';
import { IconTimeline } from '@/public/assets/svg/icon-timeline';
import { TransactionNoteModel } from '@/types/general';
import { upperFirst, useDisclosure } from '@mantine/hooks';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const NoteHistory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { transactionNote } = useGetTransactionNote({ id: slug as string });
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedNote, setSelectedNote] = useState<TransactionNoteModel>({});

  return (
    <Box className="mt-4 grid gap-4">
      <Box className="flex items-center gap-1">
        <IconRecent />
        <p className="text-[12px] text-[#818488]">Other notes</p>
      </Box>
      <Box className="relative border-l border-gray-200 pb-2">
        {transactionNote?.map((event, index) => (
          <Box key={`transaction-note-${index}`} className="mb-8 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white">
              <IconTimeline />
            </span>
            <Box className="grid gap-1">
              {
                event?.createdAt && (
                  <span className="text-[10px] text-color-gray">
                    {format(event?.createdAt || "", "dd MMM, yyyy")}
                  </span>
                )
              }
              <h3 className="text-color text-[12px] font-semibold">
                Author: {upperFirst(event?.createdBy?.firstName as string)}{' '}
                {upperFirst(event?.createdBy?.lastName as string)}
              </h3>
              <span className="text-color-gray max-w-full truncate text-left text-[12px]">
                {event?.note}
              </span>
            </Box>
            {event?.attachment && (
              <UnstyledButton
                onClick={() => {
                  setSelectedNote(event);
                  open();
                }}
              >
                <Image
                  loading="lazy"
                  src={event?.attachment}
                  alt="note-history"
                  className="mt-4 w-full"
                />
              </UnstyledButton>
            )}
          </Box>
        ))}
      </Box>

      {opened && (
        <Overlay color="#000" backgroundOpacity={0.85}>
          <Image
            loading="lazy"
            src={selectedNote?.attachment}
            alt="note-history"
            className="mt-4 w-full"
          />
        </Overlay>
      )}

      <Modal
        opened={opened}
        className="bg-cyan-400"
        size={'xl'}
        onClose={close}
        classNames={{
          body: '!bg-transparent',
          root: '!bg-transparent',
          title: 'font-bold',
        }}
        title="Image Preview"
        centered
      >
        <Image
          loading="lazy"
          src={selectedNote?.attachment}
          alt="note-history"
          className="mt-4 w-full"
        />
      </Modal>
    </Box>
  );
};
