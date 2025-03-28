import { formattedAmount } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { RulesAnalyticsTransactionsData } from '@/types/general';
import { Box, Flex, Table, Text } from '@mantine/core';
import { formatDate } from 'date-fns';
import { useRouter } from 'nextjs-toploader/app';

interface Props {
  transactionsData: RulesAnalyticsTransactionsData['data'];
}

const tableHeading = [
  'Date',
  'Transaction ID',
  'Issuer',
  'Type of Trs.',
  'Channel',
  'Status',
  'Amount',
];

const RulesAnalyticsTable = ({ transactionsData }: Props) => {
  const router = useRouter();
  const rows = transactionsData?.map((transaction) => (
    <Table.Tr
      key={transaction?._id}
      className="cursor-pointer"
      onClick={() => {
        router.push(
          `${routes.fibonacci.transactionDetail}/${transaction?.transactionId}`
        );
      }}
    >
      <Table.Td>
        {transaction?.createdAt ? (
          <Box className="font-twk">
            <Text className="text-[14px] leading-[21px] text-text">
              {formatDate(new Date(transaction?.createdAt), 'MMM dd, yyyy')}
            </Text>
            <Text className="text-sm leading-[18px] text-secondary">
              {formatDate(new Date(transaction?.createdAt), 'hh:mm a')}
            </Text>
          </Box>
        ) : (
          '-'
        )}
      </Table.Td>
      <Table.Td className="font-twk text-[14px] leading-[21px] text-text">
        {transaction?._id ?? '-'}
      </Table.Td>
      <Table.Td className="font-twk text-[14px] leading-[21px] text-text">
        {transaction?.issuer ?? 'NA'}
      </Table.Td>
      <Table.Td className="font-twk text-[14px] capitalize leading-[21px] text-text">
        {' '}
        {transaction?.type ?? '-'}
      </Table.Td>
      <Table.Td className="font-twk text-[14px] capitalize leading-[21px] text-text">
        {transaction?.channel ?? '-'}
      </Table.Td>
      <Table.Td>
        {transaction?.passedAt || transaction?.failedAt ? (
          <Flex
            className={cn(
              'h-[29px] w-[96px] items-center justify-center rounded bg-bg-danger-light',
              {
                'bg-success-light': transaction?.passedAt,
              }
            )}
          >
            <Text
              className={cn(
                'text-text-danger text-[14px] font-medium leading-[21px]',
                {
                  'text-text-success': transaction?.passedAt,
                }
              )}
            >
              {transaction?.passedAt ? 'Passed' : 'Failed'}
            </Text>
          </Flex>
        ) : (
          '-'
        )}
      </Table.Td>

      <Table.Td className="font-twk text-[14px] leading-[21px] text-text">
        <>
          {transaction?.amount && transaction?.currency ? (
            <>{formattedAmount(transaction?.amount, transaction?.currency)}</>
          ) : (
            '-'
          )}
        </>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="relative overflow-x-scroll">
      <Table
        className="!m-0"
        horizontalSpacing="sm"
        highlightOnHover
        verticalSpacing="xs"
        stickyHeader
      >
        <Table.Thead bg={'#F8FAFC'}>
          <Table.Tr>
            {tableHeading?.map((heading, index) => (
              <Table.Th key={`table-heading-${index}`}>{heading}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};

export default RulesAnalyticsTable;
