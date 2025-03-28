import { IconInfo } from '@/public/assets/svg/icon-info';
import { Tooltip } from '@mantine/core';

interface ProjectHeaderProps {
  title: string;
  tip?: string;
}
export const ProjectHeader = (props: ProjectHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between px-2">
      <div className="flex w-max items-center justify-between gap-2 px-2 py-3 text-sm">
        <p className="gray-card-header-text">{props.title}</p>
        <Tooltip label={props.tip || props.title} className="flex items-center">
          <button>
            <IconInfo className="h-4 w-4" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
