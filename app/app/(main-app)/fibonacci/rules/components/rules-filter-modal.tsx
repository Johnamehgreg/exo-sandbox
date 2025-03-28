import { useRuleFilter } from '@/hooks/logic/use-rules-filter';
import { RuleQueryParams } from '@/hooks/query/rules';
import { IconClose } from '@/public/assets/svg/icon-close';
import { IconDate } from '@/public/assets/svg/icon-date';
import { ActionIcon, Box, Button, Drawer, Flex, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  updateQuery?: <K extends keyof RuleQueryParams>(
    field: K,
    value: RuleQueryParams[K]
  ) => void;
};

const RulesFilterModal = ({ isVisible, onClose, updateQuery }: Props) => {
  const {date, handleDate, onApplyFilter, onClearFilter} = useRuleFilter({onClose, updateQuery})
  return (
    <>
     <Drawer
      offset={8}
      radius="md"
      classNames={{
        body: "!p-0 ",
      }}
      position="right"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      opened={isVisible}
      shadow="xs"
      onClose={onClose}
    >
   <Flex className="h-[56px] items-center dashboard-border border-x-0 border-t justify-between px-4">
        <Text className="filter-modal-header">Filter rules</Text>
        <ActionIcon variant="white" onClick={() => onClose()}>
          <IconClose />
        </ActionIcon>
      </Flex>
      <Box className="px-4 flex-1 pt-8 overflow-y-scroll  h-[calc(100vh-140px)] ">
        <DatePickerInput
          mb={"md"}
          classNames={{
            input: "rounded-[4px]",
          }}
          label={"Date range"}
          leftSection={<IconDate />}
          type="range"
          placeholder="Pick dates"
          value={date}
          onChange={handleDate}
          allowSingleDateInRange
        />
      </Box>
      <Flex className="h-[68px] items-center dashboard-border !border-x-0 !border-b-0 justify-between px-4">
        <Button onClick={onClearFilter} variant="default">
          Clear filters
        </Button>
        <Button onClick={onApplyFilter}>Apply filters</Button>
      </Flex>
    </Drawer>
   
    </>
  );
};

export default RulesFilterModal;
