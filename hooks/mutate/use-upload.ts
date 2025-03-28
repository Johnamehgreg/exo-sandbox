import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { useState } from 'react';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const onUploadFile = ({
    file,
    hidePopup,
    fileId,
    cb,
    errorCb,
  }: {
    file: File;
    fileId?: string;
    hidePopup?: boolean;
    cb?: (uri: string, id?: string) => void;
    errorCb?: (errorProps: { message: string; id?: string }) => void;
  }) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file as File);
    apis.common
      .uploadFile(formData)
      .then((res) => {
        setIsUploading(false);
        cb?.(res?.data?.imageUrl, fileId);
        {
          !hidePopup &&
            toast({
              message: 'File uploaded successfully, ',
              variant: 'success',
            });
        }
      })
      .catch((e) => {
        setIsUploading(false);
        errorCb?.({ message: e.response.data.message, id: fileId });

        {
          !hidePopup &&
            toast({
              message: e.response.data.message,
              variant: 'error',
            });
        }
      })
      .finally(() => setIsUploading(false));
  };
  return {
    onUploadFile,
    isUploading,
  };
};
