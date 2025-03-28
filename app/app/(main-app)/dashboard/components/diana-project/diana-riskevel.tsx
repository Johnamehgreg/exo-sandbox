export const DianaRiskLevel = ({
  level,
  score,
}: {
  level: string;
  score: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[14px] font-medium text-gray-600">Risk:</span>
      <span
        className={`text-[14px] font-medium ${
          level?.toLowerCase() === 'low'
            ? 'border-green-600 text-green-600'
            : level?.toLowerCase() === 'medium'
              ? 'border-blue-700 text-blue-700'
              : level?.toLowerCase() === 'high'
                ? 'border-error-600 text-red-600'
                : 'text-gray-600'
        }`}
      >
        {score}/10
      </span>
      <div
        className={`rounded-md border px-2 py-1 text-[12px] font-medium capitalize ${
          level?.toLowerCase() === 'low'
            ? 'border-green-600 bg-green-50 text-green-600'
            : level?.toLowerCase() === 'medium'
              ? 'border-blue-700 bg-blue-100 text-blue-700'
              : level?.toLowerCase() === 'high'
                ? 'border-error-600 bg-error-50 text-red-600'
                : 'text-gray-600'
        }`}
      >
        {level}
      </div>
    </div>
  );
};
