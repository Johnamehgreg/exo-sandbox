import { TableRiskCard } from '@/components/card/table-risk-card';
import { TableStatusCard } from '@/components/card/table-status-card';
import { TransactionActionComponent } from '@/components/modal/transaction-action-component';
import TableHeaderText from '@/components/other/table-header-text';
import TableItem from '@/components/other/table-item';
import { formatDateAndTime, formattedAmount } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { TransactionModel } from '@/types/general';
import { Avatar, Box, Flex, Table, Text } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

interface Props {
  pageHeader?: string;
  transactionList?: TransactionModel[];
  redirect?: string;
}

const tableHeadings = [
  'Date',
  'Transaction ID',
  'Issuer',
  'Channel',
  'Risk score',
  'Risk level',
  'Amount',
  'Assigned to',
  'Review',
  '',
];

export const AllTransactionTable: React.FC<Props> = ({
  redirect,
  pageHeader,
  transactionList,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const header = pageHeader || '';
  const searchParams = useSearchParams();

  const getRedirect = () => {
    if (redirect) {
      return redirect;
    }
    const params = new URLSearchParams(searchParams);
    params.set('h', header);
    return `${pathname}?${params.toString()}`;
  };

  const handleNavigation = (transactionId: string) =>
    router.push(
      `${routes.fibonacci.transactionDetail}/${transactionId}?redirect=${getRedirect()}`
    );

  const rows = transactionList?.map((transaction) => (
    <Table.Tr
      className="cursor-pointer"
      onClick={() => handleNavigation(transaction?._id)}
      key={transaction._id}
    >
      <TableItem>
        <Box>
          <Text className="table-item-text">
            {
              formatDateAndTime(transaction?.transactionData.transactionDate)
                .formattedDate
            }
          </Text>
          <Text className="table-item-text">
            {
              formatDateAndTime(transaction?.transactionData.transactionDate)
                .formattedTime
            }
          </Text>
        </Box>
      </TableItem>
      <TableItem text={transaction?._id} />
      <TableItem text={transaction?.transactionData?.issuer ?? 'N/A'} />
      <TableItem text={transaction?.transactionData?.channel} />
      <TableItem text={transaction?.insight?.riskScore?.toFixed(2)} />
      <TableItem>
        <TableRiskCard title={transaction?.insight?.riskBand || ''} />
      </TableItem>

      <TableItem
        text={formattedAmount(
          transaction?.transactionData?.amount,
          transaction?.transactionData?.currency
        )}
      />
      <TableItem
        text={
          transaction?.assignedTo?.firstName ? (
            <Flex className="items-center gap-3">
              <Avatar size={32}>
                <Text className="text-[14px] font-semibold text-[#000]">
                  {upperFirst(
                    transaction?.assignedTo?.firstName?.slice(0, 1) || ''
                  )}
                  {upperFirst(
                    transaction?.assignedTo?.lastName?.slice(0, 1) || ''
                  )}
                </Text>
              </Avatar>
              <Box>
                <Text className="black-list-table-item font-medium">
                  {upperFirst(transaction?.assignedTo?.firstName || '')}{' '}
                  {upperFirst(transaction?.assignedTo?.lastName || '')}
                </Text>
              </Box>
            </Flex>
          ) : (
            'Not assigned'
          )
        }
      />

      <TableItem
        text={
          transaction?.review ? (
            <TableStatusCard status={transaction?.review} />
          ) : (
            '-'
          )
        }
      />
      <TableItem>
        <TransactionActionComponent transactionId={transaction._id} />
      </TableItem>
    </Table.Tr>
  ));

  // if ((transactionList || [])?.length > 0)
  if (transactionList && transactionList?.length > 0)
    return (
      <Box className="overflow-x-scroll">
        <Table highlightOnHover>
          <Table.Thead bg={'#F8FAFC'}>
            <Table.Tr>
              {tableHeadings?.map((tableHeading, index) => (
                <TableHeaderText
                  key={`tableHeading-${index}`}
                  text={tableHeading}
                />
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    );
};
