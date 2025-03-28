'use client';

import { useUiStore } from '@/app/store/ui.store';
import { useGetCustomerDetails } from '@/hooks/query/fibonacci-customers';
import { routes } from '@/lib/routes';
import { CustomerDetailsResponse } from '@/types/general';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';
import PageContent from './page-content';

export const CustomerDetailsTabType = {
  Details: 'details',
  Transactions: 'transactions',
  Sanctions: 'sanctions',
};

const customerDetailsTabs = Object.values(CustomerDetailsTabType);

export type CustomerDetailsTabsType =
  (typeof CustomerDetailsTabType)[keyof typeof CustomerDetailsTabType];

const CUSTOMER_TAB_TYPES = Object.values(CustomerDetailsTabType);
const isValidCustomerDetailsTab = (tabParam: CustomerDetailsTabsType) =>
  CUSTOMER_TAB_TYPES.includes(tabParam);

const PageClient = () => {
  const router = useRouter();
  const { setPage } = useUiStore();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  const redirect = searchParams.get('redirect');
  const detailTab = searchParams.get('detailTab');
  const params = useParams();
  const activeTab = isValidCustomerDetailsTab(
    detailTab as CustomerDetailsTabsType
  )
    ? (detailTab as CustomerDetailsTabsType)
    : CustomerDetailsTabType.Details;

  const { customerDetail, isLoading } = useGetCustomerDetails({
    id: params?.slug as string,
  });
  const getRedirectUrl = () => {
    if (redirect) {
      return redirect.replace('?redirect=', '');
    }
    return '';
  };

  useEffect(() => {
    setPage({
      previousText: 'Customers',
      previousRouter: getRedirectUrl() || routes.fibonacci.customers,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    newParams.set('detailTab', activeTab);
    router.push(`?${newParams.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent
      customerDetail={customerDetail as CustomerDetailsResponse}
      {...{ activeTab, newParams, isLoading, customerDetailsTabs }}
    />
  );
};

export default PageClient;
