import { IconDate } from '@/public/assets/svg/icon-date';
import { ActionIcon, Button, Group } from '@mantine/core';
import { format } from 'date-fns';

interface DateFilterButtonProps {
  selectedDate: [Date | null, Date | null];
  onReset: () => void;
  onClick: () => void;
}

export const IconReset = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const DateFilterButton = ({
  selectedDate,
  onReset,
  onClick,
}: DateFilterButtonProps) => {
  const formatDateRange = (dates: [Date | null, Date | null]) => {
    if (!dates[0] || !dates[1]) return 'Date';

    if (dates[0].getMonth() === dates[1].getMonth()) {
      // Same month, show date range
      return `${format(dates[0], 'MMM d')} - ${format(dates[1], 'd, yyyy')}`;
    }
    // Different months
    return `${format(dates[0], 'MMM d')} - ${format(dates[1], 'MMM d, yyyy')}`;
  };

  return (
    <Group gap="xs">
      <Button
        variant="outline"
        onClick={onClick}
        className="border-gray-200 bg-white !p-2 text-secondary"
      >
        <IconDate className="mr-2" />
        {formatDateRange(selectedDate)}
      </Button>
      <ActionIcon
        variant="subtle"
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
        className="text-gray-500 hover:text-gray-700"
        size="md"
      >
        <IconReset />
      </ActionIcon>
    </Group>
  );
};

export default DateFilterButton;
