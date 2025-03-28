import { analysisUiList } from '@/app/app/(others)/diana-onboarding/[...slug]/components/extras';
import { useDianaOnboardingStore } from '@/app/store/diana-onboarding-store';
import { toast } from '@/components/ui/toast';
import { routes } from '@/lib/routes';
import {
  AnalysisUiListModel,
  OnboardingDianaChatProjectDetails,
} from '@/types/diana-onboarding-chat';
import { AttachmentModel } from '@/types/general';
import { MIME_TYPES } from '@mantine/dropzone';
import { useScrollIntoView } from '@mantine/hooks';
import { useRouter } from 'nextjs-toploader/app';
import { KeyboardEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  useDianaOnboardingAnalysis,
  useDianaOnboardingChat,
} from '../mutate/use-onboarding-diana-chat';
import { useUpload } from '../mutate/use-upload';
import { useGetDianaOnboardingAnalysisStatus } from '../query/diana-onboarding-analysis-status';

export const useDianaOnboardingConversation = (projectId: string) => {
  const [conversation, setConversation] = useState<
    OnboardingDianaChatProjectDetails[]
  >([]);
  const router = useRouter();
  const [locationGeometric, setLocationGeometric] = useState<{
    latitude: string | null;
    longitude: string | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [, setIsError] = useState(false);
  const [isAnalysisEnabled, setIsAnalysisEnabled] = useState(false);
  const [unit, setUnit] = useState<string | null>(null);
  const [analysisFailed, setAnalysisFailed] = useState(false);
  const [attachment, setAttachment] = useState<AttachmentModel[]>([]);
  const {
    projectStatus,
    error: analysisError,
    status: analysisStatus,
  } = useGetDianaOnboardingAnalysisStatus({
    projectId,
    enabled: isAnalysisEnabled,
  });
  const [isSubmittingChatInput, setIsSubmittingChatInput] = useState(false);

  const [messageText, setMessageText] = useState<string>('');

  const onChange = (text: string | null) => setMessageText(text ?? '');
  const onChangeUnit = (text: string | null) => setUnit(text);

  const [analysisList, setAnalysisList] =
    useState<AnalysisUiListModel[]>(analysisUiList);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();
  const { projectIds, removeProjectId } = useDianaOnboardingStore();

  const { mutateAsync: mutateAsyncAnalysis } = useDianaOnboardingAnalysis();
  const {
    data = [],
    isPending: isThinking,
    mutateAsync,
  } = useDianaOnboardingChat();
  const { onUploadFile, isUploading } = useUpload();

  useEffect(() => {
    if (data?.length) {
      setConversation(data);
    }
  }, [data]);

  const onScroll = () => {
    scrollIntoView();
  };

  useEffect(() => {
    if ((conversation?.length as number) > 1) {
      onScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const triggerAnalysis = async () => {
    if (!navigator.onLine) {
      toast({
        message: 'Please connect to the internet to run the analysis',
        variant: 'error',
      });
      return;
    }
    const newList = analysisUiList.map((analysisItem) => ({
      ...analysisItem,
      status:
        analysisItem.status === 'failed' ? 'running' : analysisItem.status,
    }));
    setAnalysisList(newList);
    setIsSubmitting(true);
    try {
      await mutateAsyncAnalysis(projectId);
      setIsError(false);
      setTimeout(() => {
        setIsAnalysisEnabled(true);
      }, 5000);
    } catch {
      toast({
        message: 'Something went wrong. Please try again later',
        variant: 'error',
      });
      setIsSubmitting(false);
      setIsError(true);
    }
  };

  const handleUpload = (files: File[] | null) => {
    if (!files) return;
    const newList = files.map((fileItem) => ({
      file: fileItem,
      id: uuidv4(),
      isUploaded: false,
      isUploading: true,
      isErrored: false,
    }));
    setAttachment((prevItems) => {
      const updatedList = [...prevItems, ...newList];
      newList.forEach((obj) => {
        onUploadFile({
          file: obj.file,
          hidePopup: true,
          fileId: obj.id,
          cb(uri, id) {
            setAttachment((currentItems) =>
              currentItems?.map((item) =>
                item.id === id
                  ? { ...item, isUploaded: true, url: uri, isUploading: false }
                  : item
              )
            );
          },
          errorCb({ id }) {
            setAttachment((currentItems) =>
              currentItems?.map((item) =>
                item.id === id
                  ? { ...item, isErrored: true, isUploading: false }
                  : item
              )
            );
          },
        });
      });
      return updatedList;
    });
  };

  const onRemoveAttachment = (itemToRemove: string) => {
    setAttachment((prevItems) =>
      prevItems.filter((item) => item.id !== itemToRemove)
    );
  };

  const onTagDocChange = (id: string, value: string) => {
    setAttachment((currentItems) =>
      currentItems?.map((item) =>
        item.id === id
          ? { ...item, isUploaded: true, file_category: value }
          : item
      )
    );
  };

  const acceptedFileType = () => {
    const acceptedFiles = conversation?.[0]?.allowed_types?.map(
      (item) => MIME_TYPES[item]
    );
    return acceptedFiles ?? [MIME_TYPES];
  };

  const handleSendMessage = async () => {
    setIsSubmittingChatInput(true);
    const lastMessage = conversation?.[0];
    const uploadedAttachment = attachment
      ?.filter((attachObj) => attachObj.isUploaded)
      ?.map((fileObj) => {
        return {
          name: fileObj.file?.name,
          type: fileObj.file?.type,
          url: fileObj.url,
          file_category: fileObj.file_category,
        };
      });

    const value: OnboardingDianaChatProjectDetails = {
      project_id: projectId,
      id: lastMessage?.id as string,
      type: lastMessage?.type as string,
    };

    switch (lastMessage?.type as string) {
      case 'text':
        value.text = lastMessage?.allow_empty ? '@@' : messageText; // note this is a hack to get around the fact that the diana api doesn't allow empty strings. the Machine learning guys should fix this later.
        break;
      case 'location':
        value.longitude = locationGeometric.longitude;
        value.latitude = locationGeometric.latitude;
        value.address = messageText;
        break;
      case 'date':
        value.date = messageText;
        break;
      case 'options':
        value.selected_options = [messageText];
        break;
      case 'unit':
        value.unit = unit;
        value.unit_value = messageText;
        break;
      case 'file':
        value.files = uploadedAttachment?.map((file) => ({
          name: file.name ?? '',
          url: file.url ?? '',
          type: file.type ?? '',
        }));
        break;
      default:
        break;
    }
    try {
      await mutateAsync({
        projectId,
        value,
      });
      setIsSubmittingChatInput(false);
      setMessageText('');
      setAttachment([]);
    } catch {
      toast({
        message: 'Invalid data submitted',
        variant: 'error',
      });
      setIsSubmittingChatInput(false);
      setMessageText('');
      setAttachment([]);
    }
  };

  const getMergeList = () => {
    if (!projectStatus?.states) return [];
    const newList = Object.entries(projectStatus.enriched)
      .filter(
        ([key]) =>
          key !== '_id' &&
          key !== 'task_id' &&
          key !== 'project_id' &&
          key !== 'date_created'
      )
      .map(([key, value]) => ({
        label: key.replace(/_/g, ' '),
        status: value?.task_state || 'running', // default to "pending" if task_state is missing
        value: key,
      }));
    const mergeAnalysisLists = (
      baseList: AnalysisUiListModel[],
      uiList: AnalysisUiListModel[]
    ): AnalysisUiListModel[] => {
      const baseMap = new Map(baseList.map((item) => [item.value, item]));

      return uiList.map((uiItem) => ({
        ...uiItem,
        status: baseMap.get(uiItem.value)?.status || uiItem.status, // Update status if found in baseList
      }));
    };
    const mergedList = mergeAnalysisLists(newList, analysisList);
    return mergedList;
  };

  const totalSuccess = getMergeList().filter(
    (itemValue) => itemValue.status === 'success'
  ).length;

  useEffect(() => {
    if (projectStatus && isSubmitting) {
      if (projectStatus?.overall?.failed) {
        setIsSubmitting(false);
        setAnalysisFailed(true);
      }
      if (projectStatus?.overall?.successful) {
        setAnalysisFailed(false);
        toast({
          message: 'Transaction Creation Successful',
          variant: 'success',
        });
        removeProjectId(projectId);
        router.push(routes.diana.overview(projectId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectStatus]);

  useEffect(() => {
    if (!navigator.onLine && isSubmitting) {
      setIsSubmitting(false);
      toast({
        message: 'Please connect to the internet to run the analysis',
        variant: 'error',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.onLine, isSubmitting]);

  useEffect(() => {
    if (conversation?.[0]?.type === 'end' && projectIds.includes(projectId)) {
      triggerAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  return {
    conversation,
    setConversation,
    setLocationGeometric,
    targetRef,
    scrollableRef,
    onScroll,
    handleSendMessage,
    messageText,
    handleKeyDown,
    isSubmitting,
    onChange,
    analysisFailed,
    triggerAnalysis,
    onChangeUnit,
    unit,
    attachment,
    getMergeList,
    totalSuccess,
    projectStatus,
    isThinking,
    onRemoveAttachment,
    onTagDocChange,
    isSubmittingChatInput,
    handleUpload,
    acceptedFileType,
    analysisStatus,
    analysisError,
    isUploading,
  };
};
