import { Box, Text } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
	title: string;
	value: string | number;
	additionalInfo?: ReactNode;
};

const RulesAnalyticsMetricCard = ({ title, value, additionalInfo }: Props) => {
	return (
		<Box className="space-y-3">
			<Text className="font-normal text-[13px] leading-5 text-text-secondary">
				{title}
			</Text>
			<Text className="font-medium text-2xl leading-9 text-text">{value}</Text>
			{additionalInfo && <>{additionalInfo}</>}
		</Box>
	);
};

export default RulesAnalyticsMetricCard;
