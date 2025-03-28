import { Box, Skeleton, Text } from '@mantine/core';

interface Props {
  type: 'text' | 'status' | 'user' | 'risk';
  title?: React.ReactNode;
  text?: React.ReactNode;
  status?: 'approved' | 'rejected' | 'need-review';
  isLoading?: boolean;
}

export const DetailItem: React.FC<Props> = ({
  type,
  title,
  text,
  isLoading,
}) => {
  const isSanctionList = title === 'Sanction Screening';
  const isPepList = title === 'Pep Screening';

  return (
    <Box className="grid gap-[14px] rounded-lg">
      <div className="grid gap-[16px]">
        <Box mb={'0.3rem'} className={`text-[12px] font-normal text-secondary`}>
          {title}
          <span
            className={`${isSanctionList || isPepList ? 'text-gray-300' : ''}`}
          >
            {isSanctionList || isPepList ? ' (soon)' : ''}
          </span>
        </Box>

        {isLoading ? (
          <Skeleton animate height={16} width="60%" />
        ) : (
          <>
            <>
              {type === 'text' && (
                <Box
                  className={`text-[16px] font-normal capitalize text-text ${
                    isSanctionList || isPepList ? 'hidden' : ''
                  }`}
                >
                  {text || 'N/A'}
                </Box>
              )}
            </>
          </>
        )}
      </div>
      <>
        {type === 'status' && (
          <>
            <Text className="text-[14px] font-normal text-[#475569]">N/A</Text>
          </>
        )}
        {isLoading ? null : (
          <>
            {type === 'risk' && <>{text}</>}
            {type === 'user' && (
              <Box className="text-[14px] font-normal text-[#475569]">
                {' '}
                {text || 'N/A'}
              </Box>
            )}
          </>
        )}
      </>
    </Box>
  );
};
