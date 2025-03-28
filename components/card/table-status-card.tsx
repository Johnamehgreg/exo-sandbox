import { Flex, Text } from '@mantine/core';
import React from 'react';

interface Props {
  status?: 'approved' | 'rejected' | 'needs_review';
}

export const TableStatusCard: React.FC<Props> = ({ status }) => {
  const getLabel = () => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          bg: '#EEF7F2',
          color: '#177A48',
        };

      case 'rejected':
        return {
          label: 'Rejected',
          bg: '#FAEDEB',
          color: '#852913',
        };

      case 'needs_review':
        return {
          label: 'Needs review',
          bg: '#FEF5E7',
          color: '#C97701',
        };
      default:
        return {
          label: '',
          bg: '',
          color: '',
        };
    }
  };
  if (status)
    return (
      <Flex className="justify-start">
        <Flex
          bg={getLabel().bg}
          className="items-center gap-2 rounded-[4px] px-3 py-[4px]"
        >
          <Text
            c={getLabel().color}
            className="text-[14px] font-medium"
            lineClamp={1}
          >
            {getLabel().label}
          </Text>
        </Flex>
      </Flex>
    );
};
