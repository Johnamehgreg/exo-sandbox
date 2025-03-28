import { useExportCsv } from '@/hooks/mutate/use-export-csv';
import { ExportCsvModel } from '@/types/general';

export const useDownloadCsv = (data: ExportCsvModel) => {
  const { mutate, isPending } = useExportCsv();
  const downloadCSV = () => {
    mutate(data);
  };
  return {
    isPending,
    downloadCSV,
  };
};
