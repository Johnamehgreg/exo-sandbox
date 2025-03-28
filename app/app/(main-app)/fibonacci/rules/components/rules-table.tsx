import { ActionModal } from '@/components/modal/action-modal';
import { useRules } from '@/hooks/mutate/use-rules';
import { colors } from '@/lib/app-config';
import { getFirstLatter } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { IconApproved } from '@/public/assets/svg/icon-approved';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { RulesModel, TestRuleResponseModel } from '@/types/general';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Menu,
  Table,
  Text,
} from '@mantine/core';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useGetTransactions } from '@/hooks/query/transaction';
import { useState } from 'react';
import RulesTestModal from './rules-test-modal';

type Props = {
  pageHeader?: string;
  rulesList?: RulesModel[];
  redirect?: string;
  refetch?: () => void;
};

enum ActionType {
  Test = 'test',
  Disable = 'disable',
}

const tableHeading = ['Description', 'Created by', 'Status', ''];
const actionList = [
  { label: 'Test instruction', value: ActionType.Test },
  { label: 'Disable instruction', value: ActionType.Disable },
];

const getActionLabel = (
  item: (typeof actionList)[number],
  rule: RulesModel
) => {
  if (item?.value === ActionType.Disable) {
    return rule.state === 'active'
      ? 'Disable instruction'
      : 'Activate instruction';
  } else if (rule.state !== 'active') {
    return item?.label;
  }
  return null;
};

const actionProps = (state: string) => {
  switch (state) {
    case 'active':
      return {
        buttonText: 'Disable',
        title: 'Are you sure you want to disable this instruction?  ',
        action: 'inactive',
      };
    case 'inactive':
      return {
        icon: IconApproved,
        buttonColor: colors.P1,
        buttonText: 'Enable',
        title: 'Are you sure you want to activate this instruction?',
        action: 'active',
      };
    default:
      return {
        icon: IconApproved,
        buttonColor: colors.P1,
        buttonText: 'Enable',
        message:
          'Activating this instruction will add all actions performed on active transactions',
        title: 'Are you sure you want to activate this instruction?  ',
        action: 'active',
      };
  }
};
const RulesTable = ({ rulesList, redirect, refetch, pageHeader }: Props) => {
  const { onActionUpdateRule, isLoading } = useRules();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showDisable, setShowDisable] = useState(false);
  const [showTestRule, setShowTestRule] = useState(false);
  const [selectedRule, setSelectedRule] = useState<RulesModel>();
  const [testRuleData, setTestRuleData] =
    useState<TestRuleResponseModel | null>(null);
  const header = pageHeader || '';

  const { transactions } = useGetTransactions();
  const handleCloseTestRuleModal = () => {
    setSelectedRule(undefined);
    setTestRuleData(null);
    setShowTestRule(false);
  };

  const getRedirect = () => {
    if (redirect) {
      return redirect;
    }
    const params = new URLSearchParams(searchParams);
    params.set('h', header);
    return `${pathname}?${params.toString()}`;
  };

  const action = actionProps(selectedRule?.state as string);

  const rows = rulesList?.map((rule) => (
    <Table.Tr
      key={rule._id}
      onClick={() => {
        router.push(
          `${routes.fibonacci.rulesDetail}/${rule._id}?redirect=${getRedirect()}`
        );
      }}
      className="cursor-pointer"
    >
      <Table.Td>
        <Text className="table-item-padding table-item-text max-w-[300px]">
          {rule?.description}
        </Text>
      </Table.Td>

      <Table.Td>
        <Box className="table-item-padding">
          <Flex className="items-center gap-2">
            <Avatar bg={'#000'} tt={'capitalize'} size={'sm'}>
              {getFirstLatter(rule?.createdBy?.firstName || '')}
              {getFirstLatter(rule?.createdBy?.lastName || '')}
            </Avatar>
            <Text className="table-item-text">
              {rule?.createdBy?.firstName} {rule?.createdBy?.lastName}
            </Text>
          </Flex>
        </Box>
      </Table.Td>
      <Table.Td className="text-center">
        <Flex
          className={cn(
            'h-[29px] w-[94px] items-center justify-center rounded bg-[#F1F5F9] text-sm leading-[21px] text-[#475569]',
            {
              'bg-[#EEF7F2] text-[#177A48]': rule?.state === 'active',
            }
          )}
        >
          <Text className="text-sm font-medium">
            {rule?.state === 'active' ? 'Active' : 'Disabled'}
          </Text>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Flex className="justify-end">
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
              {actionList?.map((item) => (
                <Menu.Item
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRule(rule);
                    // onSelectRule(rule);
                    if (item.value === ActionType.Disable) {
                      setShowDisable(true);
                    }
                    if (item.value === ActionType.Test) {
                      setShowTestRule(true);
                    }
                  }}
                  className="min-w-[130px] text-[12px] font-normal"
                >
                  {getActionLabel(item, rule)}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="overflow-x-scroll">
      <Table
        horizontalSpacing="sm"
        highlightOnHover
        verticalSpacing="xs"
        stickyHeader
      >
        <Table.Thead bg={'#F8FAFC'}>
          <Table.Tr>
            {tableHeading?.map((heading, index) => (
              <Table.Th key={index}>
                <Text className="black-list-table-header table-header-text-color">
                  {heading}
                </Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <RulesTestModal
        isVisible={showTestRule}
        onClose={handleCloseTestRuleModal}
        selectedRule={selectedRule!}
        transactions={transactions}
        testRuleData={testRuleData}
        setTestRuleData={setTestRuleData}
      />

      <ActionModal
        buttonBgColor={action.buttonColor}
        buttonText={action.buttonText}
        message={action.message}
        title={action.title}
        Icon={action.icon}
        isProcessing={isLoading}
        onClose={() => {
          setShowDisable(false);
        }}
        isVisible={showDisable}
        onSubmit={() => {
          onActionUpdateRule({
            action: `${selectedRule?._id}/${action.action}`,
            cb() {
              refetch?.();
              setShowDisable(false);
            },
          });
        }}
      />
    </Box>
  );
};

export default RulesTable;
