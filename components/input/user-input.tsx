import { GetTeamMembersQueryParams } from '@/hooks/query/team';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { IconSearch } from '@/public/assets/svg/icon-search-icon';
import { TeamMemberModel } from '@/types/general';
import {
  Avatar,
  Box,
  Combobox,
  Flex,
  Input,
  InputBase,
  Loader,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { upperFirst, useDebouncedValue } from '@mantine/hooks';

import { ReactNode, useEffect, useState } from 'react';

interface Props {
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  data: TeamMemberModel[];
  error?: string | null | undefined | ReactNode;
  mb?: string;
  updateQuery?: <K extends keyof GetTeamMembersQueryParams>(
    field: K,
    value: GetTeamMembersQueryParams[K]
  ) => void;
  isLoadingMembers?: boolean;
}

export const UserInput: React.FC<Props> = ({
  error,
  mb,
  label,
  placeholder,
  disabled,
  onChange,
  data,
  isLoadingMembers,
  updateQuery,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [queryText, setQueryText] = useState('');
  const [debounced] = useDebouncedValue(queryText, 500);
  const [selectedUser, setSelectedUser] = useState<TeamMemberModel>({});

  useEffect(() => {
    updateQuery?.('search', debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const options = data?.map((item) => (
    <Combobox.Option mb={'xs'} value={item._id || ''} key={item._id}>
      <Flex className="items-center gap-2">
        <Avatar size={32}>
          <Text className="text-[12px] font-semibold text-[#000]">
            {upperFirst(item?.firstName?.slice(0, 1) || '')}
            {upperFirst(item?.lastName?.slice(0, 1) || '')}
          </Text>
        </Avatar>
        <Box>
          <Text className="text-[12px] font-medium">
            {upperFirst(item?.firstName || '')}{' '}
            {upperFirst(item?.lastName || '')}
          </Text>
          <Text className="text-[12px] font-normal text-[#475569]">
            {item?.email || ''}
          </Text>
        </Box>
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Box mb={mb || 'md'}>
      <Combobox
        disabled={disabled}
        store={combobox}
        onOptionSubmit={(value) => {
          const filUser = data.find((obj) => obj._id === value);

          onChange?.(filUser?._id as string);
          setSelectedUser(filUser!);

          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            error={error}
            mb={'md'}
            label={label}
            component="button"
            type="button"
            pointer
            rightSection={
              <IconDropDown
                style={{
                  transform: 'scale(0.8)',
                }}
              />
            }
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {selectedUser._id ? (
              <Flex className="items-center gap-2">
                <Avatar size={30}>
                  <Text className="text-[12px] font-semibold text-[#000]">
                    {upperFirst(selectedUser?.firstName?.slice(0, 1) || '')}
                    {upperFirst(selectedUser?.lastName?.slice(0, 1) || '')}
                  </Text>
                </Avatar>
                <Box>
                  <Text className="text-[12px] font-medium">
                    {upperFirst(selectedUser?.firstName || '')}{' '}
                    {upperFirst(selectedUser?.lastName || '')}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Input.Placeholder>{placeholder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <TextInput
            size="'xs"
            value={queryText}
            classNames={{
              label: '!text-gray-800 !text-[12px] !font-[400]',
            }}
            leftSection={<IconSearch fill="red" />}
            placeholder="Search by user"
            onChange={(e) => {
              setQueryText(e.target.value.trim());
            }}
          />
          <Combobox.Options
            mah={'150px'}
            style={{
              overflow: 'scroll',
            }}
          >
            <>
              {isLoadingMembers ? (
                <Box className="flex h-20 w-full items-center justify-center">
                  <Loader />
                </Box>
              ) : (
                options
              )}
            </>
          </Combobox.Options>
          {!isLoadingMembers && data?.length === 0 && (
            <Text c={'gray'} size="xs" m={'sm'}>
              No User found
            </Text>
          )}
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
};
