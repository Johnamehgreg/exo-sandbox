import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';

const ModuleWrapper = async ({ children }: PropsWithChildren) => {
  return (
    <Box className="custom-scrollbar dashboard-header-card-wrapper-border order-b-0 mt-2.5 h-[calc(100vh-10px)] w-full overflow-y-scroll">
      {children}
    </Box>
  );
};

export default ModuleWrapper;
