import { ApprovedModel } from '@/hooks/mutate/use-transaction';
import {
  azureBlobServer,
  server,
  serverDiana,
  serverDianaApi,
  serverFibonacci,
} from '@/lib/axios-util';
import { FormRequestDemoValue, FormSignUpValue } from '@/types/auth';
import { OnboardingDianaChatItem } from '@/types/diana-onboarding-type';
import { EuclidCreditAnalysisSchema } from '@/types/euclid-credit-analysis';
import {
  BatchProjectModelTest,
  BlacklistInitiate,
  BlacklistValueModel,
  BulkUploadData,
  DianaMessageMode,
  EscalateModel,
  ExportCsvModel,
  FibonacciMessageModel,
  GenerateReportModel,
  GetTransactionInsightModel,
  NotificationModel,
  OrganizationModel,
  RulesModel,
  ScenariosMessageMode,
  SettingsFRoleModel,
  TeamMemberModel,
  TestRuleModel,
  TransactionNoteModel,
  UpdateScreeningSettingsModel,
  WebhookPostData,
} from '@/types/general';
import { Session } from 'next-auth';

const apis = {
  auth: {
    user: {
      forgetPassword: (data: { email: string }) =>
        server.post('/user/forgot-password', data),
      resetPassword: (data: { password: string; token: string }) =>
        server.post('/user/reset-password', data),
      updateProfile: (data: Session['user']) =>
        server.put('/user/update-profile', data),
      getUserProfile: () => server.get('/user/profile'),
      changePassword: (data: { oldPassword: string; newPassword: string }) =>
        server.put('/user/update-password', data),
      sendRegistrationOtp: (data: { email: string; firstName: string }) =>
        server.post('/common/send-email-otp', data),
      register: (data: FormSignUpValue) => server.post('/user/register', data),
    },
  },
  organization: {
    updateOrganization: (data: OrganizationModel) =>
      server.put(`/user/update-organization`, data),
  },
  notification: {
    updateNotification: (data: NotificationModel) =>
      server.put(`/user/update-notification-settings`, data),
  },
  blacklist: {
    initiate: (data: BlacklistInitiate) =>
      server.post('/blacklist/bulk-upload/initiate', data),
    uploadToAzureBlob: (data: { url: string; file: File }) =>
      azureBlobServer.put(data?.url, data.file, {
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': data.file.type,
        },
      }),
    bulkUpload: (data: BulkUploadData) =>
      server.post('/blacklist/bulk-upload', data),
    deleteBlacklist: (url: string) => server.delete(url),
    createBlacklist: (data: BlacklistValueModel) =>
      server.post('/blacklist/black-list', data),
    getBlacklistTransaction: (id: string) =>
      server.get(`/blacklist/transaction-state/${id}`),
    getBlacklist: (url: string) => server.get(url),
    getSingleBlacklist: (url: string) => server.get(url),
  },
  apiKeys: {
    getApiKeys: (query?: string) => server.get(`/api-key${query}`),
    generateApiKey: () => server.post('/api-key/generate'),
    revokeApiKey: (id: string) => server.delete(`/api-key/${id}`),
  },
  webhooks: {
    getWebhook: () => server.get('/webhook'),
    addWebhook: (data: WebhookPostData) => server.post('/webhook', data),
    disableWebhook: () => server.delete('/webhook'),
    generateNewWebhookKey: () => server.get('/webhook/key'),
  },
  fibonacci: {
    exportCsv: (data: ExportCsvModel) =>
      server.post('/fibonacci/export-csv', data),
    getTransactionInsight: (data: GetTransactionInsightModel) =>
      server.post('/fibonacci/organization/transactions/insights', data),
    getFibonacciOverview: () =>
      server.get('/fibonacci/organization/transactions/dashboard/overview'),
    getFibonacciQuickCount: () =>
      server.get('/fibonacci/organization/dashboard/quick-count'),
    getFibonacciTransactionAnalytics: () =>
      server.get('/fibonacci/organization/transactions/overview'),
    getFibonacciTransactionChartData: (query: string) =>
      server.get(`/fibonacci/organization/transactions/graph-data/${query}`),
    createInsightChat: (data: FibonacciMessageModel) =>
      serverFibonacci.post('/exoai/fibonacci/insightChat', data),
    transaction: {
      createTransactionNote: (
        data: TransactionNoteModel,
        transactionId: string
      ) =>
        server.post(`/fibonacci/add-transaction-note/${transactionId}`, data),
      approvedTransaction: (data: ApprovedModel, transactionId: string) =>
        server.post(`/fibonacci/approve-transaction/${transactionId}`, data),
      escalateTransaction: (data: EscalateModel, transactionId: string) =>
        server.post(`/fibonacci/escalate-transaction/${transactionId}`, data),
      escalateCase: (data: EscalateModel) =>
        server.post('/fibonacci/cases/escalate', data),
      getSingleTransaction: (id: string) =>
        server.get(`/fibonacci/transactions/${id}`),
      getTransactionNote: (id: string) =>
        server.get(`/fibonacci/transaction-notes/${id}`),
      getTransactionIssuer: (query?: string) =>
        server.get(`/fibonacci/transaction-issuers${query}`),
      getTransactions: (query?: string) =>
        server.get(`/fibonacci/transactions${query}`),
      getTransactionActivity: (query: string, id: string) =>
        server.get(`/fibonacci/transactions/${id}/activity${query}`),
    },
    getAiSession: () => server.get('/fibonacci/get-ai-session'),
    customers: {
      getAllCustomers: (query: string) =>
        server.get(`/fibonacci/customers${query}`),
      getCustomerDetails: (id: string) =>
        server.get(`/fibonacci/customer/${id}`),
      addCustomerToBlacklist: (customerId: string, action: 'add' | 'remove') =>
        server.post(
          `/fibonacci/update-customer-blacklist/${action}/${customerId}`
        ),
      addCustomerToWatchlist: (customerId: string, action: 'add' | 'remove') =>
        server.post(
          `/fibonacci/update-customer-watchlist/${action}/${customerId}`
        ),
      getCustomerDeviceTrail: (customerId: string, query: string) =>
        server.get(`/fibonacci/device-trail/${customerId}${query}`),
      getCustomerLocationTrail: (customerId: string, query: string) =>
        server.get(`/fibonacci/location-trail/${customerId}${query}`),
      getCustomerTransactionChart: (customerId: string, query: string) =>
        server.get(`/fibonacci/customer/${customerId}/metrics${query}`),
    },
    rules: {
      getRules: (query?: string) => server.get(`/fibonacci/rules${query}`),
      getRulesAnalytics: (id?: string) =>
        server.get(`/fibonacci/rules/${id}/analysis`),
      getTransactionsByRuleId: (id: string, query?: string) =>
        server.get(`/fibonacci/rules/${id}/transactions${query}`),
      getRuleGraph: (id: string, query?: string) =>
        server.get(`/fibonacci/rules/${id}/graph${query}`),
      getAutoSuggestionRule: () => server.get(`/fibonacci/auto-suggest-rules`),
      updateRule: (action: string) =>
        server.put(`/fibonacci/update-rule-state/${action}`),
      createRule: (data: RulesModel) =>
        server.post('/fibonacci/create-rule', data),
      testRule: (data: TestRuleModel) =>
        server.post('/fibonacci/test-rule', data),
    },
    team: {
      getTeamMember: (query?: string) =>
        server.get(`/fibonacci/team-members${query}`),
      updateTeamMember: (data: TeamMemberModel, id: string) =>
        server.put(`/fibonacci/update-team-member/${id}`, data),
      createTeamMember: (data: TeamMemberModel) =>
        server.post('/fibonacci/add-team-member', data),
      deleteTeamMember: (id: string) =>
        server.delete(`/fibonacci/remove-team-member/${id}`),
    },
    role: {
      getRoles: (query?: string) => server.get(`/fibonacci/roles${query}`),
      updateRole: (data: SettingsFRoleModel, id: string) =>
        server.put(`/fibonacci/update-role/${id}`, data),
      createRole: (data: SettingsFRoleModel) =>
        server.post('/fibonacci/create-role', data),
      deleteRole: (params: string) =>
        server.delete(`/fibonacci/delete-role/${params}`),
    },
    permissions: {
      getPermissions: () => server.get(`/fibonacci/permissions`),
    },
  },
  team: {
    getTeamMembers: (query?: string) =>
      server.get(`/user/team-members${query}`),
    updateTeamMember: (data: TeamMemberModel, id: string) =>
      server.put(`/user/update-team-member/${id}`, data),
    createTeamMember: (data: TeamMemberModel) =>
      server.post('/user/add-team-member', data),
    deleteTeamMember: (id: string) =>
      server.delete(`/user/delete-team-member/${id}`),
  },
  diana: {
     
    updateWhatIf: (url: string) =>
      serverDiana.post(`/what-if-tax-credit${url}`),
    getDiana: () => server.get(`/diana/`),
    getAnalysis(type: string, projectId: string) {
      return serverDianaApi.get(
        `/get_specificRiskTab?project_id=${projectId}&tab=${type}`
      );
    },
    project: {
      getDianaProject: (userId: string) =>
        serverDianaApi.get(`/diana/projects?user_id=${userId}`),
      dianaOnboardingProjectAnalysis: (projectId: string) =>
        serverDiana.post(`v1/project/${projectId}/submit`),
      createDianaProject: () => serverDianaApi.post('/diana/project'),
      createDianaAnalyzedProject: ({
        values,
        url,
      }: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        values: any;
        url: string;
      }) => serverDiana.post(url, values),
      deleteProject: (project_id: string) =>
        serverDianaApi.delete(`/diana/project/${project_id}`),
      projectAnalysisStatus: (project_id: string) =>
        serverDianaApi.get(`/project/${project_id}/analysis/state`),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getProjectReport: (project_id: any) =>
        serverDiana.post(`/v2/diana/project/report?project_id=${project_id}`),
    },
    batch: {
      getAllBatchAnalysis: (query?: string) =>
        serverDianaApi.get(`/v1/batches${query}`),
      getAllBatchAnalysisDetail: (query?: string) =>
        serverDianaApi.get(`/v1/batch${query}`),
      getSingleBatchAnalysis: (id?: string) =>
        serverDianaApi.get(`/v1/batch/${id}`),
      getBatchOverview: () => serverDianaApi.get(`/analysis/stats`),
      createBatchAnalysis: (data: {
        batch_name: string;
        organization_id: string;
        projects: BatchProjectModelTest[];
      }) => serverDianaApi.post('/v1/batch-analysis', data),
      deleteBatchProject: ({
        batchId,
        projectId,
      }: {
        batchId: string;
        projectId: string;
      }) => serverDianaApi.delete(`/batch/${batchId}/project/${projectId}`),
    },
    chat: {
      getDianaChatHistory: (projectId: string, projectType: string) => {
        if (projectType === 'real_estate') {
          return serverDiana.get(
            `/chat-history-real-estate?project_id=${projectId}`
          );
        }
        return serverDianaApi.get(`/diana/chat-history/${projectId}`);
      },
      getAskDianaChatHistory: (
        projectId?: string,
        section?: string,
        isExplore?: boolean
      ) => {
        if (isExplore)
          return serverDiana.get(
            `/diana-chat-history-scenario?project_id=${projectId}`
          );
        return serverDiana.get(
          `/diana-chat-history?project_id=${projectId}&section=${section}`
        );
      },
      getAskDianaChatRecommendation: (projectId: string) => {
        return serverDiana.post(
          `/get_chat_recommendations?project_id=${projectId}`
        );
      },
      createDianaChat: ({
        projectId,
        value,
        projectType,
      }: {
        projectId?: string;
        value?: OnboardingDianaChatItem;
        projectType?: string | null;
      }) => {
        const payload = value
          ? {
              ...value,
              project_id: projectId,
            }
          : null;

        const apiEndpoint =
          projectType === 'real_estate' ? serverDiana : serverDianaApi;
        return apiEndpoint.post(
          `/project/${projectId}/onboarding/conversation`,
          payload
        );
      },
      createAskDianaChat: ({ value }: { value: DianaMessageMode }) => {
        return serverDiana.post(`/get_chat_response`, value);
      },
      createScenariosChat: ({ value }: { value: ScenariosMessageMode }) => {
        return serverDiana.post(`/get_chat_response-scenario`, value);
      },
    },
    configuration: {
      getConfiguration: (url: string) =>
        serverDiana.post(`/get-diana-configurations${url}`),
      resetConfiguration: (url: string) =>
        serverDiana.post(`/diana-reset-configuration${url}`),
      updateConfiguration: (data: any) =>
        serverDiana.post(`/diana-edit-configuration`, data),
    },
  },
  common: {
    getCommonProducts: () => server.get(`/common/products`),
    requestDemo: (data: FormRequestDemoValue) =>
      server.post('/common/request-demo', data),
    verifyEmail: (data: { email: string }) =>
      server.post('/common/verify-user-email', data),
    uploadFile: (file: FormData) => server.post('/common/upload', file),
  },
  screening: {
    getSettings: () => server.get('/screening/settings'),
    updateSettings: (id: string, data: UpdateScreeningSettingsModel) =>
      server.put(`/screening/settings/${id}`, data),
    screeningResults: (customerId: string, query: string) =>
      server.get(`/screening/results/${customerId}${query}`),
    getScreeningResult: (customerId: string, resultId: string) =>
      server.get(`/screening/results/${customerId}/${resultId}`),
    runCheck: () => server.post('/screening/organization'),
  },
  reports: {
    generateReport: (data: GenerateReportModel) =>
      server.post(
        `/report/generate/${data?.reportType}/${data?.documentType}`,
        data?.data
      ),
  },
  euclid: {
    getFileUrl: async (bankStatement: File | null) => {
      if (!bankStatement) {
        throw new Error("No file selected for upload");
      }
  
      const formData = new FormData();
      formData.append("file", bankStatement);
  
      try {
        const response = await serverDianaApi.post("/v1/credit-analyis/upload-file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    uploadCreditAnalysisRequest: (creditAnalysisForm:EuclidCreditAnalysisSchema) => {
      try {
        const response = serverDianaApi.post("/v1/credit-analysis/submit-request", creditAnalysisForm,);
        return response;
      } catch (error) {
        throw error;
      }

    }
  }
};

export default apis;
