import { IconCsvIcon } from '@/public/assets/svg/icon-csv-icon';
import { IconDocument } from '@/public/assets/svg/icon-document';
import { IconPdfIcon } from '@/public/assets/svg/icon-pdf-icon';

export const fileTypeIcon = (attachmentType: string) => {
  if (attachmentType.includes('csv'))
    return <IconCsvIcon className="h-[16px] w-[16px]" />;
  if (attachmentType.includes('pdf'))
    return <IconPdfIcon className="h-[16px] w-[16px]" />;
  return <IconDocument className="h-[16px] w-[16px]" />;
};
