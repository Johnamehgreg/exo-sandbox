'use client';

import { routes } from '@/lib/routes';
import { Flex, Text } from '@mantine/core';
import Link from 'next/link';

type TitleType = 'Sender' | 'Receiver' | 'Customer' | 'Device';

interface Props {
  title: TitleType;
  value?: string | boolean;
  id?: string | null;
}

const titleToTabMap: Record<TitleType, string> = {
  Sender: 'accounts',
  Receiver: 'accounts',
  Customer: 'users',
  Device: 'devices',
};

const titleToTypeMap: Record<TitleType, string> = {
  Sender: 'sender',
  Receiver: 'recipient', // Map "Receiver" to "recipient"
  Customer: 'customer',
  Device: 'device',
};

const FraudCheckItem: React.FC<Props> = ({ title, id }) => {
  const tab = titleToTabMap[title];

  const constructLink = (id: string, tab: string, title: TitleType): string => {
    let url = `${routes.fibonacci.blacklistDetail}/${id}?redirect=/blacklist?tab=${tab}`;
    if (tab === 'accounts') {
      const type = titleToTypeMap[title];
      url += `&type=${type}`;
    }
    return url;
  };

  const displayText = id ? (
    <Link
      href={constructLink(id, tab, title)}
      className="text-[#C73E1D] underline"
    >
      Match
    </Link>
  ) : (
    'No Match'
  );

  return (
    <Flex className="flex-col space-y-2 font-normal">
      <Text className="text-xs leading-[18px] text-[#475569]">{title}</Text>
      <Text className="text-sm text-[#020617]">{displayText}</Text>
    </Flex>
  );
};

export default FraudCheckItem;
