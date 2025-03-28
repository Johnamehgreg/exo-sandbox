'use client';

import { ActivityLogsIcons } from './icon-activity-logs';

interface Props {
  iconName: keyof typeof ActivityLogsIcons;
}

const IconTransactionActivityLogsElement = ({ iconName }: Props) => {
  const IconComponent =
    ActivityLogsIcons[iconName] || ActivityLogsIcons?.defaultIcon;
  return <IconComponent />;
};

export default IconTransactionActivityLogsElement;

// defaultIcon
