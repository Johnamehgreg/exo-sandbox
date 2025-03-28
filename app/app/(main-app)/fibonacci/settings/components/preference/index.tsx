import { TableSkeleton } from '@/components/ui/table-skeleton';
import useScreeningSettings from '@/hooks/query/use-screening-settings';
import { cn } from '@/lib/utils';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { ScreeningData } from '@/types/general';
import { ActionIcon, Box, Flex, Menu, Stack, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import SettingLayoutLoader from '../setting-layout-loader';
import AutomationControlModal from './automation-control-modal';
import EditFrequencyModal from './edit-frequency-modal';

const tableHeadings = [
  "Automated screenings",
  "status",
  "Frequency",
  "Action",
];

const getScreeningType = (type: string) => {
  return type === "sanction" ? "Sanction screenings" : "PEP/Adverse media screening"
}

const getScreeningStatus = (type: string) => {
  return type === "active" ? "Active" : "Disabled"
}

const statusStyles = {
  active: {
    backgroundColor: "#EEF7F2",
    color: "#177A48",
  },
  disabled: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
  },
}


const PreferencesSection = () => {
  const [openedEditFrequencyModal, { open: openEditFrequencyModal, close: closeEditFrequencyModal }] = useDisclosure(false);
  const [openedDisableAutomationModal, { open: openDisableAutomationModal, close: closeDisableAutomationModal }] = useDisclosure(false)
  const [screeningData, setScreeningData] = useState<ScreeningData | null>(null);
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'active':
        return statusStyles.active;
      case 'inactive':
        return statusStyles.disabled;
      default:
        return {};
    }
  };
  const { data, isLoading } = useScreeningSettings()


  const rows = data?.map(item => (
    <Table.Tr key={item?._id}>
      <Table.Td>
        <Text className="table-item-text table-item-padding">
          {getScreeningType(item?.type)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Flex
          className="h-[29px] w-[94px] items-center justify-center rounded"
          style={getBadgeStyle(item?.status?.toLowerCase())}
        >
          <Text className="text-sm font-normal capitalize leading-[21px]">
            {getScreeningStatus(item?.status)}
          </Text>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Text className="table-item-text table-item-padding capitalize">
          {item?.frequency}
        </Text>
      </Table.Td>
      <Table.Td>
        <Menu withArrow trigger="hover">
          <Menu.Target>
            <ActionIcon
              onClick={(e) => {
                e.stopPropagation();
              }}
              bg={'transparent'}
            >
              <IconVerticalStack fill="#98A2B3" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={(e) => {
                e.stopPropagation();
                setScreeningData({
                  frequency: item?.frequency,
                  status: item?.status,
                  id: item?._id,
                  newCustomerCheck: item?.newCustomerCheck
                });
                openEditFrequencyModal();
              }}
              className="min-w-[130px] text-[12px] font-normal"
            >
              Edit Frequency
            </Menu.Item>
            <Menu.Item
              onClick={(e) => {
                e.stopPropagation();
                setScreeningData({
                  frequency: item?.frequency,
                  status: item?.status,
                  id: item?._id,
                  newCustomerCheck: item?.newCustomerCheck
                });
                openDisableAutomationModal();
              }}
              className={cn("text-[12px] font-normal min-w-[130px]", {
                "text-green-600": item?.status === "inactive",
                "text-error-600": item?.status === "active",
              })}
            >
              {
                item?.status === "active" ? "Disable automation" : "Enable automation"
              }
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <SettingLayoutLoader
      isLoading={isLoading}
      loaderComponent={
        <Stack>
          <TableSkeleton row={3} col={4} />
        </Stack>
      }
    >
      {
        screeningData && <EditFrequencyModal
          {...{
            screeningData,
            opened: openedEditFrequencyModal,
            onClose: closeEditFrequencyModal
          }}
        />
      }
      {
        screeningData && <AutomationControlModal
          {...{
            screeningData,
            opened: openedDisableAutomationModal,
            onClose: closeDisableAutomationModal
          }}
        />
      }
      <Box className="dashboard-border table-container relative overflow-x-scroll">
        <Table
          className="!m-0"
          horizontalSpacing="sm"
          highlightOnHover
          verticalSpacing="xs"
        >
          <Table.Thead bg={'#F8FAFC'}>
            <Table.Tr>
              {tableHeadings?.map((heading, index) => (
                <Table.Th key={`table-headings-${index}`}>
                  <Text className="table-head-text table-head-padding capitalize">
                    {heading}
                  </Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </SettingLayoutLoader>
  );
};

export default PreferencesSection;
