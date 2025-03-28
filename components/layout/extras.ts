import { routes } from '@/lib/routes';
import { IconFinancialAnalysis } from '@/public/assets/svg/nav/diana/icon-financial-analysis';
import { IconGeospatialAnalysis } from '@/public/assets/svg/nav/diana/icon-geospatial-analysis ';
import { IconOperationalAnalysis } from '@/public/assets/svg/nav/diana/icon-operational-analysis';
import { IconDianaOverview } from '@/public/assets/svg/nav/diana/icon-overview';
import { IconRiskAnalysis } from '@/public/assets/svg/nav/diana/icon-risk-analysis';
import { IconWhatIf } from '@/public/assets/svg/nav/diana/icon-what-if';
import { IconBlackList } from '@/public/assets/svg/nav/fibonacci/icon-black-list';
import { IconCustomerList } from '@/public/assets/svg/nav/fibonacci/icon-customer-list';
import { IconOverview } from '@/public/assets/svg/nav/fibonacci/icon-overview';
import { IconFSettings } from '@/public/assets/svg/nav/fibonacci/icon-settings';
import { IconFStack } from '@/public/assets/svg/nav/fibonacci/icon-stack';
import { IconTransaction } from '@/public/assets/svg/nav/fibonacci/icon-transaction';

export const fibonacciLinks = [
  {
    label: 'Dashboard',
    value: routes.fibonacci.overview,
    Icon: IconOverview,
  },
  {
    label: 'Transactions',
    value: routes.fibonacci.transactions,
    Icon: IconTransaction,
  },
  {
    label: 'Customers',
    value: routes.fibonacci.customers,
    Icon: IconCustomerList,
  },
  {
    label: 'Instructions',
    value: routes.fibonacci.rules,
    Icon: IconFStack,
  },
  {
    label: 'Blacklist',
    value: routes.fibonacci.blacklist,
    Icon: IconBlackList,
  },
  {
    label: 'Settings',
    value: routes.fibonacci.settingsFibonacci,
    Icon: IconFSettings,
  },
];

export const dianaLinks = [
  {
    label: 'Overview',
    value: "overview",
    route: (id: string) => routes.diana.overview(id),
    Icon: IconDianaOverview,
  },
  {
    label: 'Financial Analysis',
    value: 'financial-analysis',
    route: (id: string) => routes.diana.financialAnalysis(id),
    Icon: IconFinancialAnalysis,
  },
  {
    label: 'Operational Analysis',
    value: 'operational-analysis',
    route: (id: string) => routes.diana.operationalAnalysis(id),
    Icon: IconOperationalAnalysis,
  },
  {
    label: 'Regulatory & Catastrophic Risk Analysis',
    value: 'risk-analysis',
    route: (id: string) => routes.diana.riskAnalysis(id),
    Icon: IconRiskAnalysis,
  },
  {
    label: 'Geospatial Analysis ',
    value: 'geo-spatial-analysis',
    route: (id: string) => routes.diana.geospatialAnalysis(id),
    Icon: IconGeospatialAnalysis,
  },
  {
    label: 'What-If',
    value: 'what-if',
    route: (id: string) => routes.diana.whatIf(id),
    Icon: IconWhatIf,
  },
  // {
  //   label: "Input and Assumptions",
  //   value: "Input and Assumptions",
  //   Icon: IconInputAndAssumptions,
  // },
];
