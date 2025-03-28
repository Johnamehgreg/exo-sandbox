'use client';

import { useDownloadReport, useGeneratWorkbook } from '@/hooks/query/diana-dashboard';
import { dianaDownloadReportSchema } from '@/lib/validator/auth';
import { IconArchiveBox } from '@/public/assets/svg/icon-archive-box';
import { IconCsvIcon } from '@/public/assets/svg/icon-csv-icon';
import { IconDownload } from '@/public/assets/svg/icon-download';
import { IconInfo } from '@/public/assets/svg/icon-info';
import { IconPdfIcon } from '@/public/assets/svg/icon-pdf-icon';
import {
  Box,
  Button,
  Flex,
  Loader,
  Modal,
  Radio,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useParams, usePathname } from 'next/navigation';

export const DianaDownloadReport = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams();
  const project_id = params.projectId as string;
  const pathname = usePathname();
  const isOverview = pathname.endsWith('/overview');

  const form = useForm({
    validate: yupResolver(dianaDownloadReportSchema),
    initialValues: {
      documentType: 'pdf', // Set default value to prevent undefined
    },
  });

  const { isLoading: isDownloadLoading, report, error } = useDownloadReport({
    project_id,
    enabled: !!project_id && isOverview,
  });

  const { isLoading: isWorkbookLoading, report: workBookReport } = useGeneratWorkbook({
    project_id,
    enabled: !!project_id && isOverview,
  });

  const isLoading = isWorkbookLoading || isDownloadLoading;
  const isDisabled = !report?.reportUrl || !workBookReport?.reportUrl;

  const handleSubmit = () => {
    const { documentType } = form.values;
    const url = documentType === 'pdf' 
      ? report?.reportUrl 
      : workBookReport?.reportUrl;
    
    if (url) {
      window.open(url, '_blank');
      close()
    }

  };

  if (!project_id || !isOverview) return null;

  return (
    <>
      <Flex className="items-center gap-x-1">
        <Tooltip label={isDisabled ? "Reports are being generated" : "Download the latest report"}>
          <UnstyledButton
            disabled={isDisabled}
            onClick={open}
            className="download-report-btn"
          >
            {isLoading ? (
              <Loader size="sm" />
            ) : (
              <Flex align="center" gap={4}>
                <IconDownload />
                <Text className="text-gray-800 font-[550] text-[14px]">
                  {error ? "Error processing report" : "Download Report"}
                </Text>
                <IconInfo />
              </Flex>
            )}
          </UnstyledButton>
        </Tooltip>
      </Flex>

      <Modal
        opened={opened}
        onClose={close}
        title="Generate and Download Report"
        size="sm"
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          <Box>
            <Radio.Group
              label="Report Format"
              classNames={{
                label: 'font-[13px] text-gray-600 leading-4 mb-[6px]',
                error: '!mt-1 h-0 !p-0',
              }}
              {...form.getInputProps('documentType')}
            >
              <Flex gap="sm">
                <Radio.Card
                  value="pdf"
                  className="w-fit p-2 shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)] transition ease-in data-[checked]:bg-green-50"
                >
                  <Flex align="center" gap={4}>
                    <IconPdfIcon />
                    <Text className="text-[14px] font-normal leading-[18px] text-gray-500">
                      PDF
                    </Text>
                    <Radio.Indicator />
                  </Flex>
                </Radio.Card>
                <Radio.Card
                  value="csv"
                  className="w-fit p-2 shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)] transition ease-in data-[checked]:bg-green-50"
                >
                  <Flex align="center" gap={4}>
                    <IconCsvIcon />
                    <Text className="text-[14px] font-normal leading-[18px] text-gray-500">
                      CSV
                    </Text>
                    <Radio.Indicator />
                  </Flex>
                </Radio.Card>
              </Flex>
            </Radio.Group>
          </Box>
          <Flex justify="space-between" pt={18}>
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              Download Report
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};