import { Metadata } from 'next';
import LoginClient from './components/login-client';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return <LoginClient />;
};

export default LoginPage;
