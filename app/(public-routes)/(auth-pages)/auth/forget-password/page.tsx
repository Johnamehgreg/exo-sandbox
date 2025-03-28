import { Metadata } from 'next';
import ForgetPasswordClient from './components/forget-password-client';

export const metadata: Metadata = {
  title: 'Forget Password',
};

const ForgetPassword = () => {
  return <ForgetPasswordClient />;
};

export default ForgetPassword;
