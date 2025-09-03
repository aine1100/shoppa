import { create } from 'zustand';
import { Tables } from '@/types/database.types';

type Shop = Tables<'shops'> & {
  users?: Tables<'users'> | null;
};

interface ShopStore {
  currentShop: Shop | null;
  setCurrentShop: (shop: Shop | null) => void;
  clearCurrentShop: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  currentShop: null,
  setCurrentShop: (shop) => set({ currentShop: shop }),
  clearCurrentShop: () => set({ currentShop: null }),
}));