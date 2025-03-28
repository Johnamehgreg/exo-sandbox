import { PropsWithChildren, ReactNode } from 'react';

type BaseProps = {
  isLoading: boolean;
  loaderComponent: ReactNode;
};

// Conditional props based on isEmpty
type ConditionalProps =
  | { isEmpty?: false; emptyStateComponent?: ReactNode }
  | { isEmpty: true; emptyStateComponent: ReactNode };

// Combined props type
type Props = BaseProps & ConditionalProps;

const SettingLayoutLoader = ({
  isLoading,
  loaderComponent,
  emptyStateComponent,
  isEmpty,
  children,
}: PropsWithChildren<Props>) => {
  if (isLoading) return <>{loaderComponent}</>;

  if (isEmpty) return <>{emptyStateComponent}</>;

  return <>{children}</>;
};

export default SettingLayoutLoader;
