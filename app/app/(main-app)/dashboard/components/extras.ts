import { DianaProjectProps } from '@/types/overview';

export const dianaProjects: DianaProjectProps[] = [
  {
    actionText: '+4 more',
    asset: 'Energy, Solar',
    expense: {
      annualRevenue: '$12.3M',
      capitalExpenditure: '$4.3M',
    },
    capacity: '100MW Solar, 50 MWh Battery',
    name: 'Telecom Portfolio',
    type: 'success',
    recommendation:
      'Natural Hazard risk is high due to flooding concerns. Consider investing in mitigation measures. ',
    recommendationTitle: 'Recommendations',
    riskLevel: 8,
    riskLevelText: 'High',
  },
  {
    name: 'Aurora',
    riskLevel: 6,
    type: 'danger',
    riskLevelText: 'Medium',
    asset: 'Real Estate',
    capacity: '1200 Units',
    expense: {
      annualRevenue: '$2.3M',
      capitalExpenditure: '$1.3M',
    },
    recommendation:
      'Natural Hazard risk is high due to flooding concerns. Consider investing in mitigation measures. ',
    recommendationTitle: 'Critical',
    actionText: '+2 more',
  },
  {
    name: 'Scraper',
    riskLevel: 3,
    type: 'success',
    riskLevelText: 'Low',
    asset: 'Real Estate',
    capacity: '40 Units',
    expense: {
      annualRevenue: '$2.3M',
      capitalExpenditure: '$1.3M',
    },
    recommendation:
      'Natural Hazard risk is high due to flooding concerns. Consider investing in mitigation measures. ',
    recommendationTitle: 'Recommendations',
    actionText: '+3 more',
  },
];
