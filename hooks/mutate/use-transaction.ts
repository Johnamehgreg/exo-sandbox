import { useState } from 'react';
import apis from '../../services/api-services';
import { EscalateModel, TransactionNoteModel } from '@/types/general';
import { toast } from '@/components/ui/toast';

export interface ApprovedModel {
  approve: boolean;
  note?: string;
}
export const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onCreateTransactionNote = ({
    values,
    cb,
    errorCb,
    transactionId,
  }: {
    values: TransactionNoteModel;
    transactionId: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.transaction
      .createTransactionNote(values!, transactionId)
      .then(() => {
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Note created successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onApprovedTransaction = ({
    values,
    cb,
    errorCb,
    transactionId,
  }: {
    values: ApprovedModel;
    transactionId: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.transaction
      .approvedTransaction(values!, transactionId)
      .then(() => {
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Transaction updated successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onEscalateTransaction = ({
    values,
    cb,
    errorCb,
    transactionId,
  }: {
    values: EscalateModel;
    transactionId: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.transaction
      .escalateTransaction(values!, transactionId)
      .then(() => {
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Transaction updated successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onEscalateCase = ({
    values,
    cb,
    errorCb,
  }: {
    values: EscalateModel;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.transaction
      .escalateCase(values!)
      .then(() => {
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Transaction escalated successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onCreateTransactionNote,
    onApprovedTransaction,
    onEscalateTransaction,
    isLoading,
    onEscalateCase,
  };
};
