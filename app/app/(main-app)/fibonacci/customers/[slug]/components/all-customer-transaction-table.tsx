import { TransactionActionComponent } from '@/components/modal/transaction-action-component';
import TableHeaderText from '@/components/other/table-header-text';
import TableItem from '@/components/other/table-item';
import { formatDateAndTime, formattedAmount } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { TransactionModel } from '@/types/general';
import { Box, Table, Text } from '@mantine/core';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  pageHeader?: string;
  transactionList?: TransactionModel[];
};

const tableHeadings = [
  'Date',
  'Transaction ID',
  'Issuer',
  'Channel',
  'Amount',
  '',
];

const AllCustomerTransactionTable = ({
  pageHeader,
  transactionList,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const detailTab = searchParams.get('detailTab');
  const header = pageHeader || '';

  const getRedirect = () => {
    if (redirect) {
      return `${pathname}?detailTab=${detailTab}`;
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
      <TableItem
        text={formattedAmount(
          transaction?.transactionData?.amount,
          transaction?.transactionData?.currency
        )}
      />

      <TableItem>
        <TransactionActionComponent transactionId={transaction._id} />
      </TableItem>
    </Table.Tr>
  ));
  if ((transactionList || [])?.length > 0)
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

export default AllCustomerTransactionTable;
