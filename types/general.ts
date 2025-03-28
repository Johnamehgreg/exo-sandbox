import { JSX } from 'react';
import { RiskItem, SortState } from './overview';

export interface OrganizationModel {
  name: string;
  industry: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  licenseNumber: string;
  taxId: string;
}
export interface NotificationModel {
  dailySummaries?: boolean;
  weeklyReports?: boolean;
  updatesFromAIAgent?: boolean;
  criticalAlerts?: boolean;
  systemUpdates?: boolean;
}

export interface NavTypeModal {
  name?: string;
  Icon?: JSX.Element | unknown;
  path: string;
}

export interface SectionModel {
  value: string;
  label: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type Agent = 'fibonacci' | 'diana';

export interface TimeZoneModel {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export interface GetFibonacciDashboardOverviewResponse {
  analytics: {
    title: string;
    value: number | string;
    isIncreasing: boolean;
    percentChange: string;
    periodRange: string;
  }[];
}

export interface GetFibonacciQuickCountResponse {
  blacklistedLast24HrsCount: number;
  flaggedTransactionsLast24HrsCount: number;
}

export interface DianaProjectModel {
  _id: string;
  organization: string;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
  description: {
    project_id?: string;
    country_code?: string;
    project_name?: string;
    location?: string;
    estimated_project_duration?: string;
    start_date?: string;
    end_date?: string;
    project_goal?: string;
    project_type?: string;
    description?: string;
    longitude?: number;
    latitude?: number;
  };
}

export interface GetTransactionInsightModel {
  analytics: {
    title: string;
    value: string | number;
    has_unit: boolean;
    unit: string;
    isIncreasing: string;
    percentChange: string;
  }[];
}

export type Insight = {
  title: string;
  summary: string;
  full_text: string;
};

export type TransformedScore = {
  name: string;
  value: number;
  riskLevel: string;
};

export type InsightModel = Insight & {
  scoreDetail: TransformedScore | null;
};

export interface InsightDetailsModel {
  insight: string;
  title: string;
}

export interface DianaChatModel {
  id?: string;
  description?: React.ReactNode | string;
  onboarding_stage?: string;
  onboarding_completed?: boolean;
  type?: 'system' | 'human' | 'ai';
  timestamp?: string;
  message?:
    | string
    | {
        answer: string;
        key_indicators: {
          [key: string]: string;
        };
      };
  project_id?: string;
  upload_state?: boolean;
  upload_key?: string;
  stage_values?: (string | { key?: string; value?: string })[] | unknown;
  // stage_values?: unknown;
  project_description?: unknown;
  file_objects?: {
    name?: string;
    type?: string;
    url?: string;
  }[];
  file_key?: string;
}
export interface DianaMessageMode {
  message: string;
  upload_key?: string;
  file_objects?: DianaChatModel['file_objects'];
  file_key?: string;
  project_id?: string;
}

export interface ScenariosMessageMode {
  project_id?: string;
  message?: string;
  current_insight_title?: string;
  file_uploaded?: boolean;
  current_insight_text?: string;
  file_url?: string;
  file_type?: string;
}

export interface FibonacciMessageModel {
  message: string;
  stat: unknown;
  statInsight: string;
}

export interface CustomersListModel {
  addedToBlacklist: boolean;
  _id: string;
  user_id: string;
  is_banned: boolean;
  organization: string;
  is_phone_verified: boolean;
  account_type: string;
  business_category: string;
  date_joined: string;
  age: number;
  is_id_verified: boolean;
  state: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  anomalousFeatures?: string[];
  riskBand?: null;
  riskScore?: null;
  addedToWatchlist: boolean;
  transactionCount: number;
}

export interface CustomersResponse {
  page: number;
  pageSize: number;
  total: number;
  data: CustomersListModel[];
}
export interface RuleResponse {
  page: number;
  pageSize: number;
  total: number;
  data: RulesModel[];
}

export interface CustomerDetailsResponse {
  _id: string;
  user_id: string;
  is_banned: boolean;
  organization: string;
  is_phone_verified: boolean;
  account_type: string;
  business_category: string;
  date_joined: string;
  age: number;
  is_id_verified: boolean;
  addedToWatchlist: boolean;
  addedToBlacklist: boolean;
  state: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type QueryParams = {
  page?: number;
  tab?: string;
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  search?: string;
  period?: string;
};

export interface ICustomerDeviceTrailModel {
  count: number;
  page: number;
  pageSize: number;
  data: {
    deviceId: string;
    firstDateRecorded: string;
    lastDateRecorded: string;
    isDeviceBlacklisted: boolean;
    manufacturer: string;
    model: string;
    name: string;
    osName: string;
  }[];
}

export interface ICustomerLocationTrailModel {
  count: number;
  page: number;
  pageSize: number;
  data: {
    id: string;
    country: string;
    state: string;
    city: string;
    firstDateRecorded: string;
    lastDateRecorded: string;
  }[];
}

interface TransactionWeekData {
  _id: string; // Format: "YYYY-WXX" where XX is the week number
  count: number;
  volume: number;
}

interface RiskScoreChange {
  _id: string; // MongoDB ObjectId as string
  createdAt: string; // ISO 8601 date string
  riskScore: number;
}

export interface NetworkGraphData {
  nodes: {
    accounts?: {
      id: string;
      account: string;
    }[];
    customers?: {
      _id: string;
      isActor: boolean;
    }[];
  }[];
  edges: {
    account: string;
    customer: string;
    transactionCount: number;
    totalVolume: number;
    lastTransactionDate: string;
  }[];
}
export interface CustomerTransactionChartData {
  transactionCountVolData: TransactionWeekData[];
  riskScoreChangeData: RiskScoreChange[];
  networkGraphData: NetworkGraphData;
}

export interface AttachmentModel {
  file?: File;
  isUploaded?: boolean;
  isErrored?: boolean;
  url?: string;
  id?: string;
  isUploading?: boolean;
  file_category?: string;
}

export interface TransactionModel {
  review: 'approved' | 'rejected' | 'needs_review';
  _id: string;
  transactionData: {
    reference: string;
    amount: number;
    receiverAccount: string;
    senderAccount: string;
    isExternalPayment: boolean;
    status: boolean;
    balanceBefore: number;
    type: string;
    channel: string;
    transactionDate: string;
    currency: string;
    vasReceiver: string;
    narration: string;
    issuer?: string;
  };
  device: {
    deviceId: string;
    manufacturer: string;
    model: string;
    name: string;
    osName: string;
    osVersion: string;
  };
  anonymizedUserData: {
    uniqueId: string;
    isBanned: boolean;
    businessCategory: string;
    isPhoneNumberVerified: boolean;
    accountType: string;
    dateJoined: string;
    age: number;
    isIdentityVerified: boolean;
    state: string;
    city: string;
    country: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  insight: {
    comment?: string;
    rulesFailed: unknown[];
    rules: {
      rule: {
        _id: string;
        description: string;
        createdBy: string;
        organization: string;
        state: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      matched: boolean;
    }[];
    isDeviceBlacklisted: boolean;
    isSenderBlacklisted: boolean;
    isUserBlacklisted: boolean;
    isRecipientBlacklisted: boolean;
    riskScore: number;
    riskBand: string;
    userBlacklistId?: string | null;
    deviceBlacklistId?: string | null;
    senderBlacklistId?: string | null;
    recipientBlacklisted?: string | null;
  };
  assignedTo: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlacklistValueModel {
  transactionId: string;
  // "type": 'user' | 'device' | 'recipient' | 'sender',
  type: string;
  note: string;
}

export interface EscalateModel {
  escalateTo: string;
  reason: string;
}

export interface TransactionNoteModel {
  _id?: string;
  note?: string;
  attachment?: string | null;
  transaction?: string;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  organization?: string;
  action?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMemberModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  agentAccess?: string[];
  _id?: string;
  lastLogin?: string;
  isOwner?: boolean;
  createdAt?: string;
  roleId?: string;
  permissions?: {
    fibonacci?: string;
  };
}

export interface BlacklistModel {
  _id: string;
  uniqueId: string;
  entityId: string;
  accountType: string;
  age: string;
  state: string;
  type: string;
  city: string;
  country: string;
  note: string;
  isPhoneNumberVerified: boolean;
  userName: string;
  phoneType: string;
  entityType: string;
  createdByFibonacci: boolean;
  wasAddedIncorrectly: boolean;
  createdBy: {
    permissions: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isOwner: boolean;
    isFirstTimeLogin: boolean;
    createdAt: string;
    updatedAt: string;
    organization: string;
    lastLogin: string;
  };
  createdAt: string;
  updatedAt: string;
  manufacturer: string;
  model: string;
  osName: string;
  osVersion: string;
  account: string;
  customerId: string;
  reason: string;
}

export interface TransactionIssuersModel {
  _id: string;
  name: string;
  organization: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export enum ActivityLogAction {
  TRANSACTION_CREATED = 'transaction_created',
  TRANSACTION_ASSIGNED = 'transaction_assigned',
  TRANSACTION_APPROVED = 'transaction_approved',
  FRAUD_CHECK_INITIATED = 'fraud_check_initiated',
  TRANSACTION_ESCALATED = 'transaction_escalated',
  TRANSACTION_BLOCKED = 'transaction_blocked',
  RECIPIENT_ACCOUNT_BLACKLISTED = 'recipient_account_blacklisted',
  CUSTOMER_ACCOUNT_BLACKLISTED = 'customer_account_blacklisted',
  DEVICE_BLACKLISTED = 'device_blacklisted',
  TRANSACTION_NEED_REVIEW = 'transaction_need_review',
}

export interface TransactionActivityLogModal {
  _id: string;
  entity: string;
  entityId: string;
  action: ActivityLogAction;
  createdAt: string;
}

export interface SettingsFRoleModel {
  name?: string;
  permissions?: string[];
  _id?: string;
  createdAt?: string;
}

export interface PermissionModel {
  description?: string;
  key?: string;
}

export interface ApiKeys {
  _id: string;
  maskedApiKey: string;
  lastUsedAt: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface APIError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface WebhookPostData {
  url: string;
}

export interface WebhookModel {
  _id: string;
  createdAt: string;
  status: 'enabled';
  url: string;
  secret: string;
}

export interface BlacklistInitiate {
  fileExtension: string;
}

export interface BulkUploadData {
  blobName: string;
}

export interface BatchAnalysisProject {
  id: string;
  name: string;
  createAt: string;
  location: string;
  sector: 'realestate' | 'energy';
  capex: string;
  irr: string;
  riskScore: number;
  status: string;
  capacity: string;
}

export interface Project {
  task_id: string;
  sector: string;
  investment_size: string;
  project_id: string;
  irr: string;
  project_name: string;
  location: string;
  risk_score: [number, string];
  riskLevel: string;
  status: string;
}

export interface ProjectsByState {
  pending: Project[];
  running: Project[];
  completed: Project[];
  failed: Project[];
}

export type BatchAnalysis = {
  batch_id: string;
  batch_name: string;
  date_created: Date;
  progress: number;

  estimated_completion_time: string;
  failed_analyses: string;
  // status: "in_progress";
  project_count: number;
  project_complete: number;
  failed_analysis: number;
  status: string;
  est_completion_time: string;
  failed_projects: number;
  projects_by_state: ProjectsByState;
  overall_state: string;
  projects: BatchAnalysisProject[];
  total_projects: number;
  completed_projects: number;
  states: {
    failed: string[];
    running: string[];
    successful: string[];
    unknown: string[];
  };
};

export interface SectionScrollModel {
  value?: string;
  id: string;
  label: string;
  component?: React.ReactNode;
  insightComponent?: React.ReactNode;
}

export interface SortableHeaderProps {
  label?: string;
  column?: keyof RiskItem;
  currentSort?: SortState;
  onSort?: (column: keyof RiskItem) => void;
  textClassName?: string;
  className?: string;
  flexClassName?: string;
  children?: React.ReactNode;
  hideArrow?: boolean;
}

export type ScoreObject = {
  [key: string]: [number, string];
};

export interface SettingsFRoleModel {
  name?: string;
  permissions?: string[];
  _id?: string;
  createdAt?: string;
}

export interface PermissionModel {
  description?: string;
  key?: string;
}

export interface ApiKeys {
  _id: string;
  maskedApiKey: string;
  lastUsedAt: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface APIError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface WebhookPostData {
  url: string;
}

export interface WebhookModel {
  _id: string;
  createdAt: string;
  status: 'enabled';
  url: string;
  secret: string;
}

export interface BlacklistInitiate {
  fileExtension: string;
}

export interface BulkUploadData {
  blobName: string;
}

export interface BatchAnalysisProject {
  id: string;
  name: string;
  createAt: string;
  location: string;
  sector: 'realestate' | 'energy';
  capex: string;
  irr: string;
  riskScore: number;
  status: string;
  capacity: string;
}

export interface SectionScrollModel {
  value?: string;
  id: string;
  label: string;
  component?: React.ReactNode;
  insightComponent?: React.ReactNode;
}

export interface RulesModel {
  description?: string;
  session: string;
  createdAt?: string;
  state?: 'inactive' | 'active';
  _id?: string;
  createdBy?: {
    firstName?: string;
    lastName?: string;
  };
  logic?: unknown[];
}
export interface TestRuleModel {
  ruleId: string;
  transactionIds: string[];
}

export type RuleAnalyticsData = {
  countOfTimesTriggered: number;
  countOfFailedTransactions: number;
  countOfPassedTransactions: number;
  percentOfTransactionTriggered: number;
  description: string;
};

export type RulesAnalyticsTransactionsData = {
  page: number;
  pageSize: number;
  total: number;
  data: {
    _id: string;
    passedAt: string;
    createdAt: string;
    failedAt: null;
    transactionId: string;
    issuer: string;
    amount: number;
    channel: string;
    currency: string;
    type: string;
  }[];
};

export type RuleGraphData = {
  _id: {
    year: number;
    month: number;
  };
  totalTriggered: number;
  totalPassed: number;
  totalFailed: number;
};

export interface MessageModel {
  id?: string;
  isInstruction?: boolean;
  description?: React.ReactNode | string;
  sender?: 'user' | 'fibonacci';
  timestamp?: string;
  message?: string;
  ruleId?: string;
  project_id?: string;
}

export interface CreateRuleResponseModel {
  ruleCreated: boolean;
  answer: string | null;
  rule: unknown;
}

export interface TestRuleResponseModel {
  results: {
    matched: boolean;
    t: {
      _id: string;
      transactionData: {
        reference: string;
        amount: number;
        receiverAccount: string;
        senderAccount: string;
        isExternalPayment: boolean;
        status: boolean;
        balanceBefore: number;
        type: string;
        channel: string;
        transactionDate: string;
        currency: string;
        vasReceiver: string;
        narration: string;
      };
      device: {
        deviceId: string;
        manufacturer: string;
        model: string;
        name: string;
        osName: string;
        osVersion: string;
      };
      anonymizedUserData: {
        uniqueId: string;
        isBanned: boolean;
        businessCategory: string;
        isPhoneNumberVerified: boolean;
        accountType: string;
        dateJoined: string;
        age: number;
        isIdentityVerified: boolean;
        state: string;
        city: string;
        country: string;
      };
      location: {
        latitude: number;
        longitude: number;
      };
      thirdPartyUserData: {
        uniqueId: string;
        cardPan: string;
      };
      insight: {
        riskScore: number;
        riskBand: string;
        anomalousFeatures: string[];
        comment: string;
        updatedAt: string;
      };
      status: string;
      organization: string;
      createdAt: string;
      updatedAt: string;
      assignedTo: string;
      decision: string;
      review: string;
      transactionCustomer: string;
    };
  }[];
  rule: {
    _id: string;
    description: string;
    logic: {
      response: {
        '==': {
          var?: string;
          str?: string;
        }[];
        description: string;
      };
    };
    createdBy: string;
    organization: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
export interface TaxCreditModel {
  base_case: boolean;
  domestic_content: boolean;
  energy_community: boolean;
  prvailing_wage: boolean;
  tax_type: string;
}

export type DataObject = {
  [key: string]: number;
};

export type LabelValuePair = {
  label: string;
  value: number;
};

export type DataObjectTwo = {
  [key: string]: string;
};

interface TaskInfo {
  task_id: string;
  task_state: 'success' | 'failed' | 'running' | 'unknown'; // Add other possible states if needed
}

interface EnrichedData {
  _id: string;
  task_id: string;
  project_id: string;
  date_created: string;
  natural_risk_analysis: TaskInfo;
  geospatial_risk_analysis: TaskInfo;
  regulatory_risk_analysis: TaskInfo;
  dervet_analysis: TaskInfo;
  underwriting_analysis: TaskInfo;
  overview_analysis: TaskInfo;
}

interface AnalysisStates {
  successful: string[];
  failed: string[];
  unknown: string[];
  running: string[];
}

export interface ProjectAnalysisResponse {
  enriched: EnrichedData;
  states: AnalysisStates;
  overall: { failed: boolean; successful: boolean };
}

export interface CreditAnalysisModel {
  firstName?: string;
  lastName?: string;
  password?: string;
  file?: File | null;
  bvn?: number ;
  loanType: string;
  loanAmount: number ;
  loanDuration: number ;
  recipientType: 'business' | 'individual' | '';
  permissions?: {
    fibonacci?: string;
  };
}

export interface ScreeningSettings {
  _id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  organization: string;
  frequency: string;
  type: string;
  status: string;
  next_screening_date: null;
  last_screening_date: null;
  newCustomerCheck: boolean;
}

export interface UpdateScreeningSettingsModel {
  status: string;
  frequency: string;
  newCustomerCheck: boolean;
}

export interface ScreeningData extends UpdateScreeningSettingsModel {
  id: string;
}

export interface ReportModel {
  Result: string;
  Msg: string;
  reportUrl: string;
  project_id: string;
}

export interface BatchMediaModel {
  name?: string;
  type?: string;
  url?: string;
  file?: File;
  isUploaded?: boolean;
  isErrored?: boolean;
  id?: string;
  isUploading?: boolean;
  file_category?: string;
}

export interface BatchProjectModelTest {
  id: string;
  project_name: string;
  project_location?: {
    location: string;
    latitude: number;
    longitude: number;
  };
  project_duration: {
    start_date: string;
    end_date: string;
  };
  tax_credits: {
    employs_registered_apprentice: boolean;
    meet_recommended_wages: boolean;
    materials_and_manufacturing_in_the_us: boolean;
  };
  analysis_case: {
    analysis_case: string;
    use_cases: {
      analysis_case: string;
      case: string;
    }[];
    asset: {
      asset_type: string;
      size: {
        unit: string;
        value: number;
        asset: string;
        id: string;
      }[];
    };
  };
  ppa_cost: {
    value?: number;
    unit?: string;
  };
  frequency_regulation_service_choice: boolean;
  ccost_kw: {
    exists: boolean;
    value: number;
    unit: string;
  };
  inflation_rate: {
    value: number;
    unit: string;
  };
  o_and_m_cost?: {
    value?: number;
    unit?: string;
  };
  decomissioning_cost: {
    value: number;
    unit: string;
  };
  replacement_info: {
    construction_time: {
      value: number | string;
      unit: string;
    };
    replacement_cost: {
      value: number;
      unit: string;
    };
  };
  load_shape_site_type: string[];
  load_shape_data: BatchMediaModel[];
  company_financials_url: BatchMediaModel[];
  tarrif_data: BatchMediaModel[];
  regulatory_data: BatchMediaModel[];
  tarrif_building_type: string[];
  frequency_regulation: {
    user_is_interested: boolean;
    growth_rate_of_frequency_regulation_price: {
      value: number;
      unit: string;
    };
    growth_rate_of_frequency_regulation_energy_price: {
      value: number;
      unit: string;
    };
    energy_option_up: {
      value: number;
      unit: string;
    };
    energy_option_down: {
      value: number;
      unit: string;
    };
    duration_for_energy_reservation: {
      value: number;
      unit: string;
    };
    combined_market_requirement: boolean;
  };
  is_treating_pvc: string;
  is_tarrif_data: boolean | null;
  is_load_shape_data: boolean | null;
  is_replaceable: boolean | null;
}
// Treating PV cost as a PPA?

export interface BatchUpdateProjectTestType {
  type?:
    | "project_name"
    | "project_location"
    | "project_duration"
    | "tax_credits"
    | "analysis_case"
    | "o_and_m_cost"
    | "frequency_regulation"
    | "ppa_cost"
    | "ccost_kw"
    | "decomissioning_cost"
    | "inflation_rate"
    | "load_shape_data"
    | "company_financials_url"
    | "tarrif_data"
    | "regulatory_data"
    | "replacement_info"
    | "tarrif_building_type"
    | "load_shape_site_type"
    | "frequency_regulation_service_choice"
    | "is_treating_pvc"
    | "is_tarrif_data"
    | "is_load_shape_data"
    | "is_replaceable";
}

export interface BatchOverviewModel {
  total_analysis: number;
  processing_analysis: number;
  failed_analysis: number;
  successful_analysis: number;
}

export function search<T>(query: string, items: T[], keys: (keyof T)[]): T[] {
  if (!query) {
    return items; // Return all items if the query is empty
  }

  const lowerCaseQuery = query.toLowerCase();

  return items.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(lowerCaseQuery)
      );
    });
  });
}
export interface ProjectErrors {
  projectName?: string;
  location?: string;
  startDate?: string;
  employs_registered_apprentice?: string;
  meet_recommended_wages?: string;
  materials_and_manufacturing_in_the_us?: string;
  analysis_case: string;
  assetType: string;
  assetSize?: string;
}

export interface SectionBatchModel {
  icon?: React.ReactNode;
  hide?: boolean;
  innerIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: React.ReactNode;
  value?: string;
  wrapperClassName?: string;
  component?: React.ReactNode;
  topComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  error: string;
}

export interface ErrorResponse {
  data?: {
    detail?: string;
    message?: string;
  };
}

export interface ErrorDetails {
  status?: number;
  response?: ErrorResponse;
}

export interface ScreeningResults {
  page: number;
  pageSize: number;
  total: number;
  data: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    organization: string;
    externalId: string;
    firstName: string;
    notes: string;
    lastName: string;
    dob: string;
    score: number;
    type: string;
    screeningDate: string;
  }[];
}

export interface ScreeningResultsID {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  organization: string;
  externalId: string;
  firstName: string;
  notes: null;
  lastName: string;
  country: null | string;
  dob: null;
  score: number;
  type: string;
  screeningDate: string;
  details: {
    authority: null | string;
    post: string[];
    reason: null;
    startDate: null;
    otherNames?: string;
  };
}

export type GenerateReportType =
  | 'Currency Transaction Report - CTR'
  | 'Suspicious Transaction Report - STR';
export type GenerateReportDocumentType = 'pdf' | 'csv';
export interface GenerateReportModel {
  reportType: GenerateReportType;
  documentType: GenerateReportDocumentType;
  data: {
    startDate: string;
    endDate: string;
  };
}

export interface ExportCsvModel {
  type:
    | 'transaction'
    | 'customer'
    | 'blacklisted-customer'
    | 'blacklisted-accounts'
    | 'blacklisted-devices';
  review?: 'needs_review';
  addedToWatchlist?: boolean;
}
export interface MergeMetric {
  has_units: boolean;
  metric: string;
  units: string;
  value: string | number;
  adjusted_metrics: Metric;
}

export interface Metric {
  metric: string;
  value: number | string;
  has_units: boolean;
  units?: string;
}

export interface Metrics {
  original_metrics: Metric[];
  adjusted_metrics: Metric[];
}

interface PlotData {
  hovertemplate: string;
  marker: {
    color: string;
  };
  name: string;
  width: number;
  x: number[];
  y: number[];
  type: string;
}

interface Layout {
  template: any; // This can be further detailed based on the specific structure of the template
  xaxis: {
    tickmode: string;
    tickvals: number[];
    ticktext: string[];
  };
  barmode: string;
  bargap: number;
  bargroupgap: number;
  title: {
    text: string;
  };
  yaxis: {
    title: {
      text: string;
    };
  };
}

interface ComparisonPlot {
  data: PlotData[];
  layout: Layout;
}

export interface WhatIfModel {
  status: string;
  tax_credit_type: string;
  default: number;
  new_value: number;
  metrics: Metrics;
  comparison_plot: ComparisonPlot;
  insight: string;
}

export interface CreditAnalysisFormModel {
  firstName?: string;
  lastName?: string;
  password?: string;
  file?: File | null;
  bvn?: number ;
  loanType: string;
  loanAmount: number ;
  loanDurationInMonths: number ;
  loanDurationInYears: number;
  recipientType: 'business' | 'individual' | '';
 
}

export interface ConfigurationItem {
  id: string;
  label: string;
  value: number;
  symbol: string;
}

export interface ConfigurationSection {
  id: string;
  label: string;
  sectionList: ConfigurationItem[];
}

export type ConfigurationItemDefinition = {
  id: string;
  label: string;
  symbol: string;
};

export type ConfigurationSectionDefinition = {
  label: string;
  items: ConfigurationItemDefinition[];
};

export type ConfigurationStructure = {
  [key: string]: ConfigurationSectionDefinition;
};

interface FinancialAssumptions {
  npv_discount_rate: number;
  property_tax_rate: number;
  state_tax_rate: number;
  federal_tax_rate: number;
  inflation_rate: number;
}

interface CapitalCostAssumptions {
  battery_capital_cost_per_kw: number;
  battery_capital_cost_per_kwh: number;
  solar_capital_cost_per_kw: number;
}

interface OperationalAndMaintenanceCost {
  solar_om_cost_per_kw_year: number;
  storage_om_cost_per_kw_year: number;
}

export interface ConfigurationOutputFormat {
  organizationId: string;
  financial_assumptions: FinancialAssumptions;
  capital_cost_assumptions: CapitalCostAssumptions;
  operational_and_maintenance_cost: OperationalAndMaintenanceCost;
}

export interface ValueLabelPair {
  [key: string]: string;
}

export interface DataItem {
  label: string;
  value: string;
}