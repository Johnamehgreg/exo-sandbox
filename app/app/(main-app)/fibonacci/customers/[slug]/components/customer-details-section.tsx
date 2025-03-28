import { DetailItem } from '@/components/transactions/detail-item';
import { useGetCustomerTransactionChart } from '@/hooks/query/fibonacci-customers';
import { CustomerDetailsResponse } from '@/types/general';
import { DDate } from '@/types/overview';
import { Box, SimpleGrid, Skeleton, Text } from '@mantine/core';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import CustomerFilterModal from './customer-details-filter-modal';
import CustomerTransactionCountChart from './customer-transaction-count-chart';
import CustomerTransactionFraudRiskChart from './customer-transaction-fraud-risk-chart';
import CustomerTransactionRelationshipChart from './customer-transaction-relationship-chart';
import CustomerTransactionVolumeChart from './customer-transaction-volume-chart';
import DateFilterButton from './date-filter-button';
import { DeviceTrailTable } from './device-trail-table';
import { LocationTrailTable } from './location-trail-table';

type DateRangeType = 'day' | 'week' | 'month';

type Props = {
  customerDetail: CustomerDetailsResponse;
  isLoading: boolean;
};

const getInitialDate = (): [Date, Date] => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return [oneMonthAgo, today];
};

const calculateDateDifference = (start: Date, end: Date): number => {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

const CustomerDetailsSection = ({ customerDetail, isLoading }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDate, setSelectedDate] =
    useState<[Date | null, Date | null]>(getInitialDate());
  const [date, setDate] =
    useState<[Date | null, Date | null]>(getInitialDate());
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('week');
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

  const {
    customerTransactionChartData,
    isLoading: transactionChartDataLoading,
    updateQuery,
    error,
  } = useGetCustomerTransactionChart({
    id: customerDetail?.user_id,
    startDate: selectedDate[0] ? format(selectedDate[0], 'yyyy-MM-dd') : '',
    endDate: selectedDate[1] ? format(selectedDate[1], 'yyyy-MM-dd') : '',
    period: dateRangeType,
  });
  const updateDateRangeType = (startDate: Date, endDate: Date) => {
    const daysDifference = calculateDateDifference(startDate, endDate);

    if (daysDifference < 7) {
      setDateRangeType('day');
    } else if (daysDifference < 30) {
      setDateRangeType('week');
    } else {
      setDateRangeType('month');
    }
  };

  const getDisabledOptions = (
    startDate: Date,
    endDate: Date
  ): DateRangeType[] => {
    const daysDifference = calculateDateDifference(startDate, endDate);

    if (daysDifference < 7) {
      return ['week', 'month'];
    } else if (daysDifference < 30) {
      return ['month'];
    }
    return [];
  };

  const handleDate = (dates: DDate) => {
    setDate(dates);
    if (dates[0] !== null && dates[1] !== null) {
      setSelectedDate(dates);
      setIsDropdownDisabled(false);
      updateDateRangeType(dates[0], dates[1]);
    } else if (dates[0] === null && dates[1] === null) {
      setDate(selectedDate);
    }
  };

  const handleDateRangeTypeChange = (value: string | null) => {
    if (value !== null) {
      setDateRangeType(value as DateRangeType);
    }
  };

  const handleClearFilters = () => {
    const initialDates = getInitialDate();
    setSelectedDate([initialDates[0], initialDates[1]]);
    setDate([initialDates[0], initialDates[1]]);
    setDateRangeType('week');
    setIsDropdownDisabled(true);
    updateQuery('startDate', format(initialDates[0] as Date, 'yyyy-MM-dd'));
    updateQuery('endDate', format(initialDates[1] as Date, 'yyyy-MM-dd'));
    updateQuery('period', 'week');
  };

  const handleFilterClose = (selectedDates?: DDate) => {
    if (selectedDates) {
      setSelectedDate(selectedDates);
      updateQuery('startDate', format(selectedDates[0] as Date, 'yyyy-MM-dd'));
      updateQuery('endDate', format(selectedDates[1] as Date, 'yyyy-MM-dd'));
      updateQuery('period', dateRangeType);
    }
    setShowFilter(false);
  };

  // Check for initial date changes
  useEffect(() => {
    if (
      date[0] &&
      date[1] &&
      (date[0].getTime() !== getInitialDate()[0].getTime() ||
        date[1].getTime() !== getInitialDate()[1].getTime())
    ) {
      setIsDropdownDisabled(false);
    }
  }, [date]);

  return (
    <div className="grid max-w-[1200px] gap-4">
      <Box className="dashboard-border rounded-lg border-border bg-white p-6">
        {isLoading ? (
          <SimpleGrid
            verticalSpacing={{ base: 'lg' }}
            cols={{ base: 2, md: 4 }}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={`skeleton-loader-${index}`} height={20} mb="sm" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid
            verticalSpacing={{
              base: 'lg',
            }}
            cols={{ base: 2, md: 4 }}
          >
            <DetailItem
              text={customerDetail?.user_id}
              title="Customer ID"
              type="text"
            />
            <DetailItem text={'_'} title="Email Address" type="text" />
            <DetailItem
              text={customerDetail?.age}
              title="Account Age"
              type="text"
            />
            <DetailItem
              text={customerDetail?.account_type}
              title="Account Type"
              type="text"
            />
            <DetailItem
              text={`${customerDetail?.city}, ${customerDetail?.state}`}
              title="Address"
              type="text"
            />
            <DetailItem
              text={customerDetail?.state}
              title="State"
              type="text"
            />
            <DetailItem
              text={customerDetail?.country}
              title="Country"
              type="text"
            />
            <DetailItem
              text={customerDetail?.is_id_verified ? 'Yes' : 'No'}
              title="Identity Verified "
              type={'text'}
            />
            <DetailItem
              text={customerDetail?.addedToBlacklist ? 'Yes' : 'No'}
              title="Blacklisted"
              type="text"
            />
            <DetailItem
              text={customerDetail?.addedToWatchlist ? 'Yes' : 'No'}
              title="Watchlisted"
              type="text"
            />
            <DetailItem text={null} title="Sanction Screening" type="text" />
            <DetailItem text={null} title="Pep Screening" type="text" />
          </SimpleGrid>
        )}
      </Box>

      <Box className="grid gap-4">
        <div className="flex w-full items-center justify-between">
          <Text className="text-[14px] font-semibold">Analytics</Text>

          <DateFilterButton
            selectedDate={selectedDate}
            onReset={handleClearFilters}
            onClick={() => setShowFilter(true)}
          />
          <CustomerFilterModal
            isVisible={showFilter}
            date={date}
            selectedDate={selectedDate}
            dateRangeType={dateRangeType}
            isDropdownDisabled={isDropdownDisabled}
            getDisabledOptions={getDisabledOptions}
            onDateChange={handleDate}
            onDateRangeTypeChange={handleDateRangeTypeChange}
            onClearFilter={handleClearFilters}
            onClose={handleFilterClose}
          />
        </div>

        <div className="grid w-full gap-4 rounded-lg bg-bg-light p-5">
          <DeviceTrailTable
            customerId={customerDetail?._id}
            startDate={
              selectedDate[0]
                ? format(selectedDate[0], 'yyyy-MM-dd')
                : date[0]
                  ? format(date[0], 'yyyy-MM-dd')
                  : ''
            }
            endDate={
              selectedDate[1]
                ? format(selectedDate[1], 'yyyy-MM-dd')
                : date[1]
                  ? format(date[1], 'yyyy-MM-dd')
                  : ''
            }
          />
          <LocationTrailTable
            customerId={customerDetail?._id}
            startDate={
              selectedDate[0]
                ? format(selectedDate[0], 'yyyy-MM-dd')
                : date[0]
                  ? format(date[0], 'yyyy-MM-dd')
                  : ''
            }
            endDate={
              selectedDate[1]
                ? format(selectedDate[1], 'yyyy-MM-dd')
                : date[1]
                  ? format(date[1], 'yyyy-MM-dd')
                  : ''
            }
          />
          <CustomerTransactionVolumeChart
            data={customerTransactionChartData?.transactionCountVolData || []}
            isLoading={transactionChartDataLoading}
            period={dateRangeType}
            error={error}
          />

          <CustomerTransactionFraudRiskChart
            data={customerTransactionChartData?.riskScoreChangeData || []}
            isLoading={transactionChartDataLoading}
            error={error}
          />
          <CustomerTransactionCountChart
            data={customerTransactionChartData?.transactionCountVolData || []}
            isLoading={transactionChartDataLoading}
            period={dateRangeType}
            error={error}
          />
          <CustomerTransactionRelationshipChart
            data={customerTransactionChartData?.networkGraphData}
            isLoading={transactionChartDataLoading}
            error={error}
          />
        </div>
      </Box>
    </div>
  );
};

export default CustomerDetailsSection;
