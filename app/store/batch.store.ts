import { BatchProjectModelTest } from "@/types/general";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface BatchStoreProps {
  batchList: BatchProjectModelTest[] | null;
  setBatchList: (conversions: BatchProjectModelTest[]) => void;
  batchName: string;
  setBatchName: (name: string) => void;
}
export const useBatchStore = create<BatchStoreProps>()(
  devtools(
    persist(
      (set) => ({
        batchList: null,
        setBatchList: (batches: BatchProjectModelTest[]) =>
          set({ batchList: batches }),
        batchName: "",
        setBatchName: (name: string) => set({ batchName: name }),
      }),
      {
        name: "batch-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
