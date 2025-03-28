import { ActionModal } from '@/components/modal/action-modal';
import DataNotFound from '@/components/other/DataNotFound';
import TableHeaderText from '@/components/other/table-header-text';
import TableItem from '@/components/other/table-item';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useGetCustomerLocationTrailDetails } from '@/hooks/query/fibonacci-customers';
import { formatTransactionDate } from '@/lib/helper';
import { IconSearch } from '@/public/assets/svg/icon-search-icon';
import { Box, Table, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { FC, useEffect, useState } from 'react';

interface LocationTrailTableProps {
  customerId: string;
  startDate?: string;
  endDate?: string;
}

export const LocationTrailTable: FC<LocationTrailTableProps> = ({
  customerId,
  startDate,
  endDate,
}) => {
  const [showDelete, setShowDelete] = useState(false);

  const { customerLocationTrail, isLoading, updateQuery } =
    useGetCustomerLocationTrailDetails({
      id: customerId,
      startDate: startDate || '',
      endDate: endDate || '',
      search: '',
    });

  const rows = (customerLocationTrail?.data || [])?.map((location, index) => (
    <Table.Tr className="cursor-pointer" key={`customerLocationTrail-${index}`}>
      <TableItem text={location.country || '_'} />
      <TableItem text={location.state || '_'} />
      <TableItem text={location.city || '_'} />
      <TableItem
        text={formatTransactionDate(location.firstDateRecorded) || '_'}
      />
      <TableItem
        text={formatTransactionDate(location.lastDateRecorded) || '_'}
      />
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
          <h2 className="text-[16px] font-semibold">Location Trail</h2>
          <TextInput
            placeholder="Search by  Country, state"
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

      <Box className="overflow-x-auto">
        {!isLoading && (
          <Table
            className="!m-0"
            horizontalSpacing="sm"
            highlightOnHover
            verticalSpacing="xs"
          >
            <Table.Thead bg={'#F8FAFC'}>
              <Table.Tr>
                <TableHeaderText text={'Country'} />
                <TableHeaderText text={'State'} />
                <TableHeaderText text={'City'} />
                <TableHeaderText text={'First Date Recorded'} />
                <TableHeaderText text={'Last Date Recorded'} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}

        {!isLoading && !customerLocationTrail?.data?.length && (
          <DataNotFound message="No data found" />
        )}

        {isLoading && <TableSkeleton col={5} row={4} />}

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
