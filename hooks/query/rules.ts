import { useQuery } from "@tanstack/react-query";
import apis from "../../services/api-services";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { dynamicQueryEndpoint } from "@/lib/helper";
import { RuleAnalyticsData, RuleGraphData, RuleResponse, RulesAnalyticsTransactionsData, RulesModel } from "@/types/general";
import { useSearchParams } from "next/navigation";

export type RuleQueryParams = {
	page?: number;
	tab?: string;
	pageSize?: number;
	search?: string;
	startDate?: string;
	endDate?: string;
	state?: "inactive" | "active";
	status?: "passed" | "failed";
	sortBy?: string;
	sortOrder?: string;
	period?: string;

};

export type GetRuleGraphQueryParams = {
	year: string;
};

export const useGetRules = () => {
	const [query, setQuery] = useState<RuleQueryParams>({
		page: 1,
		pageSize: 10,
		startDate: "",
		endDate: "",
		search: ""
	});
	const updateQuery = <K extends keyof RuleQueryParams>(
		field: K,
		value: RuleQueryParams[K]
	) => {
		setQuery((prevQuery) => ({
			...prevQuery,
			[field]: value
		}));
	};
	const searchParams = useSearchParams();
	

	const tab = searchParams.get('tab') || '';

	const getQueryState = () => {
		switch(tab){
			case 'active':
				return '&state=active'
			case 'disabled':
				return '&state=inactive'
			default:
				return ''
		}
	} 
	const queryState = `${dynamicQueryEndpoint(query)}${getQueryState()}`



	const { refetch, isLoading, isFetched, isError, isSuccess, error, isPending, isFetching, data, status, isRefetching } =
	useQuery<RuleResponse>({
		queryKey: ['get-state-rules', query, queryState],
		queryFn: async () => {
			const res = await apis.fibonacci.rules.getRules(queryState);
			return res?.data;
		},
	});

	const rulesList = data?.data as  RulesModel[];

	const totalItem = data?.total as number;
	return {
		rulesList,
		isPending,
		refetch,
		isError,
		error,
		isLoading,
		isSuccess,
		isRefetching,
		isFetched,
		isFetching,
		query,
		updateQuery,
		status,
		totalItem
	};
};
export const useConversationRules = () => {
	const [query, setQuery] = useState<RuleQueryParams>({
		page: 1,
		pageSize: 1000000,
		startDate: "",
		endDate: "",
		search: ""
	});
	const updateQuery = <K extends keyof RuleQueryParams>(
		field: K,
		value: RuleQueryParams[K]
	) => {
		setQuery((prevQuery) => ({
			...prevQuery,
			[field]: value
		}));
	};
	const {
		isPending,
		refetch,
		isLoading,
		error,
		isSuccess,
		isFetched,
		isError,
		data
	} = useQuery({
		queryKey: ["get-conversions-rules", query],
		queryFn: () =>
			apis.fibonacci.rules.getRules(
				`?startDate=${query.startDate}&endDate=${query.endDate}&search=${query.search}&page=${query.page}&pageSize=${query.pageSize}`
			)
	});
	const [rules, setRules] = useState<RulesModel[]>([]);
	useEffect(() => {
		if (isSuccess && isFetched) {
			const fetchRules = data?.data?.data;
			const sortedArray = fetchRules.sort((a: RulesModel, b: RulesModel) => {
				const dateA = new Date(format(`${a.createdAt}`, "yyyy-MM-dd"));
				const dateB = new Date(format(`${b.createdAt}`, "yyyy-MM-dd"));
				return dateA.getTime() - dateB.getTime();
			});
			setRules(sortedArray);
		}
	}, [data, setRules, rules, isFetched, isSuccess]);
	return {
		isPending,
		rules,
		refetch,
		isError,
		error,
		isLoading,
		isSuccess,
		query,
		updateQuery
	};
};

export const useGetAutoSuggestionRule = () => {
	const {
		isPending,
		refetch,
		isLoading,
		error,
		isSuccess,
		isFetched,
		isRefetching,
		isError,
		data,
		status,
		isFetching
	} = useQuery({
		queryKey: ["get-auto-suggestion-rules"],
		queryFn: () => apis.fibonacci.rules.getAutoSuggestionRule()
	});
	const [suggestedRules, setSuggestedRules] = useState<string[]>([]);
	useEffect(() => {
		if (isSuccess && isFetched) {
			const fetchRules = data?.data?.rules;
			setSuggestedRules(fetchRules);
		}
	}, [data, setSuggestedRules, suggestedRules, isFetched, isSuccess]);
	return {
		data,
		isPending,
		suggestedRules,
		refetch,
		isError,
		error,
		isLoading,
		isSuccess,
		isRefetching,
		isFetched,
		isFetching,
		status
	};
};

export const useGetRulesAnalytics = (ruleId: string) => {
	const {
		isPending,
		refetch,
		isLoading,
		error,
		isSuccess,
		isFetched,
		isRefetching,
		isError,
		data,
		status,
		isFetching
	} = useQuery<RuleAnalyticsData>({
		queryKey: ["get-rule-analytics", ruleId],
		queryFn: async () => {
			const response = await apis.fibonacci.rules.getRulesAnalytics(ruleId);
			return response.data;
		},
		enabled: !!ruleId
	});

	return {
		data,
		isPending,
		refetch,
		isError,
		error,
		isLoading,
		isSuccess,
		isRefetching,
		isFetched,
		isFetching,
		status
	};
};

export const useGetTransactionsByRuleId = (ruleId: string) => {
	const [query, setQuery] = useState<RuleQueryParams>({
		page: 1,
		pageSize: 10,
		startDate: "",
		endDate: "",
		search: ""
	});
	const updateQuery = <K extends keyof RuleQueryParams>(
		field: K,
		value: RuleQueryParams[K]
	) => {
		setQuery((prevQuery) => ({
			...prevQuery,
			[field]: value
		}));
	};
	const {
		isPending,
		refetch,
		isLoading,
		error,
		isSuccess,
		isFetched,
		isRefetching,
		isError,
		data,
		status,
		isFetching
	} = useQuery<RulesAnalyticsTransactionsData>({
		queryKey: ["get-transactions-by-rule-id", ruleId, query],
		queryFn: async () => {
			const response = await apis.fibonacci.rules.getTransactionsByRuleId(
				ruleId,
				dynamicQueryEndpoint(query)
			);
			return response.data;
		},
		enabled: !!ruleId
	});

	return {
		data,
		isPending,
		refetch,
		isError,
		error,
		isLoading,
		isSuccess,
		isRefetching,
		isFetched,
		isFetching,
		status,
		updateQuery,
		query
	};
};

export const useGetRuleGraph = (ruleId: string) => {
	const [query, setQuery] = useState<RuleQueryParams>({
		page: 1,
		pageSize: 10,
		startDate: "",
		endDate: "",
		search: ""
	});
	const updateQuery = <K extends keyof GetRuleGraphQueryParams>(
		field: K,
		value: GetRuleGraphQueryParams[K]
	) => {
		setQuery((prevQuery) => ({
			...prevQuery,
			[field]: value
		}));
	};

	const {
		isPending,
		refetch,
		isLoading,
		error,
		isSuccess,
		isFetched,
		isRefetching,
		isError,
		data,
		status,
		isFetching
	} = useQuery<RuleGraphData[]>({
		queryKey: ["get-rule-graph", ruleId,query],
		queryFn: async () => {
			const response = await apis.fibonacci.rules.getRuleGraph(
				ruleId,
				dynamicQueryEndpoint(query)
			);
			return response.data;
		},
		enabled: !!ruleId,
	});

	return {
		data,
		isPending,
		refetch,
		isError,
		error,
		isLoading,
		isSuccess,
		isRefetching,
		isFetched,
		isFetching,
		status,
		updateQuery,
		query
	};
};
