import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface DianaOnboardingStore {
  projectIds: string[];
  isOnboarding: boolean;
  setOnboarding: (isOnboarding: boolean) => void;
  setProjectId: (projectId: string) => void;
  removeProjectId: (projectId: string) => void;
}

export const useDianaOnboardingStore = create<DianaOnboardingStore>()(
  devtools(
    persist(
      (set) => ({
        isOnboarding: false,
        projectIds: [],
        setOnboarding: (isOnboarding: boolean) => set({ isOnboarding }),
        setProjectId: (projectId: string) =>
          set((state) => ({
            projectIds: [...state.projectIds, projectId],
          })),
        removeProjectId: (projectId: string) =>
          set((state) => ({
            projectIds: state.projectIds?.filter((id) => id !== projectId),
          })),
      }),
      {
        name: 'diana-onboarding-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useUnPersistDianaOnboardingStore = create<DianaOnboardingStore>()(
  devtools((set) => ({
    isOnboarding: false,
    projectIds: [],
    setOnboarding: (isOnboarding: boolean) => set({ isOnboarding }),
    setProjectId: (projectId: string) =>
      set((state) => ({
        projectIds: [...state.projectIds, projectId],
      })),
    removeProjectId: (projectId: string) =>
      set((state) => ({
        projectIds: state.projectIds.filter((id) => id !== projectId),
      })),
  }))
);
