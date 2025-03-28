import { env } from '@/env';
import apis from '@/services/api-services';
import { useMutation } from '@tanstack/react-query';
import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';
import { toast } from 'sonner';


const UPLOAD_MESSAGES = {
    UPLOAD_FAILED: 'An error occurred while uploading the file. Please try again later.',
    SUCCESS: 'File uploaded successfully',
} as const;

export const useUploadBlacklist = ({ onSuccessCallback, accessToken }: { onSuccessCallback?: VoidFunction, accessToken?: string }) => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (file: File) => {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            // Start the SSE connection
            const sseConnection = initializeSSEConnection();

            // initiate the upload
            const { data: {
                uploadUrl,
                fileName
            } } = await apis.blacklist.initiate({
                fileExtension: file.name.split('.').pop() || '',
            })

            await apis.blacklist.uploadToAzureBlob({ file, url: uploadUrl })
            await apis.blacklist.bulkUpload({
                blobName: fileName
            })

            await new Promise((resolve, reject) => {
                sseConnection.onmessage = (event: MessageEvent) => {
                    try {
                        const message = JSON.parse(event?.data)?.message
                        sseConnection?.close()
                        resolve(message || 'File uploaded successfully')
                    } catch {
                        reject(new Error(UPLOAD_MESSAGES.UPLOAD_FAILED))
                    }
                }

                sseConnection.onerror = () => {
                    reject(new Error(UPLOAD_MESSAGES.UPLOAD_FAILED))
                }
            })
        },
        onSuccess: () => {
            toast.success('File uploaded successfully')
            onSuccessCallback?.()
        },
        onError: () => {
            toast.error(UPLOAD_MESSAGES.UPLOAD_FAILED)
        }
    })

    const initializeSSEConnection = () => {
        const eventSource = new EventSourcePolyfill(`${env.NEXT_PUBLIC_API_URL}blacklist/bulk-upload-progress`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            heartbeatTimeout: 120000 // quiet period after which the connection is considered broken
        });

        return eventSource;
    };


    return {
        mutate,
        isPending
    }

}

