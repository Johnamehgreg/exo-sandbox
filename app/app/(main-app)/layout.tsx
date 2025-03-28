import BaseLayout from '@/components/layout/base-layout';
import { NavigationProgress } from "@mantine/nprogress";
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <BaseLayout>
  <NavigationProgress />
  {children}</BaseLayout>;
};

export default DashboardLayout;
