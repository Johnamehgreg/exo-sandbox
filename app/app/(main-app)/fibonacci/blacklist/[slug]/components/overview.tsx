import { DetailItem } from '@/components/transactions/detail-item';
import { BlacklistModel } from '@/types/general';
import { Card, Grid, SimpleGrid, Skeleton } from '@mantine/core';

type Props = {
  isLoading: boolean;
  blacklistDetail: BlacklistModel | null;
};

const Overview = ({ isLoading, blacklistDetail }: Props) => {
  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" mb={'md'} withBorder>
        <Grid gutter={40}>
          <Grid.Col span={3}>
            <Skeleton height={20} width="40%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="40%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="40%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="50%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="40%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="40%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="40%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="50%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
          <Grid.Col span={3}>
            <Skeleton height={20} width="100%" />
          </Grid.Col>
        </Grid>
      </Card>
    );
  }
  return (
    <Card className="dashboard-border" mb={'md'}>
      <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 4 }}>
        {blacklistDetail?.userName && (
          <DetailItem
            text={blacklistDetail?.userName ?? 'N/A'}
            title="Name"
            type="text"
          />
        )}
        {blacklistDetail?.accountType && (
          <DetailItem
            text={blacklistDetail?.accountType ?? 'N/A'}
            title="Account"
            type="text"
          />
        )}
        {blacklistDetail?.age && (
          <DetailItem
            text={blacklistDetail?.age || 'N/A'}
            title={`Age`}
            type="text"
          />
        )}
        {blacklistDetail?.account && (
          <DetailItem
            text={blacklistDetail.account ?? 'N/A'}
            title="Account"
            type="text"
          />
        )}
        {blacklistDetail?.type && (
          <DetailItem
            text={blacklistDetail.type ?? 'N/A'}
            title="Type"
            type="text"
          />
        )}
        {blacklistDetail?.state && (
          <DetailItem
            text={blacklistDetail.state ?? 'N/A'}
            title="State"
            type="text"
          />
        )}
        {blacklistDetail?.city && (
          <DetailItem
            text={blacklistDetail.city ?? 'N/A'}
            title="City"
            type="text"
          />
        )}
        {blacklistDetail?.country && (
          <DetailItem
            text={blacklistDetail.country ?? 'N/A'}
            title="Country"
            type="text"
          />
        )}
        {blacklistDetail?.isPhoneNumberVerified && (
          <DetailItem
            text={blacklistDetail.isPhoneNumberVerified ? 'Yes' : 'No'}
            title="Phone verified"
            type="text"
          />
        )}
        {blacklistDetail?.model && (
          <DetailItem
            text={blacklistDetail.model ?? 'N/A'}
            title="Phone model"
            type="text"
          />
        )}
        {blacklistDetail?.manufacturer && (
          <DetailItem
            text={blacklistDetail.manufacturer ?? 'N/A'}
            title="Manufacturer"
            type="text"
          />
        )}
        {blacklistDetail?.osName && (
          <DetailItem
            text={blacklistDetail.osName ?? 'N/A'}
            title="OS Name"
            type="text"
          />
        )}
        {blacklistDetail?.osVersion && (
          <DetailItem
            text={blacklistDetail.osVersion ?? 'N/A'}
            title="OS Version"
            type="text"
          />
        )}
        {blacklistDetail?.reason && (
          <DetailItem
            text={blacklistDetail.reason ?? 'N/A'}
            title="Reason"
            type="text"
          />
        )}
      </SimpleGrid>
    </Card>
  );
};

export default Overview;
