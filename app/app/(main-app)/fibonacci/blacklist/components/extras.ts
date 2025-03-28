export const BlacklistType = {
  Customers: 'users',
  Devices: 'devices',
  Accounts: 'accounts',
};

export type BlacklistTabsType =
  (typeof BlacklistType)[keyof typeof BlacklistType];

export const BLACKLIST_TAB_TYPES = Object.values(BlacklistType);

export const isValidBlacklistTab = (tabParam: BlacklistTabsType) =>
  BLACKLIST_TAB_TYPES.includes(tabParam);

export const blacklistTabList = [
  {
    label: 'Customers',
    value: BlacklistType.Customers,
  },
  {
    label: 'Devices',
    value: BlacklistType.Devices,
  },
  {
    label: 'Accounts',
    value: BlacklistType.Accounts,
  },
];
