import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EuclidStoreProps {
  fileUrl: string | undefined;
  setFileUrl: (bankStatement:string | undefined) => void;
}
export const useEuclidStore = create<EuclidStoreProps>()(
  devtools((set) => ({
    fileUrl: null,
    setFileUrl: (url: string) =>
      set({ fileUrl: url }),
  }))
);
