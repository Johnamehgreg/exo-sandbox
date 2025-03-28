import { useScreeningResultsById } from '@/hooks/query/use-screening-results';
import { IconClose } from '@/public/assets/svg/icon-close';
import {
  ActionIcon,
  Box,
  Drawer,
  Flex,
  ScrollArea,
  Skeleton,
  Text,
} from '@mantine/core';
import { formatDate } from 'date-fns';
import { useParams } from 'next/navigation';

interface Props {
  opened: boolean;
  close: VoidFunction;
  resultID: string;
}

interface SanctionDrawerItemProps {
  title: string;
  value?: string;
  status?: string;
}

const SanctionDrawerItem = ({
  title,
  value,
  status,
}: SanctionDrawerItemProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Match':
        return 'text-success';
      case 'Slight Mismatch':
        return 'text-[#EA580C]';
      case 'No Data':
        return 'text-[#C2410B]';
      default:
        return 'text-success';
    }
  };

  return (
    <Flex className="items-center justify-between">
      <Text className="font-helveticaNeue text-sm font-normal leading-[14px] text-gray-600">
        {title}
      </Text>
      <Flex className="items-center gap-x-3">
        <Text className="font-helveticaNeue text-sm font-normal capitalize leading-[14px] text-gray-800">
          {value}
        </Text>
        {status && (
          <Text
            className={`rounded bg-white px-2 py-[2px] text-[10px] font-normal leading-[15px] ${getStatusColor()}`}
          >
            {status}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

const SanctionDrawer = ({ opened, close, resultID }: Props) => {
  const { slug } = useParams();

  const { data, isLoading } = useScreeningResultsById(slug as string, resultID);
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      offset={8}
      radius={8}
      shadow="xs"
      withCloseButton={false}
      classNames={{
        body: '!p-0 ',
      }}
    >
      <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-6">
        <Text className="filter-modal-header font-medium leading-6 text-gray-950">
          Details
        </Text>
        <ActionIcon variant="white" onClick={close}>
          <IconClose />
        </ActionIcon>
      </Flex>
      {isLoading ? (
        <Box className="space-y-4 px-6 pt-6">
          <Skeleton animate height={200} />
          <Skeleton animate height={200} />
          <Skeleton animate height={200} />
        </Box>
      ) : (
        <ScrollArea h={'calc(100vh - 140px)'} className="overflow-y-scroll">
          <Box className="space-y-4 px-6 pt-6">
            <Box className="space-y-6 rounded-[10px] bg-gray-100 p-6">
              <SanctionDrawerItem title="Ttpe" value="Person" />
              <SanctionDrawerItem
                title="Name"
                value={`${data?.firstName?.toLowerCase()} ${data?.lastName?.toLowerCase()}`}
              />
              <SanctionDrawerItem
                title="Other Names"
                value={data?.details?.otherNames || 'N/A'}
              />

              <SanctionDrawerItem
                title="Date of Birth"
                value={data?.dob ? formatDate(data?.dob, 'MMM d, yyyy') : 'N/A'}
              />
              <SanctionDrawerItem
                title="Nationality"
                value={data?.country ?? 'N/A'}
              />
            </Box>
            <Box className="space-y-6 rounded-[10px] bg-gray-100 p-6">
              <SanctionDrawerItem
                title="Authority"
                value={data?.details?.authority as string}
              />
              {/* no data from endpoint available for the below yet */}
              {/* <SanctionDrawerItem title="Program" value="Reciprocal" /> */}
              <SanctionDrawerItem
                title="Start Date"
                value={
                  data?.details?.startDate
                    ? formatDate(data?.details?.startDate, 'MMM d, yyyy')
                    : 'N/A'
                }
              />
              {/* no data from endpoint available for the below yet */}
              {/* <SanctionDrawerItem title="End Date" value="-" /> */}
            </Box>
            <Flex className="flex-col gap-y-2">
              <Text className="text-[11px] font-normal leading-normal text-gray-800">
                Match Accuracy
              </Text>
              <Box className="space-y-6 rounded-[10px] bg-gray-100 p-6">
                <SanctionDrawerItem
                  title="Match Score"
                  status={data?.score ? `${data?.score}%` : 'N/A'}
                />
                <SanctionDrawerItem
                  title="First Name"
                  value={data?.firstName}
                  // status="Match"
                />
                <SanctionDrawerItem
                  title="Last Name"
                  value={data?.lastName}
                  // status="Match"
                />
                <SanctionDrawerItem
                  title="Date of Birth"
                  value={data?.dob ? formatDate(data?.dob, 'MMM d,') : 'N/A'}
                  // status="Slight Mismatch"
                />
                <SanctionDrawerItem
                  title="Year of Birth"
                  value={data?.dob ? formatDate(data?.dob, 'yyyy') : 'N/A'}
                  // status="Slight Mismatch"
                />
                <SanctionDrawerItem
                  title="Nationality"
                  value={data?.country as string}
                  // status="Match"
                />
                {/* no data from endpoint available for the below yet */}
                {/* <SanctionDrawerItem title="Passport Number" value="N9934578"
                                        // status="No Data" 
                                        /> */}
              </Box>
            </Flex>
          </Box>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default SanctionDrawer;
