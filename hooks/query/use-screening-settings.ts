import apis from "@/services/api-services"
import { ScreeningSettings } from "@/types/general"
import { useQuery } from "@tanstack/react-query"

const useScreeningSettings = () => {
    return useQuery<ScreeningSettings[]>({
        queryKey: ['screeningSettings'],
        queryFn: async () => {
            const { data } = await apis.screening.getSettings()
            return data
        },
    })

}

export default useScreeningSettings