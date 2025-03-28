import apis from "@/services/api-services";
import { CreateDianaChat, OnboardingDianaChatProjectDetails } from "@/types/diana-onboarding-chat";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface DianaOnboardingCreateChatResponse {
    organization: string;
    completed: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const useCreateDianaOnboardingChat = () => {
    return useMutation<DianaOnboardingCreateChatResponse, AxiosError, void>({
        mutationFn: async () => {
            const res = await apis.diana.project.createDianaProject()
            return res.data
        }
    })
};


export const useDianaOnboardingChat = () => {
    return useMutation<OnboardingDianaChatProjectDetails[], AxiosError, CreateDianaChat>({
        mutationFn: async ({ projectId, value }) => {
            // @ts-expect-error unable to infer types
            const res = await apis.diana.chat.createDianaChat({ projectId, value })
            return res.data
        },
        
    })
};



export const useDianaOnboardingAnalysis = () => {
    return useMutation<unknown, AxiosError, string>({
        mutationFn: (projectId) => apis.diana.project.dianaOnboardingProjectAnalysis(projectId)
    })
}
