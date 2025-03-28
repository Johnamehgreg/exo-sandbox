import { IconClose } from '@/public/assets/svg/icon-close';
import { IconDate } from '@/public/assets/svg/icon-date';
import { DDate } from '@/types/overview';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Select,
  Text,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import React from 'react';

type DateRangeType = 'day' | 'week' | 'month';

interface Props {
  isVisible: boolean;
  title?: string;
  date: DDate;
  selectedDate: DDate;
  dateRangeType: DateRangeType;
  isDropdownDisabled: boolean;
  getDisabledOptions: (startDate: Date, endDate: Date) => DateRangeType[];
  onDateChange: (date: DDate) => void;
  onDateRangeTypeChange: (value: string | null) => void;
  onClearFilter: () => void;
  onClose: (date?: DDate) => void;
}

const CustomerFilterModal: React.FC<Props> = ({
  isVisible,
  title,
  date,
  selectedDate,
  dateRangeType,
  isDropdownDisabled,
  getDisabledOptions,
  onDateChange,
  onDateRangeTypeChange,
  onClearFilter,
  onClose,
}) => {
  return (
    <Drawer
      onClick={(e) => {
        e.stopPropagation();
      }}
      offset={8}
      radius="md"
      classNames={{
        body: '!p-0 ',
      }}
      position="right"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      opened={isVisible}
      shadow="xs"
      onClose={() => onClose()}
    >
      <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
        <Text className="filter-modal-header">{title || 'Filter'}</Text>
        <ActionIcon variant="white" onClick={() => onClose()}>
          <IconClose />
        </ActionIcon>
      </Flex>
      <Box className="h-[calc(100vh-140px)] flex-1 overflow-y-scroll px-4 pt-8">
        <DatePickerInput
          mb="md"
          label="Date range"
          leftSection={<IconDate />}
          type="range"
          placeholder="Pick dates"
          value={date}
          onChange={onDateChange}
          allowSingleDateInRange
        />
        <Select
          label="Period"
          placeholder="Select range type"
          value={dateRangeType}
          onChange={onDateRangeTypeChange}
          data={[
            {
              value: 'day',
              label: 'Day',
              disabled:
                date[0] && date[1]
                  ? getDisabledOptions(date[0], date[1]).includes('day')
                  : false,
            },
            {
              value: 'week',
              label: 'Week',
              disabled:
                date[0] && date[1]
                  ? getDisabledOptions(date[0], date[1]).includes('week')
                  : false,
            },
            {
              value: 'month',
              label: 'Month',
              disabled:
                date[0] && date[1]
                  ? getDisabledOptions(date[0], date[1]).includes('month')
                  : false,
            },
          ]}
          disabled={isDropdownDisabled}
        />
      </Box>
      <Flex className="dashboard-border h-[68px] items-center justify-end gap-4 !border-x-0 !border-b-0 px-4">
        <Button
          variant="outline"
          className="border-vibrant-green !text-vibrant-green"
          onClick={onClearFilter}
        >
          Clear Filters
        </Button>
        <Button onClick={() => onClose(selectedDate)}>Apply filters</Button>
      </Flex>
    </Drawer>
  );
};

export default CustomerFilterModal;
