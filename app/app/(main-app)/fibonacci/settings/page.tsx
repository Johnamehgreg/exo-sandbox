import { Metadata } from 'next';
import FibonacciSettingsClient from './components/fibonacci-settings-client';

export const metadata: Metadata = {
  title: 'Settings',
};

const FibonacciSettings = () => {
  return <FibonacciSettingsClient />;
};

export default FibonacciSettings;
