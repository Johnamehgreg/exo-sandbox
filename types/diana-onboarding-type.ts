export interface OnboardingDianaChatValidation {
    regex: string | null;
    min_value: number | null;
    max_value: number | null;
  }
  
  type FileTypeKey = 'csv' | 'pdf' | 'xls' | 'xlsx' | 'doc' | 'docx';
  
  export interface OnboardingDianaChatItem {
    allowed_types?: FileTypeKey[];
    _id?: string;
    id: string;
    title?: string;
    type: string;
    required?: boolean;
    validation?: OnboardingDianaChatValidation;
    children?: string[];
    is_number?: boolean;
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
    files?: [{
      name: string;
      url: string;
      type: string;
    }] | null;
    project_id: string;
    is_system_message?: boolean;
    createdAt?: string;
    active?: boolean;
  }
  
  export type DianaOnboardingConversationResponseData = OnboardingDianaChatItem[];