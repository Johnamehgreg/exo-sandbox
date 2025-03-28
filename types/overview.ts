export enum ExoProductStatus {
  BASE = 'BASE',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type SortDirection = 'asc' | 'desc' | null;

export type DDate = [Date | null, Date | null];

export interface RiskItem {
  name: string;
  score: string;
  status: RiskLevel;
  taxCredit?: string;
  component?: string;
  explanation?: string;
}
export interface ExoProductSummaryCardProps {
  description: string;
  periodRange: string;
  percentage: number | string;
  showCurrency?: boolean;
  margin: boolean;
  price: number | string;
  type: ExoProductStatus;
  icon?: React.ReactNode;
}

export interface SortState {
  column: keyof RiskItem | null;
  direction: SortDirection;
}

export interface DianaProjectProps {
  name: string;
  type?: 'default' | 'success' | 'danger';
  riskLevel: number;
  riskLevelText: string;
  asset: string;
  capacity: string;
  expense: {
    capitalExpenditure: string;
    annualRevenue: string;
  };
  recommendationTitle: string;
  recommendation: string;
  actionText: string;
}

export interface FinancialBreakdownProps {
  name: string;
  value: number;
  amount: string;
  color: string;
}

export interface KeyIndicator {
  metric: string;
  value: number;
  has_units: boolean;
  units?: string;
}

export interface KeyTermsData {
  title: string;
  description: string;
}
