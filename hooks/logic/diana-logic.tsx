import { IconEnergy } from "@/public/assets/svg/icon-energy";
import { IconEstate } from "@/public/assets/svg/icon-estate";
import { IconInfrastructure } from "@/public/assets/svg/icon-infrastructure";

const ROUTES = {
  PROJECT_FINANCING: "project-financing",
  REAL_ESTATE: "real-estate",
  INFRASTRUCTURE: "infrastructure",
}

const VALID_ROUTES = Object.values(ROUTES);

export const validateOnboardingChatRoute = (route: string | undefined) => VALID_ROUTES.includes(route || "");

export const dianaOnboardingRoutes = {
  projectFinancing: (id: string) => `diana-onboarding/${id}/${ROUTES.PROJECT_FINANCING}`,
  realEstate: (id: string) => `diana-onboarding/${id}/${ROUTES.REAL_ESTATE}`,
  infrastructure: (id: string) => `diana-onboarding/${id}/${ROUTES.INFRASTRUCTURE}`,
}

const shades = {
  projectFinancing: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="171" height="208" viewBox="0 0 171 208" fill="none">
      <g opacity="0.5" filter="url(#filter0_f_483_16569)">
        <circle cx="-1.5" cy="48.5" r="48.5" fill="#86EFAC" />
      </g>
      <defs>
        <filter id="filter0_f_483_16569" x="-174" y="-124" width="345" height="345" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="62" result="effect1_foregroundBlur_483_16569" />
        </filter>
      </defs>
    </svg>
  ),
  realEstate: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="171" height="208" viewBox="0 0 171 208" fill="none">
      <g opacity="0.5" filter="url(#filter0_f_483_16578)">
        <circle cx="-1.5" cy="48.5" r="48.5" fill="#F0ABFC" />
      </g>
      <defs>
        <filter id="filter0_f_483_16578" x="-174" y="-124" width="345" height="345" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="62" result="effect1_foregroundBlur_483_16578" />
        </filter>
      </defs>
    </svg>
  ),
  infrastructure: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="171" height="208" viewBox="0 0 171 208" fill="none">
      <g opacity="0.5" filter="url(#filter0_f_483_16587)">
        <circle cx="-1.5" cy="48.5" r="48.5" fill="#F9A8D4" />
      </g>
      <defs>
        <filter id="filter0_f_483_16587" x="-174" y="-124" width="345" height="345" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="62" result="effect1_foregroundBlur_483_16587" />
        </filter>
      </defs>
    </svg>
  )
}

export const useDianType = () => {
  const dianaTasks = [
    {
      title: "Infrastructure - Energy & Telecoms",
      code: ROUTES.PROJECT_FINANCING,
      routePath: dianaOnboardingRoutes.projectFinancing,
      Icon: IconEnergy,
      color: '#0B743F',
      description: "Streamline infrastructure underwriting through energy cost forecasting, revenue modeling, and location-based risk analysis to support data-driven investment decisions",
      shade: <shades.projectFinancing />
    },
    {
      title: "Commercial Office & Mixed Use",
      code: ROUTES.REAL_ESTATE,
      routePath: dianaOnboardingRoutes.realEstate,
      Icon: IconEstate,
      isDisabled: false,
      color: '',
      description:
        "Streamline commercial property underwriting through market analysis, revenue forecasting, and location-based risk assessment to support investment decisions",
      shade: <shades.realEstate />
    },
    {
      title: "Industrial & Data Centers",
      code: ROUTES.INFRASTRUCTURE,
      routePath: dianaOnboardingRoutes.infrastructure,
      isDisabled: false,
      Icon: IconInfrastructure,
      description:
        "Analyze industrial and data center underwriting with automated risk-revenue assessment, operational cost metrics, and market demand insights for investment decisions",
      shade: <shades.infrastructure />
    },
  ];

  const getSingleProject = (type: string) => dianaTasks.find((project) => project.code === type)

  return { dianaTasks, getSingleProject }
}
