// hooks/useShopProducts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// interface ShopProduct {
//   id: string;
//   name: string;
//   price: number;
//   image: string | null;
//   description: string | null;
//   category_id: string | null;
//   created_at: string;
// }

interface UseShopProductsParams {
  shopId: string;
  categoryId?: string | null;
}

export function useShopProducts({ shopId, categoryId }: UseShopProductsParams) {
  return useQuery({
    queryKey: ['shop-products', shopId, categoryId],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          image,
          description,
          category_id,
          created_at
        `)
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false });

      // Apply category filter if categoryId is provided
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);
      return data ?? [];
    },
    enabled: !!shopId,
  });
}

// Hook to get just the latest product for display
export function useLatestShopProduct(shopId: string, categoryId?: string | null) {
  return useQuery({
    queryKey: ['latest-shop-product', shopId, categoryId],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          image,
          description,
          category_id,
          created_at
        `)
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);
      return data?.[0] || null;
    },
    enabled: !!shopId,
  });
}