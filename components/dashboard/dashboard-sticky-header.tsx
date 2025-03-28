'use client';
import { useDownloadReport } from '@/hooks/query/diana-dashboard';
import { colors } from '@/lib/app-config';
import { IconDownload } from '@/public/assets/svg/icon-download';
import { IconInfo } from '@/public/assets/svg/icon-info';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { Flex, Loader, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { useParams, usePathname } from 'next/navigation';
import { memo } from 'react';
import { AskDianaBtn } from '../other/ask-diana-btn';
import { DianaDownloadReport } from '../other/diana-download-report';

interface Props {
  label?: string;
  children?: React.ReactNode;
  showDownloadReport?: boolean;
  subTitle?: string;
}



export const DashboardStickyHeader: React.FC<Props> = memo(
  ({ label, subTitle,  children }) => {
    return (
      <Flex className="sticky gap-2 w-full flex-wrap  z-50 top-0 bg-gray-50  rounded-b-[0]   justify-between items-center min-h-[48px] py-1  border-b-[1px] border-gray-300 border-solid  px-[16px]">
      <Flex className="items-center   gap-[20px]">
        <Flex className="items-center flex-wrap gap-[6px] ">
          <Text className="text-gray-800 text-[16px] font-twk font-[650]">
            {label}
          </Text>
          {subTitle && (
            <>
              <IconArrowRightIos fill={colors.gray[800]} />
              <Text className="text-gray-600 line-clamp-1 text-[14px] font-twk font-[350] capitalize">
                {subTitle}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
      <Flex className=" gap-[8px] flex-wrap items-center">
      <DianaDownloadReport />
        <AskDianaBtn />
      </Flex>
      {children}
    </Flex>
    );
  }
);

DashboardStickyHeader.displayName = 'DashboardStickyHeader';
