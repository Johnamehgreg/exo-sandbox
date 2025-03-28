import { ActionIcon, Box, Button, Drawer, Flex, Text } from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { useState } from 'react';
import { format } from 'date-fns';
import { QueryParams } from '@/types/general';
import { IconDate } from '@/public/assets/svg/icon-date';
import { IconClose } from '@/public/assets/svg/icon-close';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  updateQuery?: <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
  ) => void;
};

const CustomerTransactionFilterDrawer = ({
  isVisible,
  onClose,
  updateQuery,
}: Props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleDateChange = (dates: DatesRangeValue) => {
    setDateRange(dates);
  };

  const handleApplyFilter = () => {
    if (dateRange[0] && dateRange[1]) {
      updateQuery?.('startDate', format(dateRange[0], 'yyyy-MM-dd'));
      updateQuery?.('endDate', format(dateRange[1], 'yyyy-MM-dd'));
    }

    onClose();
  };

  const handleClearFilter = () => {
    updateQuery?.('startDate', '');
    updateQuery?.('endDate', '');
    setDateRange([null, null]);
    onClose();
  };

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
      onClose={onClose}
    >
      <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
        <Text className="filter-modal-header">Filter transactions</Text>

        <ActionIcon variant="white" onClick={() => onClose()}>
          <IconClose />
        </ActionIcon>
      </Flex>
      <Box className="h-[calc(100vh-140px)] flex-1 overflow-y-scroll px-4 pt-8">
        <DatePickerInput
          mb={'md'}
          label={'Date range'}
          leftSection={<IconDate />}
          type="range"
          placeholder="Pick dates"
          value={dateRange}
          onChange={handleDateChange}
          allowSingleDateInRange
          maxDate={new Date()}
        />
      </Box>
      <Flex className="dashboard-border h-[68px] items-center justify-between !border-x-0 !border-b-0 px-4">
        <Button onClick={handleClearFilter} variant="default">
          Clear filters
        </Button>
        <Button onClick={handleApplyFilter}>Apply filters</Button>
      </Flex>
    </Drawer>
  );
};

export default CustomerTransactionFilterDrawer;
