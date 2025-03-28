export const SettingsTabType = {
  Team: 'team',
  Role: 'role',
  Webhooks: 'webhooks',
  ApiKeys: 'api-keys',
  Preferences: 'preferences',
};

export type SettingsTabsType =
  (typeof SettingsTabType)[keyof typeof SettingsTabType];

export const SETTINGS_TAB_TYPES = Object.values(SettingsTabType);

export const isValidSettingsTab = (tabParam: SettingsTabsType) =>
  SETTINGS_TAB_TYPES.includes(tabParam);

export const settingsTabList = [
  {
    label: 'Team',
    value: SettingsTabType.Team,
  },
  {
    label: 'Role',
    value: SettingsTabType.Role,
  },
  {
    label: 'Webhooks',
    value: SettingsTabType.Webhooks,
  },
  {
    label: 'API keys',
    value: SettingsTabType.ApiKeys,
  },
  {
    label: 'Preferences',
    value: SettingsTabType.Preferences,
  },
];
