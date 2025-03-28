import { authOptions } from "@/app/server/auth";
import { getServerSession } from "next-auth";
import OnboardingPageClient from "./components/onboarding-page-client";

const OnboardingPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <OnboardingPageClient {...{ session }} />
  )
}

export default OnboardingPage