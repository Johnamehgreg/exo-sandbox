'use client';

import { useGenerateTransactionReport } from '@/hooks/mutate/use-generate-transaction-report';
import { fibonacciDownloadReportSchema } from '@/lib/validator/auth';
import { IconArchiveBox } from '@/public/assets/svg/icon-archive-box';
import { IconCsvIcon } from '@/public/assets/svg/icon-csv-icon';
import { IconDate } from '@/public/assets/svg/icon-date';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { IconInfo } from '@/public/assets/svg/icon-info';
import { IconPdfIcon } from '@/public/assets/svg/icon-pdf-icon';
import {
  Box,
  Button,
  Flex,
  InputLabel,
  Modal,
  Radio,
  Select,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

const reportTypeOptions = [
  {
    value: 'Currency Transaction Report - CTR',
    label: 'Currency Transaction Report - CTR',
  },
  {
    value: 'Suspicious Transaction Report - STR',
    label: 'Suspicious Transaction Report - STR',
  },
];

const FibonacciDownloadReport = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleClose = () => {
    form.reset();
    close();
  };
  const { mutate, isPending } = useGenerateTransactionReport(handleClose);

  const form = useForm({
    validate: yupResolver(fibonacciDownloadReportSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const data = {
      reportType: values.reportType,
      documentType: values.documentType,
      data: {
        startDate: values.startDate,
        endDate: values.endDate,
      },
    };
    mutate(data);
  };

  return (
    <>
      <Flex className="items-center gap-x-1">
        <UnstyledButton onClick={open} className="flex items-center gap-x-1">
          <IconArchiveBox />
          <Text>Download Report</Text>
        </UnstyledButton>
        <Tooltip label="Download the latest report">
          <UnstyledButton>
            <IconInfo />
          </UnstyledButton>
        </Tooltip>
      </Flex>

      <Modal
        opened={opened}
        onClose={handleClose}
        title="Generate and Download Report"
        size="sm"
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          <Select
            key={form.key('reportType')}
            size="xs"
            mb="md"
            classNames={{
              input: 'rounded-[6px]',
              label: 'font-[13px] text-gray-600 leading-4',
              error: '!mt-1 h-0 !p-0',
              root: 'space-y-0',
            }}
            label="Report Type"
            placeholder="Select report type"
            rightSection={<IconDropDown className="w-3" />}
            data={reportTypeOptions}
            {...form.getInputProps('reportType')}
          />
          <Box>
            <InputLabel className="font-twk font-[13px] leading-4 text-gray-600">
              Date Range
            </InputLabel>
            <Box className="relative">
              <Flex className="items-center justify-between gap-x-2.5">
                <DatePickerInput
                  mb="xs"
                  classNames={{ input: 'rounded-[6px]', error: 'hidden' }}
                  leftSection={<IconDate />}
                  placeholder="MM-DD-YY"
                  maxDate={new Date()}
                  w="100%"
                  key={form.key('startDate')}
                  {...form.getInputProps('startDate')}
                />
                <Text className="font-twk text-[14px] leading-[18px]">-</Text>
                <DatePickerInput
                  mb="xs"
                  classNames={{ input: 'rounded-[6px]', error: 'hidden' }}
                  leftSection={<IconDate />}
                  placeholder="MM-DD-YY"
                  maxDate={new Date()}
                  w="100%"
                  key={form.key('endDate')}
                  {...form.getInputProps('endDate')}
                />
              </Flex>
              {/* Error Messages - Positioned Below to Avoid Layout Shift */}
              {form.errors.startDate && (
                <Text
                  size="sm"
                  className="absolute -bottom-1 left-0 text-[10px] text-error-800"
                >
                  {form.errors.startDate}
                </Text>
              )}
              {form.errors.endDate && (
                <Text
                  size="sm"
                  className="absolute -bottom-1 right-0 text-[10px] text-error-800"
                >
                  {form.errors.endDate}
                </Text>
              )}
            </Box>
          </Box>

          <Box>
            <Radio.Group
              label="Report Format"
              classNames={{
                label: 'font-[13px] text-gray-600 leading-4 mb-[6px]',
                error: '!mt-1 h-0 !p-0',
              }}
              {...form.getInputProps('documentType')}
            >
              <Flex className="gap-2.5">
                <Radio.Card
                  value="pdf"
                  className="w-fit p-2 shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)] transition ease-in data-[checked]:bg-green-50"
                >
                  <Flex className="items-center gap-x-1">
                    <IconPdfIcon />
                    <Flex className="items-center gap-x-3">
                      <Text className="text-[14px] font-normal leading-[18px] text-gray-500">
                        PDF
                      </Text>
                      <Radio.Indicator />
                    </Flex>
                  </Flex>
                </Radio.Card>
                <Radio.Card
                  value="csv"
                  className="w-fit p-2 shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)] transition ease-in data-[checked]:bg-green-50"
                >
                  <Flex className="items-center gap-x-1">
                    <IconCsvIcon />
                    <Flex className="items-center gap-x-3">
                      <Text className="text-[14px] font-normal leading-[18px] text-gray-500">
                        CSV
                      </Text>
                      <Radio.Indicator />
                    </Flex>
                  </Flex>
                </Radio.Card>
              </Flex>
            </Radio.Group>
          </Box>
          <Flex className="items-center justify-between pt-[18px]">
            <Button type="button" variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button loading={isPending} type="submit">
              Download Report
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default FibonacciDownloadReport;
