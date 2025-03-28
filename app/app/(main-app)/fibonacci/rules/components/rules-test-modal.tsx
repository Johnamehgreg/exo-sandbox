'use client';

import { toast } from '@/components/ui/toast';
import { useRules } from '@/hooks/mutate/use-rules';
import { generatePseudoCode } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { IconClose } from '@/public/assets/svg/icon-close';
import {
  RulesModel,
  TestRuleResponseModel,
  TransactionModel,
} from '@/types/general';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Table,
  Text,
  Transition,
} from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { CodeBlock } from 'react-code-blocks';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedRule: RulesModel | null;
  transactions: TransactionModel[];
  testRuleData: TestRuleResponseModel | null;
  setTestRuleData: Dispatch<SetStateAction<TestRuleResponseModel | null>>;
}

const tableHeading = ['Transaction ID', 'Status'];

const RulesTestModal = ({
  isVisible,
  onClose,
  selectedRule,
  transactions,
  testRuleData,
  setTestRuleData,
}: Props) => {
  const { onTestRule, isLoading: isLoadingTestRule } = useRules();
  const handleTestRule = () => {
    onTestRule({
      values: {
        ruleId: selectedRule?._id as string,
        transactionIds: transactions?.map((item) => item._id),
      },
      cb(data?: TestRuleResponseModel) {
        setTestRuleData(data!);
        toast({
          message: 'Rule tested successfully',
          variant: 'success',
        });
      },
      errorCb(message: string | string[]) {
        toast({
          message: Array.isArray(message) ? message[0] : message,
          variant: 'error',
        });
      },
    });
  };

  const handleNavigation = (transactionId: string) => {
    window.open(
      `${routes.fibonacci.transactionDetail}/${transactionId}`,
      '_blank'
    );
  };

  const rows = testRuleData?.results?.map((result) => (
    <Table.Tr key={result.t?._id}>
      <Table.Td>
        <Text
          className="cursor-pointer text-sm leading-[21px] text-[#625CCB] underline"
          onClick={() => handleNavigation(result?.t?._id)}
        >
          {result?.t?._id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Flex
          className={cn(
            'h-[26px] w-[94px] items-center justify-center bg-bg-danger-light',
            {
              'bg-success-light': !result?.matched,
            }
          )}
        >
          <Text
            className={cn(
              'text-text-danger text-sm font-normal leading-[18px]',
              {
                'text-text-success': !result?.matched,
              }
            )}
          >
            {!result?.matched ? 'Passed' : 'Failed'}
          </Text>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Drawer
      offset={8}
      radius="md"
      classNames={{
        body: '!p-0 ',
      }}
      position="right"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      opened={isVisible}
      shadow="xs"
      onClose={onClose}
    >
      <>
        <Flex className="dashboard-border h-[56px] items-center justify-between border-x-0 border-t px-4">
          <Text className="filter-modal-header font-twk">Test Instruction</Text>

          <ActionIcon variant="white" onClick={onClose}>
            <IconClose />
          </ActionIcon>
        </Flex>
        <Box className="h-[calc(100vh-140px)] flex-1 space-y-4 overflow-y-scroll px-4 pt-8">
          <Box className="space-y-1">
            <Text className="font-twk text-sm font-normal leading-[18px] text-[#000407]">
              Instruction
            </Text>
            <Box className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-[19px]">
              <Text className="line-clamp-1 text-sm leading-4 text-[#94A3B8]">
                {selectedRule?.description}
              </Text>
            </Box>
          </Box>

          {/* Logic */}
          {selectedRule?.logic &&
          !rows?.length &&
          generatePseudoCode(selectedRule?.logic) ? (
            <Box className="space-y-1">
              <Text className="font-twk text-sm font-medium leading-[18px] text-[#000407]">
                Logic
              </Text>

              <CodeBlock
                text={generatePseudoCode(selectedRule?.logic)}
                language="javascript"
                showLineNumbers={false}
                codeContainerStyle={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '16px',
                  width: '100%',
                }}
                wrapLongLines
              />
            </Box>
          ) : null}

          {/* Batch of Transaction to test */}
          <Box className="space-y-[6px]">
            <Text className="text-sm font-normal leading-[18px] text-[#000407]">
              Batch of Transaction to test
            </Text>
            <Flex className="items-center justify-between rounded-lg border border-[#E2E8F0] p-4">
              <Text className="font-twk text-[14px] leading-4 text-[#94A3B8]">
                Last 10 transactions
              </Text>
            </Flex>
          </Box>
          <Transition
            mounted={!!rows?.length}
            transition="slide-left"
            duration={300}
            timingFunction="ease-in-out"
          >
            {(styles) => (
              <Box style={styles}>
                <Table
                  className="!m-0 !rounded-lg !border border-[#E2E8F0]"
                  horizontalSpacing="sm"
                  highlightOnHover
                  verticalSpacing="xs"
                >
                  <Table.Thead bg={'#F8FAFC'}>
                    <Table.Tr>
                      {tableHeading.map((heading, index) => (
                        <Table.Th key={`table-heading-${index}`}>
                          <Text className="black-list-table-header table-header-text-color">
                            {heading}
                          </Text>
                        </Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Box>
            )}
          </Transition>
        </Box>
        <Flex className="dashboard-border h-[68px] items-center justify-between !border-x-0 !border-b-0 px-4">
          <Button onClick={onClose} variant="default">
            Cancel
          </Button>
          <Button loading={isLoadingTestRule} onClick={handleTestRule}>
            {rows?.length ? 'Run Test Again' : 'Test Instruction'}
          </Button>
        </Flex>
      </>
    </Drawer>
  );
};

export default RulesTestModal;
