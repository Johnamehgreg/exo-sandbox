import { cn } from '@/lib/utils';
import { Tabs } from '@mantine/core';

type Props = {
  tab: string;
  tabName: string;
  text?: string;
};

const Tab = ({ tab, tabName, text }: Props) => {
  return (
    <Tabs.Tab
      value={tabName}
      className={cn('capitalize text-gray-400', {
        'border-b-vibrant-green text-vibrant-green': tab === tabName,
      })}
    >
      {text ?? tabName}
    </Tabs.Tab>
  );
};

export default Tab;
