import MarkdownWithLatex from '@/components/other/mark-down-with-latex';
import { DianaProjectOverlayRed } from '@/public/assets/svg/diana-project-overlay-red';
import { ExoBackgroundSide } from '@/public/assets/svg/exo-background-side';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { Box, Button, Card, Flex } from '@mantine/core';

interface Props {
  label: string;
  action?: () => void;
  actionText?: string;
  type?: 'default' | 'success' | 'danger';
  value?: number;
}

export const ExoAction: React.FC<Props> = ({
  label,
  actionText,
  type,
  action,
  value,
}) => {
  if (value! < 1) return null;
  return (
    <Flex className="gap-2">
      <Card
        p={0}
        className="relative w-full overflow-hidden rounded-[12px] border-[1px] border-solid border-gray-300"
      >
        {type === 'success' && (
          <ExoBackgroundSide className="absolute left-0 top-5" />
        )}
        {type === 'danger' && (
          <DianaProjectOverlayRed className="absolute left-0 top-0" />
        )}

        <Box
          className={`!border-l-[4px] bg-gray-50 !p-[10px] ${
            type === 'success' && `border-vibrant-green`
          } ${type === 'danger' && `border-error-600`}`}
        >
          <div className="grid grid-cols-[11fr_3fr] items-start justify-between">
            <Box className="text-color-l markdown-format mb-[11px] break-words text-[14px] leading-[18px]">
              <MarkdownWithLatex content={label} />
            </Box>
          </div>

          <Button
            rightSection={
              <IconArrowRightIos
                fill={type === 'success' ? '#0CAE5C' : '#E11D48'}
              />
            }
            className={`rounded-[4px] border-gray-300 ${
              type === 'success' &&
              `!text-vibrant-green hover:!text-vibrant-green`
            } ${type === 'danger' && `!text-error-600 hover:!text-error-600`}`}
            onClick={action}
            variant="default"
            size="xs"
          >
            {actionText}
          </Button>
        </Box>
      </Card>
    </Flex>
  );
};
