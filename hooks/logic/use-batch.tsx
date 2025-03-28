'use client';
import { useBatchStore } from "@/app/store/batch.store";
import { useUiStore } from "@/app/store/ui.store";
import { toast } from "@/components/ui/toast";
import { getDateDeference } from "@/lib/helper";
import { routes } from "@/lib/routes";
import { BatchProjectModelTestSchema } from "@/lib/validator/batch";
import { BatchProjectModelTest, ProjectErrors } from "@/types/general";
import { useDebouncedCallback } from "@mantine/hooks";
import dayjs from "dayjs";
import { Session } from 'next-auth';
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useBatch } from "../mutate/use-batch";
import { useGetBatchAnalysis } from "../query/batch";
import { useQueryParams } from "./use-query-parems";


export const useBatchAnalysis = ({ session }: { session: Session | null; }) => {
  const { setQueryParams, queryParams } = useQueryParams();
  const router = useRouter()

  const [step, setStep] = useState(1);
  const { setDashboardType } = useUiStore();
  const { batchList, setBatchList, batchName, setBatchName } = useBatchStore();
  const [batchTitle, setBatchTitle] = useState(batchName);
  const [projectList, setProjectList] = useState<BatchProjectModelTest[]>(batchList || []);
  const { refetch } = useGetBatchAnalysis();
  const [nameError, setNameError] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  const handleState = useDebouncedCallback(async () => {
    setBatchList(projectList);
  }, 500);



  useEffect(() => {
    handleState()
  }, [projectList]);


  useEffect(() => {
    // Add event listener for the popstate event (triggered when navigation buttons are clicked)
    const handlePopState = () => {
      if (projectList.length <= 0)
        return onLeave()
      setShowExitModal(true)
    };

    window.addEventListener("popstate", handlePopState);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);


  const { onCreateBatch, isLoading } = useBatch();


  const [projectErrors, setProjectErrors] = useState<{
    [key: number]: ProjectErrors;
  }>({});

  const validateProjectsForm = async () => {
    const newErrors: { [key: number]: ProjectErrors } = {};
    const newList = batchList || [];

    for (let i = 0; i < newList.length; i++) {
      try {
        await BatchProjectModelTestSchema.validate(newList[i], {
          abortEarly: false,
        });
      } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
          const errors = {} as ProjectErrors;
          validationError.inner.forEach((error: Yup.ValidationError) => {
            if (error.path === "project_name") {
              errors.projectName = error.message;
            } else if (error.path === "project_duration.start_date") {
              errors.startDate = error.message;
            } else if (error.path === "project_location.location") {
              errors.location = error.message;
            } else if (
              error.path === "tax_credits.employs_registered_apprentice"
            ) {
              errors.employs_registered_apprentice = error.message;
            } else if (error.path === "tax_credits.meet_recommended_wages") {
              errors.meet_recommended_wages = error.message;
            } else if (
              error.path === "tax_credits.materials_and_manufacturing_in_the_us"
            ) {
              errors.materials_and_manufacturing_in_the_us = error.message;
            } else if (error.path === "analysis_case.analysis_case") {
              errors.analysis_case = error.message;
            } else if (error.path === "analysis_case.asset.asset_type") {
              errors.assetType = error.message;
            } else if (error.path?.includes("analysis_case.asset.size")) {
              errors.assetSize = error.message;
            }
          });

          if (Object.keys(errors).length > 0) {
            newErrors[i] = errors;
          }
        }
      }
    }

    setProjectErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleCreateBatch = async () => {
    if (batchTitle.trim().length === 0) {
      setNameError(true)
      toast({
        message: "Batch name is required",
        variant: "info",
      });
      return;
    }
    if (batchList?.length === 0) {
      toast({
        message: "Project list is empty",
        variant: "info",
      });
      return;
    }

    const isValid = await validateProjectsForm();
    if (!isValid) {
      toast({
        message: "Please fix validation errors before submitting",
        variant: "error",
      });
      return;
    }
    const valueList = batchList?.map((item) => {
      const assetList = item?.analysis_case?.asset?.size.map((obj) => {
        return {
          unit: obj.unit,
          value: obj.value,
          asset: obj.asset,
        };
      })
      const differenceInYears = getDateDeference(item?.project_duration?.start_date, item?.replacement_info?.construction_time.value as string)
      return {
        ...item,
        project_duration: {
          start_date: dayjs(item?.project_duration?.start_date).format(
            "YYYY-MM-DD"
          ),
          end_date: dayjs(item?.project_duration?.end_date).format(
            "YYYY-MM-DD"
          ),
        },
        analysis_case: {
          ...item.analysis_case,
          asset: {
            ...item.analysis_case.asset,
            size: assetList,
          },
        },
        replacement_info: {
          ...item?.replacement_info,
          construction_time: {
            value: differenceInYears,
          }
        },
      };
    });
    const body = {
      batch_name: batchTitle,
      organization_id: session?.user?.organization as string,
      projects: valueList as BatchProjectModelTest[],
    };



    onCreateBatch({
      values: body,
      cb() {
        refetch();
        router.push(routes.diana.dianaOverview)
      },
      errorCb: () => {
        setStep(1);
      },
    });
  };

  const onLeave = () => {
    setShowExitModal(false)
    setDashboardType("diana");
    router.push(routes.diana.dianaOverview)

  }


  return {
    step,
    setDashboardType,
    setQueryParams,
    queryParams,
    batchList,
    setBatchList,
    setBatchTitle,
    handleCreateBatch,
    isLoading,
    projectErrors,
    batchTitle,
    setStep,
    nameError,
    setNameError,
    setProjectList,
    projectList,
    showExitModal,
    setShowExitModal,
    onLeave,
    setBatchName,
  };
};
