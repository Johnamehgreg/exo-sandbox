'use client';

import {
  CustomerListModificationAction,
  useCustomerBlackListMutation,
  useCustomerWatchlistMutation,
} from '@/hooks/mutate/use-customer';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { ActionIcon, Menu, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ActionModal } from './action-modal';

type Props = {
  customerId?: string;
  isWatchlisted?: boolean;
  isBlacklisted?: boolean;
};

const ActionType = {
  addWatchList: 'addWatchlist',
  removeWatchList: 'removeWatchlist',
  addBlacklist: 'addBlacklist',
  removeBlacklist: 'removeBlacklist',
} as const;

const CustomerActionComponent = ({
  customerId,
  isWatchlisted,
  isBlacklisted,
}: Props) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') as string;

  const cb = () => {
    close();
  };

  const { isPending: isPendingWatchList, mutate: mutateWatchList } =
    useCustomerWatchlistMutation({
      cb,
    });
  const { isPending: isPendingBlackList, mutate: mutateBlackList } =
    useCustomerBlackListMutation({
      cb,
    });

  const actionList = useMemo(
    () => [
      {
        label: isWatchlisted ? 'Remove from WatchList' : 'Add to WatchList',
        value: isWatchlisted
          ? ActionType.removeWatchList
          : ActionType.addWatchList,
      },
      {
        label: isBlacklisted ? 'Remove from BlackList' : 'Add to BlackList',
        value: isBlacklisted
          ? ActionType.removeBlacklist
          : ActionType.addBlacklist,
      },
    ],
    [isWatchlisted, isBlacklisted]
  );

  const [selectedAction, setSelectedAction] =
    useState<(typeof actionList)[number]>();

  const getActionProps = () => {
    switch (selectedAction?.value) {
      case ActionType.addWatchList:
        return {
          title: 'Are you sure you want to add this customer to Watch List?',
          buttonText: 'Add',
          buttonColor: theme.colors[theme.primaryColor][6],
          action: 'add',
          type: 'watchlist',
        };
      case ActionType.removeWatchList:
        return {
          title:
            'Are you sure you want to remove this customer from Watch List?',
          buttonText: 'Remove',
          buttonColor: theme.colors[theme.primaryColor][6],
          action: 'remove',
          type: 'watchlist',
        };
      case ActionType.addBlacklist:
        return {
          title: 'Are you sure you want to add this customer to Blacklist?',
          buttonText: 'Add',
          buttonColor: theme.colors[theme.primaryColor][6],
          action: 'add',
          type: 'blacklist',
        };
      case ActionType.removeBlacklist:
        return {
          title:
            'Are you sure you want to remove this customer from Blacklist?',
          buttonText: 'Remove',
          buttonColor: theme.colors[theme.primaryColor][6],
          action: 'remove',
          type: 'blacklist',
        };
      default:
        return {};
    }
  };

  const shouldReturn = (item: (typeof actionList)[number]) => {
    return (
      tab === 'watchlist' &&
      (item.value === ActionType.removeBlacklist ||
        item.value === ActionType.addBlacklist)
    );
  };

  return (
    <>
      <Menu withArrow trigger="hover">
        <Menu.Target>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            bg={'transparent'}
          >
            <IconVerticalStack fill="#98A2B3" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {actionList?.map((item) => {
            if (shouldReturn(item)) {
              return;
            }
            return (
              <Menu.Item
                key={item.value}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAction(item);
                  open();
                }}
                className="min-w-[130px] text-[12px] font-normal"
              >
                {item?.label}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
      <ActionModal
        buttonBgColor={getActionProps().buttonColor}
        buttonText={getActionProps().buttonText}
        title={getActionProps().title}
        isProcessing={isPendingWatchList || isPendingBlackList}
        onClose={close}
        isVisible={opened}
        onSubmit={() => {
          if (getActionProps().type === 'watchlist') {
            mutateWatchList({
              customerId: customerId as string,
              action: getActionProps()
                .action! as CustomerListModificationAction,
            });
          } else {
            mutateBlackList({
              customerId: customerId as string,
              action: getActionProps()
                .action! as CustomerListModificationAction,
            });
          }
        }}
      />
    </>
  );
};

export default CustomerActionComponent;
