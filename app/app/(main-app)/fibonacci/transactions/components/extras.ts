import { ActivityLogAction } from '@/types/general';

export const getActivityLogDescription = (
  action?: ActivityLogAction
): string => {
  const descriptions: { [key in ActivityLogAction]?: string } = {
    [ActivityLogAction.TRANSACTION_CREATED]: 'Transaction has been created',
    [ActivityLogAction.TRANSACTION_ASSIGNED]: 'Transaction has been assigned',
    [ActivityLogAction.TRANSACTION_APPROVED]: 'Transaction has been approved',
    [ActivityLogAction.FRAUD_CHECK_INITIATED]: 'Fraud check has been initiated',
    [ActivityLogAction.TRANSACTION_ESCALATED]: 'Transaction has been escalated',
    [ActivityLogAction.TRANSACTION_BLOCKED]: 'Transaction has been blocked',
    [ActivityLogAction.RECIPIENT_ACCOUNT_BLACKLISTED]:
      'Recipient account has been blacklisted',
    [ActivityLogAction.CUSTOMER_ACCOUNT_BLACKLISTED]:
      'Customer account has been blacklisted',
    [ActivityLogAction.DEVICE_BLACKLISTED]: 'Device has been blacklisted',
    [ActivityLogAction.TRANSACTION_NEED_REVIEW]: 'Transaction needs review',
  };
  return descriptions[action as ActivityLogAction] || 'Unknown action';
};

export const riskLevelOptions = [
  { value: 'low_risk', label: 'Low' },
  { value: 'high_risk', label: 'High' },
];
