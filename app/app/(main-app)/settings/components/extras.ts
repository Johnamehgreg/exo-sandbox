export const SettingsType = {
  Profile: 'profile',
  Organization: 'organization',
  ChangePassword: 'changePassword',
  Team: 'team',
  Notifications: 'notifications',
};

export type SettingTabsType = (typeof SettingsType)[keyof typeof SettingsType];

export const SETTINGS_TAB_TYPES = Object.values(SettingsType);

export const isValidSettingsTab = (tabParam: SettingTabsType) =>
  SETTINGS_TAB_TYPES.includes(tabParam);

export const settingsTabList = [
  {
    label: 'Profile',
    value: SettingsType.Profile,
  },
  {
    label: 'Organization',
    value: SettingsType.Organization,
  },
  {
    label: 'Change password',
    value: SettingsType.ChangePassword,
  },
  {
    label: 'Team',
    value: SettingsType.Team,
  },
  {
    label: 'Notifications',
    value: SettingsType.Notifications,
  },
];

export const organizationIndustryList = [
  'Finance & Insurance',
  'Real Estate Rental & Leasing',
  'Construction',
  'Utilities',
  'Agriculture',
  'Forestry',
  'Fishing',
  'Hunting',
  'Accommodation & Food Services',
  'Mining',
  'Transportation & Warehousing',
];
