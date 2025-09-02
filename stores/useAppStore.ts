
import { create } from 'zustand';

type AppStore = {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
};

export const useAppStore = create<AppStore>()((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (id: string | null) => set({ selectedCategoryId: id }),
}));