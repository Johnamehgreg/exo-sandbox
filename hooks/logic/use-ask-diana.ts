import { useUiStore } from "@/app/store/ui.store";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAskDiana = () => {
  const { setIsNavCollapse, showAskDiana, setShowAskDiana } = useUiStore();

    const params = useParams();

    const project_id = params.projectId as string;
    const pathname = usePathname();  
  const isDiana = pathname.includes("diana");
  const shouldShowAskDiana = isDiana && !!project_id;

  useEffect(() => {
    if (!shouldShowAskDiana) {
      setShowAskDiana(false);
    }
  }, [shouldShowAskDiana, pathname, isDiana]);

  return {
    showAskDiana,
    setIsNavCollapse,
    shouldShowAskDiana,
    isDiana,
  };
};
