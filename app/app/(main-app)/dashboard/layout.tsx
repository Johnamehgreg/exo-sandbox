import ModuleWrapper from '@/components/layout/module-wrapper';
import { PropsWithChildren } from 'react';

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  return (
      <ModuleWrapper>
        {children}
      </ModuleWrapper>
  );
};

export default DashboardLayout;