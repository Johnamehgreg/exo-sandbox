import { JSX } from 'react';

export interface OnboardingDianaChatInputValidation {
  regex?: string;
  min_value?: number | null;
  max_value?: number | null;
}
type FileTypeKey = 'csv' | 'pdf' | 'xls' | 'xlsx' | 'doc' | 'docx';

export interface OnboardingDianaChatProjectDetails {
  allowed_types?: FileTypeKey[];
  _id?: string;
  id: string;
  title?: string;
  type: string;
  required?: boolean;
  validation?: OnboardingDianaChatInputValidation | null;
  children?: string[];
  is_number?: boolean;
  allow_empty?: boolean;
  multi_select?: boolean;
  options?: string[];
  latitude?: string | null;
  longitude?: string | null;
  address?: string | null;
  text?: string | null;
  question_id?: string;
  unit?: string | null;
  unit_value?: string | null;
  date?: string | null;
  selected_options?: string[] | null;
  files?:
    | {
        name: string;
        url: string;
        type: string;
      }[]
    | null;
  project_id: string;
  is_system_message?: boolean;
  createdAt?: string;
  active?: boolean;
}

export interface CreateDianaChat {
  projectId: string;
  value?: OnboardingDianaChatProjectDetails;
}

export interface AnalysisUiListModel {
  label: string;
  status: 'success' | 'running' | 'failed' | 'none';
  value: string;
  icon?: JSX.Element;
}
