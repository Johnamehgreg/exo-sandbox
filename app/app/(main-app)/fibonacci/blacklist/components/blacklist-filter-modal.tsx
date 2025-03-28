import { IconClose } from '@/public/assets/svg/icon-close';
import { IconDate } from '@/public/assets/svg/icon-date';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Select,
  Text,
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { useState } from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const BlackListFilterModal: React.FC<Props> = ({
  isVisible,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);
  const [date, setDate] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);

  const handleDate = (dates: DatesRangeValue) => {
    setDate(dates);
    if (dates[0] !== null && dates[1] !== null) {
      setSelectedDate(dates);
      return;
    } else if (dates[0] === null && dates[1] === null) {
      setDate(selectedDate);
    }
  };
  return (
    <Drawer
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
      onClose={onClose}
    >
      <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
        <Text className="filter-modal-header">Filter blacklist</Text>

        <ActionIcon variant="white" onClick={() => onClose()}>
          <IconClose />
        </ActionIcon>
      </Flex>
      <Box className="h-[calc(100vh-140px)] flex-1 overflow-y-scroll px-4 pt-8">
        <DatePickerInput
          mb={'md'}
          classNames={{
            input: 'rounded-[4px]',
          }}
          label={'Date range'}
          leftSection={<IconDate />}
          type="range"
          placeholder="Pick dates"
          value={date}
          onChange={handleDate}
          allowSingleDateInRange
        />
        <Select
          size="md"
          classNames={{
            input: 'rounded-[8px]',
          }}
          mb={'md'}
          rightSection={<IconDropDown className="w-3" />}
          label="Type"
          placeholder="Account type "
          data={[
            { value: 'Fraud analyst', label: 'Fraud analyst' },
            { value: 'Reviewer', label: 'Reviewer' },
            { value: 'Compliance', label: 'Compliance' },
            { value: 'Admin', label: 'Admin' },
          ]}
        />
        <Select
          size="md"
          mb={'md'}
          classNames={{
            input: 'rounded-[8px]',
          }}
          rightSection={<IconDropDown className="w-3" />}
          label="State"
          placeholder="Select State  "
          data={[
            { value: 'Fraud analyst', label: 'Fraud analyst' },
            { value: 'Reviewer', label: 'Reviewer' },
            { value: 'Compliance', label: 'Compliance' },
            { value: 'Admin', label: 'Admin' },
          ]}
        />
      </Box>
      <Flex className="dashboard-border h-[68px] items-center justify-between !border-x-0 !border-b-0 px-4">
        <Button variant="default">Clear filters</Button>
        <Button>Apply filters</Button>
      </Flex>
    </Drawer>
  );
};
