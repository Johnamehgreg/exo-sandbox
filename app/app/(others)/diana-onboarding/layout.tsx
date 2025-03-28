import DianaOnboardingLayoutWrapper from "@/components/layout/diana-onboarding-layout-wrapper"
import { PropsWithChildren } from "react"

const OnboardingLayout = ({ children }: PropsWithChildren) => {
    return (
        <DianaOnboardingLayoutWrapper>
            {children}
        </DianaOnboardingLayoutWrapper>
    )
}

export default OnboardingLayout