import { useUiStore } from '@/app/store/ui.store';
import {
  DataItem,
  DianaProjectModel,
  Insight,
  InsightModel,
  Metric,
  ScoreObject,
  TransformedScore,
  ValueLabelPair
} from '@/types/general';
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import dayjs from 'dayjs';
import { signOut } from 'next-auth/react';
import { SetStateAction } from 'react';
import { routes } from './routes';
import { queryClient } from './utils';

export const formatNumber = (
  num: number | null | undefined,
  decimalPlaces: number = 1
): string => {
  if (num === null || num === undefined) return '-';
  if (typeof num !== 'number') return String(num);

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum < 1000) {
    return `${num}`;
  } else if (absNum >= 1e3 && absNum < 1e6) {
    return `${sign}${(absNum / 1e3).toFixed(decimalPlaces)}k`;
  } else if (absNum >= 1e6 && absNum < 1e9) {
    return `${sign}${(absNum / 1e6).toFixed(decimalPlaces)}M`;
  } else if (absNum >= 1e9 && absNum < 1e12) {
    return `${sign}${(absNum / 1e9).toFixed(decimalPlaces)}B`;
  } else {
    return `${sign}${(absNum / 1e12).toFixed(decimalPlaces)}T`;
  }
};

export const formatTimeWithTimezone = (
  timezone: string,
  date: Date = new Date()
): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone || 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dynamicQueryEndpoint = (params: {
  [key: string]: unknown;
}): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const fibonacciTransactionOverviewChartOptions = [
  { label: 'Last 7 Days', value: '7' },
  { label: 'Last 14 Days', value: '14' },
  { label: 'Last 30 Days', value: '30' },
  { label: 'Last month', value: 'lastMonth' },
];

export const parseAndFormatDate = (val: string | number) => {
  try {
    const date = typeof val === 'string' ? parseISO(val) : new Date(val);

    if (isValid(date)) {
      return format(date, 'MMM do, yyyy');
    } else {
      return 'Invalid Date';
    }
  } catch {
    return 'Invalid Date';
  }
};

export const getRiskLevel = (riskLevel: string) => {
  switch (riskLevel?.toLowerCase()) {
    case 'low':
      return {
        cardClassName: 'bg-green-50',
        textClassName: 'text-green-800',
        color: '#10B981',
        secondCardClassName: 'bg-green-200',
        iconClass: 'rotate-180',
        hex: '#F0FDF4',
      };
    case 'medium':
      return {
        cardClassName: 'bg-blue-50',
        secondCardClassName: 'bg-blue-200',
        textClassName: 'text-blue-600',
        color: '#1E40AF',
        iconClass: 'rotate-180',
        hex: '#EFF6FF',
      };
    case 'high':
      return {
        cardClassName: '!bg-red-50',
        secondCardClassName: 'bg-red-200',
        textClassName: 'text-red-800',
        color: '#EF4444',
        iconClass: 'rotate-0',
        hex: '#FEF2F2',
      };
    default:
      return {
        cardClassName: 'bg-green-50',
        textClassName: 'text-vibrant-green',
        secondCardClassName: 'bg-green-200',
        color: '#10B981',
        iconClass: 'rotate-180',
      };
  }
};

export const formatLargeNumber = (value: number | string): string => {
  if (typeof value !== 'number') {
    // Return the value as-is if it's not a number
    return value;
  }

  if (value >= 1_000_000_000) {
    // For billions
    return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
  } else if (value >= 1_000_000) {
    // For millions
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  } else if (value >= 1_000) {
    // For thousands
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  } else {
    // For values less than 1000
    return value.toString();
  }
};

export const getCurrencySymbol = (currencyCode: string): string => {
  try {
    const formatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      compactDisplay: 'short',
      currencyDisplay: 'narrowSymbol',
    });
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find((part) => part.type === 'currency');
    return symbolPart?.value || currencyCode;
  } catch {
    return currencyCode;
  }
};

export const getDocumentType = (type: string) => {
  if (type.includes('csv') || type.includes('pdf')) return 'Document';
  return 'Document';
};

export const convertToCSV = (data: unknown[]) => {
  if (data.length === 0) return '';

  const firstRow = data[0] as Record<string, unknown>;
  const keys = Object.keys(firstRow);
  const csvRows = [];

  // Add header row
  csvRows.push(keys.join(','));

  // Process each row of data
  for (const row of data) {
    const values = keys.map((key) => {
      // @ts-expect-error typescript is not smart enough to know that row is a Record<string, unknown>
      let val = row[key];
      if (val === null || val === undefined) {
        return '';
      }
      val = val.toString();

      // Check if the field contains a comma, double quote, or newline
      if (/[",\n]/.test(val)) {
        // Escape double quotes by replacing " with ""
        val = '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

export const downloadCSV = (data: unknown[], fileName?: string) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export function formatTransactionDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleDateString('en-GB', options).replace(',', '');
}

export const formatDateAndTime = (
  dateString: string
): { formattedDate: string; formattedTime: string } => {
  const date = new Date(dateString);

  // Format the date as "DD MMM YYYY"
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Format the time as "hh:mm am/pm"
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return { formattedDate, formattedTime };
};

export const formattedAmount = (
  amount: number,
  currency: string,
  addKSuffix: boolean = false
) => {
  if (amount) {
    let formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      compactDisplay: 'short',
      currencyDisplay: 'narrowSymbol',
    }).format(amount);

    if (addKSuffix && amount >= 1000) {
      formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        currencyDisplay: 'narrowSymbol',
      }).format(amount);
    }
    return formattedAmount.replace(/(\D)(?!^)/, '$1 ');
  }
  return 0;
};

export const getFirstLatter = (name: string) => {
  return name.slice(0, 1);
};

export interface GetAiSessionResponse {
  session: string;
}

export const getMonthName = (monthNumber: number) => {
  return monthNames[monthNumber - 1];
};

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
    const year = 2000 + i;
    return { value: year.toString(), label: year.toString() };
  });
};
export const downloadCSVTemplate = () => {
  const data = [
    {
      customer: 'insert 5-10 digit number',
      device: 'insert 5-10 digit alphanumeric value',
      sender: 'insert 10 digit account number',
      receiver: 'insert 10 digit account number',
    },
  ];
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `blacklist_template.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const getUrlParams = (url: string) => {
  const urlParams = new URLSearchParams(url?.split('?')[1]);
  const tabValue = urlParams.get('tab');
  return tabValue;
};

export const getDuration = (dates: {
  startDate: string | null;
  endDate: string | null;
}) => {
  const { startDate, endDate } = dates;
  if (startDate === 'null' || endDate === 'null') {
    return null;
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const formattedRange = `${start.format('MMM, YYYY')} - ${end.format('MMM, YYYY')}`;
  return formattedRange;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getChartArray = (array: any) => {
  if (array)
    return (
      Object.entries(array)
        .map(([name, chart]) => ({ name, chart }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((item: any) => item.chart?.data)
    );
  return [];
};

export const getScoreArray = (
  score: ScoreObject | null | undefined
): TransformedScore[] => {
  // Check if score is null, undefined, or an empty object
  if (!score || Object.keys(score).length === 0) {
    return [];
  }

  const transformedScore: TransformedScore[] = Object.entries(score).map(
    ([key, [value, riskLevel]]) => ({
      name: key,
      value,
      riskLevel,
    })
  );

  return transformedScore;
};

export const getInsightScoreArray = (arg: {
  insightList: Insight[];
  scoreList: TransformedScore[];
}): InsightModel[] => {
  const { insightList, scoreList } = arg;

  // Check if insightList or scoreList is empty, undefined, or null
  if (!insightList || insightList.length === 0) {
    return [];
  }

  // Combine the two lists into CombinedItem[]
  const combineList: InsightModel[] = insightList?.map((insight, index) => ({
    ...insight,
    scoreDetail: !scoreList || scoreList.length === 0 ? null : scoreList[index],
  }));

  return combineList;
};

export const formatName = (name: string | undefined) => {
  return name ? name.replace(/_/g, ' ') : '';
};

/**
 * Generates pseudo-code from JSON logic data.
 * @param {Object} logic - The logic object to parse.
 * @returns {string} - The pseudo-code representation of the logic.
 */
// @ts-expect-error not defined
export const generatePseudoCode = (logic) => {
  const operatorMap = {
    '==': '===',
    '===': '===',
    '>=': '>=',
    '<=': '<=',
    '>': '>',
    '<': '<',
    and: '&&',
    or: '||',
    not: '!',
    greater_than: '>',
    less_than: '<',
    in: 'includes',
  };

  // @ts-expect-error Ts doesn't know about the condition object
  const parseCondition = (condition) => {
    if (Array.isArray(condition)) {
      return condition?.map(parseCondition)?.join(' && ');
    }

    if (typeof condition === 'object') {
      const [operator, values] = Object.entries(condition)[0];
      // @ts-expect-error Ts doesn't know about the operatorMap object
      const readableOperator = operatorMap[operator] || operator;

      if (Array.isArray(values)) {
        return values?.map(parseCondition)?.join(` ${readableOperator} `);
      }

      if (operator === 'var') {
        return values;
      }

      return `${readableOperator} ${parseCondition(values)}`;
    }

    return typeof condition === 'string'
      ? condition
      : JSON.stringify(condition);
  };

  // @ts-expect-error Ts doesn't know about the response object
  const formatIfLogic = (response) => {
    const [condition, outcome] = response.if;
    const conditionParsed = parseCondition(condition);

    const thenBranch = outcome.then ? `return ${outcome.then};` : '';
    const elseBranch = outcome.else ? `else return ${outcome.else};` : '';

    return `if (${conditionParsed}) {\n  ${thenBranch}\n} ${elseBranch}`;
  };

  // @ts-expect-error Ts doesn't know about the logic object
  const parseLogic = (logicObj) => {
    if (logicObj?.if) {
      return formatIfLogic(logicObj);
    }

    if (logicObj?.and) {
      return parseCondition({ and: logicObj.and });
    }

    return parseCondition(logicObj);
  };

  // Handle both logic.response and logic root-level logic
  if (logic?.response) {
    return parseLogic(logic.response);
  }

  if (logic?.and) {
    return parseLogic(logic);
  }

  return null;
};

export function getTimeAgo(startDateString: Date): string {
  try {
    const startDate = new Date(startDateString);
    return formatDistanceToNow(startDate, { addSuffix: true });
  } catch (error) {
    console.error("Error parsing date string:", error);
    return 'Invalid date';
  }
}

export const formatFileSize = (bytes: number, decimalPlaces = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = parseFloat((bytes / Math.pow(1024, i)).toFixed(decimalPlaces));

  return `${size} ${sizes[i]}`;
};

export const truncateString = (str: string | undefined, maxLength: number) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

  export const handleCopy = async (requestId: string, setCopied: (value: SetStateAction<boolean>) => void) => {
    try {
      await navigator.clipboard.writeText(requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

export const getSortedProject = (projects: DianaProjectModel[]) => {
  const sortedProjectList = projects
    ?.filter((fItem) => fItem?.description)
    ?.sort((a, b) => {
      const aCompleted = a.completed ? 1 : 0;
      const bCompleted = b.completed ? 1 : 0;
      return bCompleted - aCompleted;
    });
  return sortedProjectList;
};

export const getProjectAbbreviation = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

export const getProjectLink = ({
  completed,
  projectId,
}: {
  completed: boolean;
  projectId: string;
}) => {
  const link = completed
    ? routes.diana.overview(projectId as string)
    : routes.diana.onboardingId(projectId as string);
  return link;
};

export const getFileSize = (fileSize: number) => {
  if (typeof fileSize === 'number' && fileSize > 0) {
    return (fileSize / (1024 * 1024)).toFixed(2); // Convert bytes to MB
  }
  return '0.00'; // Return as a string for consistency
};


export const getMetricValue = (metric: Metric) => {
  if (!metric?.has_units) {
    return metric?.value;
  }

  const units = metric.units?.toLocaleLowerCase();

  if (units?.includes("year")) {
    return `${metric.value} ${metric.units}`;
  }

  return `${getCurrencySymbol(metric.units as string)} ${metric.value}`;
};

export const getDateDeference = (start_date: string, secondDate: string) => {
    const date1 = dayjs(start_date).format("YYYY");
    const date2 = dayjs(secondDate).format("YYYY");
    const differenceInYears = parseInt(date2, 10) - parseInt(date1, 10);
    return differenceInYears || 0
}
export const logOut = () => {
   useUiStore.getState().setDashboardType("dashboard");
    localStorage.clear()
    queryClient.clear();
      signOut({
          callbackUrl: '/',
    });
  }

  export const convertToLabelValueList = (data: ValueLabelPair): DataItem[] => {
    if(!data) return []
    return Object.entries(data)?.map(([label, value]) => ({
      label,
      value
    }));
  }