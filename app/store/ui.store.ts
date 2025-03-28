import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface UnPersistUiStoreProps {
  showBatchNav: boolean;
  setShowBatchNav: (type: boolean) => void;
}
export interface UiStoreProps {
  dashboardType: 'fibonacci' | 'diana' | 'euclid' | 'dashboard';
  isHover: boolean;
  setIsHover: (type: boolean) => void;
  setDashboardType: (type: 'fibonacci' | 'diana' | 'euclid' | 'dashboard') => void;
  page: {
    header?: string | null;
    title?: string | null;
    previousText?: string | null;
    previousRouter?: string | null;
  } | null;
  setPage: ({
    header,
    title,
  }: {
    header?: string | null;
    title?: string | null;
    previousText?: string | null;
    previousRouter?: string | null;
  }) => void;
  isNavCollapse: boolean;
  setIsNavCollapse: (type: boolean) => void;
  showAskDiana: boolean;
  showAskDianaIntro: boolean;
  setShowAskDiana: (type: boolean) => void;
  setShowAskDianaIntro: (type: boolean) => void;
}

export const useUiStore = create<UiStoreProps>()(
  devtools(
    persist(
      (set) => ({
        dashboardType: 'dashboard',
        isHover: true,
        page: null,
        isNavCollapse: false,
        showAskDiana: false,
        showAskDianaIntro: true,
        setIsHover: (type: boolean) => set({ isHover: type }),
        setDashboardType: (type: 'fibonacci' | 'diana' | 'euclid' | 'dashboard') =>
          set({ dashboardType: type }),
        setPage: (type?: UiStoreProps['page']) => set({ page: type }),
        setShowAskDianaIntro: (type: boolean) =>
          set({ showAskDianaIntro: type }),
        setIsNavCollapse: (type: boolean) => set({ isNavCollapse: type }),
        setShowAskDiana: (type: boolean) => set({ showAskDiana: type }),

      }),
      {
        name: 'ui-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);


export const useUnPersistUiStore = create<UnPersistUiStoreProps>()(
  devtools((set) => ({
    showBatchNav: true,
    setShowBatchNav: (type: boolean) => set({ showBatchNav: type }),
  }))
);
