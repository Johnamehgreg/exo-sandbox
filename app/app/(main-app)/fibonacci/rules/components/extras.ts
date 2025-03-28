export const transactionDetailsTabList = [
	{
		label: "Details",
		value: "details"
	},
	{
		label: "Fraud Checks",
		value: "fraudChecks"
	},
	{
		label: "Activity",
		value: "activity"
	}
];

export const RulesTabType = {
	Instruct_Fibonacci: "instruct-fibonacci",
	All_Rules: "all-rules",
	Active: "active",
	Disabled: "disabled"
};

export type RulesTabsType = (typeof RulesTabType)[keyof typeof RulesTabType];

export const RULES_TAB_TYPES = Object.values(RulesTabType);

export const isValidRulesTab = (tabParam:RulesTabsType) => RULES_TAB_TYPES.includes(
	tabParam
);

export const rulesTabList = [
	{
		label: "Instruct Fibonacci",
		value: RulesTabType.Instruct_Fibonacci
	},
	{
		label: "All Rules",
		value: RulesTabType.All_Rules
	},
	{
		label: "Active",
		value: RulesTabType.Active
	},
	{
		label: "Disabled",
		value: RulesTabType.Disabled
	}
];
