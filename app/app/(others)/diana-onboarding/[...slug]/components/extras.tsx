import { IconDervetAnalysis } from '@/public/assets/svg/icon-dervet-analysis';
import { IconNaturalRiskAnalysis } from '@/public/assets/svg/icon-natural-risk-analysis';
import { IconOverviewAnalysis } from '@/public/assets/svg/icon-overview-analysis';
import { IconRegulatoryRiskAnalysis } from '@/public/assets/svg/icon-regulatory-risk-analysis';
import { IconUnderwritingAnalysis } from '@/public/assets/svg/icon-underwriting-analysis';
import { IconGeospatialAnalysis } from '@/public/assets/svg/nav/diana/icon-geospatial-analysis ';
import { AnalysisUiListModel } from '@/types/diana-onboarding-chat';

export const analysisUiList: AnalysisUiListModel[] = [
  {
    label: 'Geospatial Analysis',
    value: 'geospatial_risk_analysis',
    status: 'running',
  },
  {
    label: 'Natural Risk Analysis',
    status: 'running',
    value: 'natural_risk_analysis',
  },
  {
    label: 'Regulatory Risk Analysis',
    status: 'running',
    value: 'regulatory_risk_analysis',
  },
  {
    label: 'Energy Optimization',
    status: 'running',
    value: 'dervet_analysis',
  },
  {
    label: 'Underwriting Analysis',
    status: 'running',
    value: 'underwriting_analysis',
  },
  {
    label: 'Overview Analysis',
    status: 'running',
    value: 'overview_analysis',
  },
];

export const getAnalysisIcon = (value: string) => {
  switch (value) {
    case 'geospatial_risk_analysis':
      return <IconGeospatialAnalysis />;
    case 'natural_risk_analysis':
      return <IconNaturalRiskAnalysis />;
    case 'regulatory_risk_analysis':
      return <IconRegulatoryRiskAnalysis />;
    case 'dervet_analysis':
      return <IconDervetAnalysis />;
    case 'underwriting_analysis':
      return <IconUnderwritingAnalysis />;
    case 'overview_analysis':
      return <IconOverviewAnalysis />;
    default:
      return <IconOverviewAnalysis />;
  }
};

export const formatNumberDisplay = (raw: string): string => {
  if (!raw) return '';
  // If the user is in the middle of typing a decimal, don't format.
  if (raw.endsWith('.')) return raw;
  const num = parseFloat(raw);
  if (isNaN(num)) return raw;
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(num);
};
