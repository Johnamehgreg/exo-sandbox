export const routes = {
  auth: {
    login: '/auth/login',
    forgetPassword: '/auth/forget-password',
    signup: '/auth/sign-up',
  },
  app: {
    dashoard: '/app/dashboard',
    settings: '/app/settings',
  },
  fibonacci: {
    customers: `/app/fibonacci/customers`,
    customersDetail: `/app/fibonacci/customers`,
    transactions: `/app/fibonacci/transactions`,
    transactionDetail: `/app/fibonacci/transactions`,
    overview: `/app/fibonacci/overview`,
    rules: `/app/fibonacci/rules`,
    rulesDetail: `/app/fibonacci/rules`,
    blacklist: `/app/fibonacci/blacklist`,
    blacklistDetail: `/app/fibonacci/blacklist`,
    allOverview: `/app/fibonacci/all-overview`,
    settingsFibonacci: `/app/fibonacci/settings`,
  },
  diana: {
    dianaOverview: '/app/diana/overview',
    dianaConfiguration: '/app/diana/configuration',
    batchHome: '/app/diana/batch',
    batchOnboarding: '/app/batch-onboarding',
    onboardingId: (id: string) => `/app/diana-onboarding/${id}/project-financing`,
    onboarding: `/app/diana-onboarding`,
    diana: '/app/diana',
    overview: (id: string) => `/app/diana/${id}/overview`,
    financialAnalysis: (id: string) => `/app/diana/${id}/financial-analysis`,
    operationalAnalysis: (id: string) =>
      `/app/diana/${id}/operational-analysis`,
    geospatialAnalysis: (id: string) => `/app/diana/${id}/geo-spatial-analysis`,
    whatIf: (id: string) => `/app/diana/${id}/what-if`,
    riskAnalysis: (id: string) => `/app/diana/${id}/risk-analysis`,
    batchDetail: (id: string) => `/app/diana/batch/${id}`,
    batchDetails: (id: string) => `/app/diana/${id}/batch`,
    batchAnalysis: (id: string) => `/app/${id}/diana-batch-analysis`,
    atlantaEnergy: '/app/atlanta-energy',
    diamondEnergy: '/app/diamond-energy',
    californiaEv1nergy: '/app/california-energy',
    projectFinancing: (id:string) => `${id}/project-financing`
    // infrastructure: '/app/infrastructure',
  },
  euclid : {
    overview:"/app/euclid",
  }
} as const;
