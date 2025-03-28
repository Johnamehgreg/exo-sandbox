import { Metadata } from 'next';
import PageClient from './components/page-client';

export const metadata: Metadata = {
  title: 'What if',
};

const WhatIfPage = () => {
  return <PageClient />;
};

export default WhatIfPage;
