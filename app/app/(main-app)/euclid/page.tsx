import { authOptions } from '@/app/server/auth';
import EuclidLayout from '@/components/layout/euclid-layout';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import EuclidPage from "./components/euclid-page";
export const metadata: Metadata = {
  title: 'Euclid',
};

const Euclid = async() => {
  const session = await getServerSession(authOptions);
  
  return <div className=''>
    <EuclidLayout {...{session}}>
      <EuclidPage />
    </EuclidLayout>
  </div>
};

export default Euclid;
