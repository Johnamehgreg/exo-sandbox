import { Metadata } from 'next';
import ResetPasswordClient from './components/reset-password-client';

export const metadata: Metadata = {
  title: 'Reset Password',
};

const ResetPasswordPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const token = (await params).slug?.[0];
  return <ResetPasswordClient token={token} />;
};

export default ResetPasswordPage;
