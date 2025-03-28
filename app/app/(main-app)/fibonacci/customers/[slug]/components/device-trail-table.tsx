import { Box, Table, TextInput } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import { useGetCustomerDeviceTrailDetails } from '@/hooks/query/fibonacci-customers';
import TableItem from '@/components/other/table-item';
import { formatTransactionDate } from '@/lib/helper';
import { IconSearch } from '@/public/assets/svg/icon-search-icon';
import TableHeaderText from '@/components/other/table-header-text';
import DataNotFound from '@/components/other/DataNotFound';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { ActionModal } from '@/components/modal/action-modal';

interface DeviceTrailTableProps {
  customerId: string;
  startDate?: string;
  endDate?: string;
}

export const DeviceTrailTable: FC<DeviceTrailTableProps> = ({
  customerId,
  startDate,
  endDate,
}) => {
  const [showDelete, setShowDelete] = useState(false);

  const { customerDeviceTrail, isLoading, updateQuery } =
    useGetCustomerDeviceTrailDetails({
      id: customerId,
      startDate: startDate || '',
      endDate: endDate || '',
      search: '',
    });

  const rows = (customerDeviceTrail?.data || []).map((device) => (
    <Table.Tr className="cursor-pointer" key={device.deviceId}>
      <TableItem text={device.manufacturer || '_'} />
      <TableItem text={device.model || '_'} />
      <TableItem text={device.osName || '_'} />
      <TableItem
        text={device.isDeviceBlacklisted ? 'Blacklisted' : 'Not Blacklisted'}
      />
      <TableItem text={formatTransactionDate(device.lastDateRecorded) || '_'} />

      <TableItem text={formatTransactionDate(device.lastDateRecorded) || '_'} />
    </Table.Tr>
  ));

  useEffect(() => {
    if (startDate || endDate) {
      updateQuery('startDate', startDate);
      updateQuery('endDate', endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const handleSearch = useDebouncedCallback((search: string) => {
    updateQuery('search', search);
  }, 500);

  return (
    <Box className="grid w-full rounded-lg border border-gray-200 bg-white">
      <div className="flex w-full items-end justify-between rounded-t-lg border-b border-gray-200 p-4">
        <div className="grid gap-2">
          <h2 className="text-[16px] font-semibold">Device Trail</h2>
          <TextInput
            placeholder="Search by device, OS"
            onChange={(event) => handleSearch(event.target.value)}
            className="w-full sm:w-[280px]"
            classNames={{
              input: '!rounded-[4px] border-gray-200 placeholder:text-gray-500',
            }}
            leftSection={<IconSearch />}
            size="xs"
          />
        </div>
      </div>

      <Box className="overflow-clip">
        {!isLoading && (
          <Table
            className="!m-0"
            horizontalSpacing="sm"
            highlightOnHover
            verticalSpacing="xs"
          >
            <Table.Thead bg={'#F8FAFC'}>
              <Table.Tr>
                <TableHeaderText text="Device Manufacturer" />
                <TableHeaderText text="Device Model" />
                <TableHeaderText text="OS" />

                <>
                  <TableHeaderText text="Blacklist Status" />
                  <TableHeaderText text="Device Registered on Account" />
                  <TableHeaderText text="Last date on device" />
                </>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}

        {!isLoading && !customerDeviceTrail?.data?.length && (
          <DataNotFound message="No data found" />
        )}

        {isLoading && <TableSkeleton col={6} row={4} />}

        <ActionModal
          isProcessing={isLoading}
          message="Removing a user from blacklist means the user can now complete transactions, anywhere and anytime"
          title="Are you sure you want to remove user from blacklist"
          onSubmit={() => {}}
          onClose={() => {
            setShowDelete(false);
          }}
          isVisible={showDelete}
        />
      </Box>
    </Box>
  );
};
