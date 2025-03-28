import { Metadata } from 'next';
import PageClient from './components/page-client';



export const metadata: Metadata = {
  title: 'Batch Detail',
};

const BatchHomePage = () => {
  
  return <PageClient/>;
};

export default BatchHomePage;
