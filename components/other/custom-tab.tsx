import { Center, Flex, SegmentedControl, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Fader from '@/public/image/fader.svg';
import { TooltipNavIcon } from '../dashboard/tooltip-nav-icon';
import { SectionModel } from '@/types/general';
import Image from 'next/image';

interface Props {
  size?: string;
  value?: string;
  onChange?: (value: string) => void;
  sectionList: SectionModel[] | [];
  activeClassNameText?: string;
  activeClassNameCard?: string;
  indicatorClassName?: string;
  activeIconColor?: string;
  inactiveIconColor?: string;
  inactiveClassNameText?: string;
  iconWrapperClassName?: string;
  showTooltip?: boolean;
  textClassName?: string;
}

const normalizePath = (path: string) => {
  return path.split('/').slice(0, 4).join('/');
};

export const CustomTab: React.FC<Props> = ({
  size,
  value,
  onChange,
  sectionList,
  activeClassNameText,
  inactiveClassNameText,
  activeIconColor,
  inactiveIconColor,
  indicatorClassName,
  iconWrapperClassName,
  showTooltip,
  textClassName,
}) => {
  const [activeTab, setActiveTab] = useState(
    value || (sectionList[0]?.value as string)
  );

  useEffect(() => {
    if (value) {
      setActiveTab(value);
    }
  }, [value]);

  const tabList = sectionList.map((item) => {
    const { Icon } = item;
    const isActive = activeTab.startsWith(item.value);
    return {
      ...item,
      label: (
        <TooltipNavIcon disabled={!showTooltip} label={item.label}>
          <Flex className="relative items-center gap-3">
            {isActive && (
              <Image alt="" src={Fader} className="-z-1 absolute -left-24" />
            )}
            {Icon && (
              <Center
                className={
                  isActive
                    ? `${iconWrapperClassName} !bg-transparent`
                    : iconWrapperClassName
                }
              >
                <Icon fill={isActive ? activeIconColor : inactiveIconColor} />
              </Center>
            )}
            <Text
              className={`line-clamp-1 text-start text-[14px] capitalize ${
                isActive ? activeClassNameText : inactiveClassNameText
              } whitespace-pre-line ${textClassName}`}
            >
              {item.label}
            </Text>
          </Flex>
        </TooltipNavIcon>
      ),
      active: isActive,
    };
  });

  return (
    <>
      <SegmentedControl
        data-check=""
        value={normalizePath(activeTab)}
        size={size || 'lg'}
        onChange={(value: string) => {
          setActiveTab(value);
          onChange?.(value);
        }}
        classNames={{
          root: 'bg-transparent p-0',
          indicator: indicatorClassName,
          control: 'side-nav-link-control ',
        }}
        // variant="custom"
        orientation="vertical"
        w="100%"
        withItemsBorders={false}
        data={tabList}
      />
    </>
  );
};
