import SignUpClient from '@/app/(public-routes)/(auth-pages)/auth/sign-up/component/SignUpClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignUp',
};

const SignUpPage = () => {
  return <SignUpClient />
};

export default SignUpPage;
