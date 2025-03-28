import { CustomersListQueryParams } from '@/hooks/query/fibonacci-customers';
import { IconClose } from '@/public/assets/svg/icon-close';
import { IconDate } from '@/public/assets/svg/icon-date';
import { ActionIcon, Box, Button, Drawer, Flex, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { format } from 'date-fns';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  updateQuery?: <K extends keyof CustomersListQueryParams>(
    field: K,
    value: CustomersListQueryParams[K]
  ) => void;
};

const initialValues = {
  dateRange: [],
};

const CustomerFilterModal = ({ isVisible, onClose, updateQuery }: Props) => {
  const form = useForm({
    initialValues,
  });

  const handleSubmit = (values: typeof form.values) => {
    if (values?.dateRange[0] && values?.dateRange[1]) {
      updateQuery?.(
        'startDate',
        format(`${values?.dateRange[0]}`, 'yyyy-MM-dd')
      );
      updateQuery?.('endDate', format(`${values?.dateRange[1]}`, 'yyyy-MM-dd'));
    } else {
      updateQuery?.('startDate', '');
      updateQuery?.('endDate', '');
    }
    onClose();
  };

  const handleClearFilter = () => {
    form.reset();
    updateQuery?.('startDate', '');
    updateQuery?.('endDate', '');
    onClose();
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
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex min-h-[calc(100vh_-_20px)] flex-col"
      >
        <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
          <Text className="filter-modal-header leading-6 text-[#1A1A25]">
            Filter
          </Text>

          <ActionIcon variant="white" onClick={onClose}>
            <IconClose />
          </ActionIcon>
        </Flex>

        <Box className="flex-1 p-6">
          <DatePickerInput
            {...form.getInputProps('dateRange')}
            mb={'md'}
            classNames={{
              input: 'rounded-[4px]',
            }}
            label={'Date range'}
            leftSection={<IconDate />}
            type="range"
            placeholder="Select date range"
            allowSingleDateInRange
            clearable
            maxDate={new Date()}
          />
        </Box>

        <Flex className="dashboard-border h-[68px] items-center justify-between !border-x-0 !border-b-0 px-4">
          {form.isDirty() ? (
            <Button type="button" onClick={handleClearFilter} variant="default">
              Clear filters
            </Button>
          ) : null}
          <Button
            type="submit"
            disabled={!form.isDirty()}
            className="ml-auto disabled:cursor-not-allowed disabled:bg-p1 disabled:text-palegreen"
          >
            Apply filters
          </Button>
        </Flex>
      </form>
    </Drawer>
  );
};

export default CustomerFilterModal;
