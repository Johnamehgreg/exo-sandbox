import { trackError } from "@/lib/error-tracking";
import apis from "@/services/api-services";
import { EuclidCreditAnalysisSchema } from "@/types/euclid-credit-analysis";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const UPLOAD_MESSAGES = {
  UPLOAD_FAILED: "An error occurred while uploading the file. Please try again later.",
  SUCCESS: "File uploaded successfully",
} as const;

interface UploadBankStatementProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  accesstoken?: string
}

export const useUploadBankStatement = ({ onSuccess, onError }: UploadBankStatementProps) => {
  return useMutation<{ file_url: string }, Error, File>({
    mutationFn: (bankStatement: File) => apis.euclid.getFileUrl(bankStatement),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(UPLOAD_MESSAGES.UPLOAD_FAILED);
      trackError(error, { message: `Upload bank statement API error` });
      onError?.(error);
    },
  });
};

  
export const useSubmitCreditAnalysisRequest = ({ onSuccess }: UploadBankStatementProps) => {
    return useMutation({
        mutationFn:(data:EuclidCreditAnalysisSchema) => apis.euclid.uploadCreditAnalysisRequest(data),
        onSuccess: () => {
            toast.success("Request submitted successfully")
            onSuccess?.(); 
          },
                  onError: (error) => {
                      toast.error("Error submitting request")
                      trackError(error, { message: `Submit credit analysis request API error` });
                  }
    })
}