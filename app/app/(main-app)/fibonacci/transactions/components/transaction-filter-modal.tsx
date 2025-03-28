import { useGetTeamMember } from '@/hooks/query/team';
import {
  QueryParams,
  useGetTransactionIssuers,
} from '@/hooks/query/transaction';
import { IconClose } from '@/public/assets/svg/icon-close';
import { IconDate } from '@/public/assets/svg/icon-date';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Drawer,
  Flex,
  Group,
  Loader,
  MultiSelect,
  MultiSelectProps,
  Select,
  Text,
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import React, { useMemo, useState } from 'react';
import { riskLevelOptions } from './extras';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  updateQuery?: <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
  ) => void;
  id?: string;
}

// Removed the import for updateQuery as it's no longer needed

const TransactionFilterModal: React.FC<Props> = ({
  isVisible,
  onClose,
  id,
  // Add other query parameters as needed
}) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('');

  const { issuers, isLoading: isLoadingIssuers } =
    useGetTransactionIssuers(isVisible);
  const { teamMembers, isLoading: isLoadingTeamMembers } = useGetTeamMember({
    assigned: 1,
    isEnabled: isVisible,
  });

  const issuersList = useMemo(
    () =>
      issuers?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    [issuers]
  );

  const teamMemberList = useMemo(() => {
    if (!teamMembers) return [];

    return teamMembers
      .map((member) => ({
        value: member._id as string,
        label:
          member._id === id ? 'Me' : `${member.firstName} ${member.lastName}`,
      }))
      .sort((a, b) => (a.value === id ? -1 : b.value === id ? 1 : 0));
  }, [teamMembers, id]);

  const handleDateChange = (dates: DatesRangeValue) => {
    setDateRange(dates);
  };

  const handleRiskLevelChange = (value: string | null) => {
    setSelectedRiskLevel(value || '');
  };

  const handleAssigneeChange = (value: string | null) => {
    setSelectedAssignee(value || '');
  };

  const handleIssuerChange = (values: string[]) => {
    setSelectedIssuers(values);
  };

  const applyFilters = () => {
    // Logic to apply filters internally, e.g., updating local state or triggering a stable callback
    // Since `updateQuery` is removed, handle the query updates here
    // This could involve updating a global state, context, or using a stable callback passed as a prop
    onClose();
  };

  const clearFilters = () => {
    setDateRange([null, null]);
    setSelectedIssuers([]);
    setSelectedAssignee('');
    setSelectedRiskLevel('');
    // Logic to clear filters internally
    onClose();
  };

  const renderIssuerOption: MultiSelectProps['renderOption'] = ({ option }) => {
    const isSelected = selectedIssuers.includes(option.value);
    return (
      <Group gap="sm">
        <Checkbox checked={isSelected} readOnly />
        <Text size="sm" className="capitalize">
          {option.label}
        </Text>
      </Group>
    );
  };

  return (
    <Drawer
      offset={8}
      radius="md"
      classNames={{ body: '!p-0' }}
      position="right"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      opened={isVisible}
      shadow="xs"
      onClose={onClose}
    >
      <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
        <Text className="filter-modal-header">Filter transactions</Text>
        <ActionIcon variant="white" onClick={onClose}>
          <IconClose />
        </ActionIcon>
      </Flex>

      <Box className="h-[calc(100vh-140px)] flex-1 overflow-y-scroll px-4 pt-8">
        <DatePickerInput
          mb="md"
          classNames={{ input: 'rounded-[4px]' }}
          label="Date range"
          leftSection={<IconDate />}
          type="range"
          placeholder="Pick dates"
          value={dateRange}
          onChange={handleDateChange}
          allowSingleDateInRange
          maxDate={new Date()}
        />

        <Select
          size="md"
          mb="md"
          classNames={{ input: 'rounded-[8px]' }}
          value={selectedRiskLevel}
          rightSection={<IconDropDown className="w-3" />}
          label="Risk level"
          placeholder="Select risk level"
          data={riskLevelOptions}
          onChange={handleRiskLevelChange}
        />

        <Select
          size="md"
          mb="md"
          classNames={{ input: 'rounded-[8px]' }}
          rightSection={
            isLoadingTeamMembers ? (
              <Loader size="xs" />
            ) : (
              <IconDropDown className="w-3" />
            )
          }
          label="Assignee"
          placeholder="Select assignee"
          data={teamMemberList}
          value={selectedAssignee || null}
          onChange={handleAssigneeChange}
        />

        <MultiSelect
          mb="2.5rem"
          value={selectedIssuers}
          data={issuersList}
          label="Issuer"
          renderOption={renderIssuerOption}
          placeholder="Select up to 3 issuers"
          clearable
          rightSection={
            isLoadingIssuers ? (
              <Loader size="xs" />
            ) : (
              <IconDropDown className="w-3" />
            )
          }
          onChange={handleIssuerChange}
          searchable
          nothingFoundMessage="No issuer available"
          maxValues={3}
        />
      </Box>

      <Flex className="dashboard-border h-[68px] items-center justify-between border-x-0 border-b-0 px-4">
        <Button onClick={clearFilters} variant="default">
          Clear filters
        </Button>
        <Button onClick={applyFilters}>Apply filters</Button>
      </Flex>
    </Drawer>
  );
};

export default TransactionFilterModal;
