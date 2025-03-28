import { JSX } from 'react';
import { NavTypeModal } from './general';

export interface CommonType {
  _id: string;
  name: string;
  description: string;
}

export interface DashboardType {
  value: 'fibonacci' | 'diana' | 'dashboard';
  label: string;
  isVisible?: boolean;
  Icon?: JSX.Element | unknown;
  routes?: NavTypeModal[];
}

export const AnalysisTypeEnum = {
  FINANCIAL: 'financial_analysis',
  OPERATIONAL: 'operation_analysis',
  RISK: 'risk_analysis',
  GEOSPATIAL: 'geospatial_analysis',
  OVERVIEW: 'overview',
} as const;
