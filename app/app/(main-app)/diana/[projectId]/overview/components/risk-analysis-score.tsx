import { RiskLevel } from '@/types/overview';
import { Text } from '@mantine/core';

interface ScoreDisplayProps {
  score: string;
  status: RiskLevel;
}

export const RiskAnalysisScore: React.FC<ScoreDisplayProps> = ({
  score,
  status,
}) => {
  const getScoreColor = () => {
    switch (status.toLowerCase()) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-blue-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <Text size="sm" className={`font-medium ${getScoreColor()}`}>
      {score}/10
    </Text>
  );
};
