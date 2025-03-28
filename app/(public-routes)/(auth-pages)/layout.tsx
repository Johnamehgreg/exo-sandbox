import AuthLayoutClient from '@/components/layout/auth';
import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
};

export default AuthLayout;
