import { useGetSettingRole } from '@/hooks/query/fibonacci-s-role';
import { QueryParams } from '@/hooks/query/fibonacci-s-team';
import { IconClose } from '@/public/assets/svg/icon-close';
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
import { useEffect, useState } from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  updateQuery?: <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
  ) => void;
}

export const TeamFilterModal: React.FC<Props> = ({
  isVisible,
  onClose,
  updateQuery,
}) => {
  const [roleList, setRoleList] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const { roles } = useGetSettingRole();

  useEffect(() => {
    if (roles) {
      const newList = roles?.map((roleItem) => {
        return {
          label: roleItem.name || '',
          value: roleItem?._id || '',
        };
      });
      setRoleList(newList);
    }
  }, [roles]);

  const onApplyFilter = () => {
    updateQuery?.('role', selectedRoleId);
    onClose();
  };

  const onClearFilter = () => {
    updateQuery?.('role', '');
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
      <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
        <Text className="filter-modal-header">Filter transactions</Text>

        <ActionIcon variant="white" onClick={() => onClose()}>
          <IconClose />
        </ActionIcon>
      </Flex>
      <Box className="h-[calc(100vh-140px)] flex-1 overflow-y-scroll px-4 pt-8">
        <Select
          onChange={(e) => {
            setSelectedRoleId(e!);
          }}
          mb={'2rem'}
          classNames={{
            input: 'rounded-[8px] ',
          }}
          rightSection={<IconDropDown className="w-3" />}
          label="Role"
          placeholder="Select role  "
          data={roleList}
        />
      </Box>
      <Flex className="dashboard-border h-[68px] items-center justify-between !border-x-0 !border-b-0 px-4">
        <Button onClick={onClearFilter} variant="default">
          Clear filters
        </Button>
        <Button onClick={onApplyFilter}>Apply filters</Button>
      </Flex>
    </Drawer>
  );
};
