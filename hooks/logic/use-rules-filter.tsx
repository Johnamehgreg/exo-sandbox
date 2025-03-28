import { DatesRangeValue } from "@mantine/dates";
import { useState } from "react";
import { format } from "date-fns";
import { RuleQueryParams } from "../query/rules";



export const useRuleFilter = ({onClose, updateQuery}: { onClose: () => void, 
   updateQuery?: <K extends keyof RuleQueryParams>(
    field: K,
    value: RuleQueryParams[K]
  ) => void;}) => {
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

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
      updateQuery?.("startDate", startDate);
      updateQuery?.("endDate", endDate);
    }
    onClose();
  };
  const onClearFilter = () => {
    updateQuery?.("startDate", "");
    updateQuery?.("endDate", "");
    setDate([null, null]);
    onClose();
  };
  return {
    handleDate,
    date,
    onClearFilter,
    onApplyFilter
  }
}