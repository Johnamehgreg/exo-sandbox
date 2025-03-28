import { IconArrowDown } from '@/public/assets/svg/icon-arrow-down';
import { IconArrowUp } from '@/public/assets/svg/icon-arrow-up';
import { ExoAnalysisCardOverlay } from '@/public/assets/svg/transaction/exo-analysis-card-overlay';
import { ExoProductStatus, ExoProductSummaryCardProps } from '@/types/overview';

const TransactionSummaryItem = (props: ExoProductSummaryCardProps) => {
  const getStatusColor = () => {
    switch (props.type) {
      case ExoProductStatus.BASE:
        return '';
      case ExoProductStatus.DANGER:
        return '#FECDD3';
      case ExoProductStatus.WARNING:
        return '#FADAAA';
      default:
        return '';
    }
  };
  return (
    <div className="relative flex h-[176px] flex-col justify-between rounded-md bg-gray-100 p-4">
      <div className="flex w-full items-center justify-between">
        {props.icon}

        <div className="flex items-baseline gap-1">
          <p
            className={
              props.margin
                ? 'text-green-600' + ' text-[14px] font-medium'
                : 'text-error-600' + ' text-[14px] font-medium'
            }
          >
            {props.margin ? (
              <IconArrowUp className="inline-block w-4" />
            ) : (
              <IconArrowDown className="inline-block w-4" />
            )}
            {props.percentage || '-'}{' '}
            <span className="text-sm font-[250] leading-normal text-gray-500">
              vs {props?.periodRange}
            </span>
          </p>
        </div>
      </div>

      <div className="z-30 w-full">
        <p
          className={` ${
            props?.type === ExoProductStatus.DANGER
              ? 'text-error-600'
              : 'text-gray-800'
          } font-bold ${props?.showCurrency ? 'text-[20px]' : 'text-[32px]'} `}
        >
          {props.showCurrency ? '$' : ''}
          {props?.price?.toLocaleString() || 0}
        </p>
        <p className="line-clamp-2 max-w-[180px] text-[12px] text-gray-600">
          {props?.description}
        </p>
      </div>
      <ExoAnalysisCardOverlay
        className={
          props?.type === ExoProductStatus.BASE
            ? 'absolute bottom-0 right-0 z-20 !fill-transparent'
            : '' + 'absolute bottom-0 right-0 z-20'
        }
        fill={getStatusColor()}
      />
    </div>
  );
};

export default TransactionSummaryItem;
