import { Metadata } from 'next';
import DianaNoProjectPageClient from './components/diana-no-project-page-client';

export const metadata: Metadata = {
  title: 'Diana',
};

const DianaNoProjectPage = () => {
  return <DianaNoProjectPageClient />;
};

export default DianaNoProjectPage;
