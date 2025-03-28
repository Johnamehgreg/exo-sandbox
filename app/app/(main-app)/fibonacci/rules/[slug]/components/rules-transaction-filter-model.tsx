import {
	Box,
	Button,
	Drawer,
	Flex,
	Text,
	ActionIcon,
	Select
} from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { useState } from "react";
import { format } from "date-fns";
import { IconDate } from "@/public/assets/svg/icon-date";
import { IconClose } from "@/public/assets/svg/icon-close";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { RuleQueryParams } from "@/hooks/query/rules";
interface Props {
	isVisible: boolean;
	onClose: () => void;
	updateQuery: <K extends keyof RuleQueryParams>(
		field: K,
		value: RuleQueryParams[K]
	) => void;
}

const RulesTransactionFilterModel = ({
	isVisible,
	onClose,
	updateQuery
}: Props) => {
	const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([
		null,
		null
	]);
	const [ruleState, setRuleState] = useState("");
	const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);
	const handleDate = (dates: DatesRangeValue) => {
		setDate(dates);
		if (dates[0] !== null && dates[1] !== null) {
			setSelectedDate(dates);
			return;
		} else if (dates[0] === null && dates[1] === null) {
			setDate(selectedDate);
		}
	};

	const onApplyFilter = () => {
		if (selectedDate[0] !== null && selectedDate[1] !== null) {
			const startDate = format(`${selectedDate[0]}`, "yyyy-MM-dd");
			const endDate = format(`${selectedDate[1]}`, "yyyy-MM-dd");
			updateQuery("startDate", startDate);
			updateQuery("endDate", endDate);
		}

		if (ruleState) {
			// @ts-expect-error Ts ignore
			updateQuery("status", ruleState);
		}
		onClose();
	};

	const onClearFilter = () => {
		updateQuery("startDate", "");
		updateQuery("endDate", "");
		setDate([null, null]);
		setRuleState("");
		onClose();
	};

	return (
		<Drawer
			offset={8}
			radius="md"
			classNames={{
				body: "!p-0 "
			}}
			position="right"
			withCloseButton={false}
			overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
			opened={isVisible}
			shadow="xs"
			onClose={onClose}
		>
			<Flex className="h-[56px] items-center dashboard-border border-x-0 border-t justify-between px-4">
				<Text className="filter-modal-header">Filter rules</Text>

				<ActionIcon variant="white" onClick={() => onClose()}>
					<IconClose />
				</ActionIcon>
			</Flex>
			<Box className="px-4 flex-1 pt-8 overflow-y-scroll  h-[calc(100vh-140px)] ">
				<DatePickerInput
					mb={"md"}
					classNames={{
						input: "rounded-[4px]"
					}}
					label={"Date range"}
					leftSection={<IconDate />}
					type="range"
					placeholder="Pick dates"
					value={date}
					onChange={handleDate}
					allowSingleDateInRange
				/>
				<Select
					size="md"
					mb={"md"}
					classNames={{
						input: "rounded-[8px]"
					}}
					rightSection={<IconDropDown className="w-3" />}
					label="Status"
					placeholder="Select status"
					data={[
						{ value: "passed", label: "Passed" },
						{ value: "failed", label: "Failed" }
					]}
					value={ruleState}
					onChange={(value) => setRuleState(value as string)}
				/>
			</Box>
			<Flex className="h-[68px] items-center dashboard-border !border-x-0 !border-b-0 justify-between px-4">
				<Button onClick={onClearFilter} variant='default'>
					Clear filters
				</Button>
				<Button onClick={onApplyFilter}>Apply filters</Button>
			</Flex>
		</Drawer>
	);
};

export default RulesTransactionFilterModel;
