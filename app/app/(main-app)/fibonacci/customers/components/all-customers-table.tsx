import CustomerActionComponent from '@/components/modal/customer-action-component';
import TableHeaderText from '@/components/other/table-header-text';
import TableItem from '@/components/other/table-item';
import { env } from '@/env';
import { routes } from '@/lib/routes';
import { CustomersListModel } from '@/types/general';
import { Box, Table } from '@mantine/core';
import { format } from 'date-fns';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  pageHeader?: string;
  customersList?: CustomersListModel[];
  redirect?: string;
};

const allCustomersTableHeading = [
  'Customer ID',
  'Date of Creation',
  'No. of Transaction',
  '',
];

const AllCustomersTable = ({ customersList, redirect, pageHeader }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const header = pageHeader || '';

  const getRedirect = () => {
    if (redirect) {
      return redirect;
    }
    const params = new URLSearchParams(searchParams);
    params.set('h', header);
    return `${pathname}?${params.toString()}`;
  };

  const handleNavigation = (customerId: string) => {
    if (!env.NEXT_PUBLIC_CUSTOMER_DETAILS_PAGE_ENABLED) return;
    router.push(
      `${routes.fibonacci.customersDetail}/${customerId}?redirect=${getRedirect()}`
    );
  };
  const rows = customersList?.map((customer) => (
    <Table.Tr
      className="cursor-pointer"
      onClick={() => handleNavigation(customer?._id)}
      key={customer?._id}
    >
      <TableItem text={customer?.user_id || '_'} />
      <TableItem text={format(`${customer?.createdAt}`, 'MMM dd, yyyy')} />
      <TableItem text={customer?.transactionCount} />
      <TableItem>
        <CustomerActionComponent
          customerId={customer?._id}
          isWatchlisted={customer?.addedToWatchlist}
          isBlacklisted={customer?.addedToBlacklist}
        />
      </TableItem>
    </Table.Tr>
  ));

  if (customersList && customersList?.length > 0)
    return (
      <Box className="relative">
        <Table
          className="!m-0"
          horizontalSpacing="sm"
          highlightOnHover
          verticalSpacing="xs"
        >
          <Table.Thead bg={'#F8FAFC'} className="sticky top-0 z-10">
            <Table.Tr>
              {allCustomersTableHeading?.map((heading, index) => (
                <TableHeaderText
                  key={`allCustomersTableHeading-${index}`}
                  text={heading}
                />
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    );
};

export default AllCustomersTable;
