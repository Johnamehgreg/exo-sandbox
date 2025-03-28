import ModuleWrapper from '@/components/layout/module-wrapper';
import { Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex>
      <ModuleWrapper>{children}</ModuleWrapper>
    </Flex>
  );
};

export default SettingsLayout;
