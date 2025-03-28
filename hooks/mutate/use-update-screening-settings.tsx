import { toast } from "@/components/ui/toast"
import apis from "@/services/api-services"
import { UpdateScreeningSettingsModel } from "@/types/general"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateScreeningSettings = (successCallback?: VoidFunction) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: UpdateScreeningSettingsModel }) => {
            const res = await apis.screening.updateSettings(id, data)
            return res?.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["screeningSettings"] });
            successCallback?.();
        },
        onError: () => {
            toast({
                message: "Something went wrong",
                variant: "error"
            });
        }
    })
}