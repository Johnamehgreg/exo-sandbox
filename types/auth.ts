import { NotificationModel, OrganizationModel } from './general';

export interface FormLoginValue {
  email: string;
  password: string;
}
export interface FormSignUpValue {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  otp?: number;
}
export interface FormRequestDemoValue {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  interests: string[];
}

export interface SessionUser {
  email?: string;
  firstName?: string;
  token?: string;
  lastName?: string;
  iso2?: string;
  country?: string;
  role?: 'employee' | 'admin';
  phoneNumber?: string;
  refreshToken?: string;
  jobTitle?: string;
  isOwner?: boolean;
  agentAccess?: string[];
  organization?: OrganizationModel | string;
  notificationSettings?: NotificationModel;
  _id?: string;
}
