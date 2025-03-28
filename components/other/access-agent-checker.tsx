'use client';

import { PropsWithChildren } from 'react';

interface Props {
  hasAccess: boolean;
}

const AccessAgentChecker = ({
  hasAccess,
  children,
}: PropsWithChildren<Props>) => {
  return !hasAccess ? null : <>{children}</>;
};

export default AccessAgentChecker;
