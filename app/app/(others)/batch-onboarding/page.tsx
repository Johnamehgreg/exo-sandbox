import { Metadata } from 'next';
import PageClient from './components/page-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/server/auth';



export const metadata: Metadata = {
  title: 'Batch OnBoarding',
};

const BatchOnboardingPage = async() => {
    const session = await getServerSession(authOptions);
  
  return <PageClient {...{ session }} />;
};

export default BatchOnboardingPage;
