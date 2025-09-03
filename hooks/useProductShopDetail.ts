import { useInfiniteQuery } from '@tanstack/react-query';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type FetchShopProductsParams = {
  shopId: string;
  categoryId?: string | null;
  limit?: number;
  cursor?: { created_at: string; id: string } | null;
};

const DEFAULT_LIMIT = 12;

async function fetchShopProductsPage({
  shopId,
  categoryId,
  limit = DEFAULT_LIMIT,
  cursor,
}: FetchShopProductsParams) {
  let q = supabase
    .from('products')
    .select('*, categories(name), shops(title)')
    .eq('shop_id', shopId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (categoryId) {
    q = q.eq('category_id', categoryId);
  }

  if (cursor) {
    q = q.or(
      `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`
    );
  }

  const { data, error } = await q;

  if (error) {
    const e = error as PostgrestError;
    throw new Error(e.message);
  }

  const items = data ?? [];
  const last = items.length ? items[items.length - 1] : null;
  const nextCursor = last
    ? { created_at: last.created_at ?? '', id: last.id }
    : null;

  return { items, nextCursor, hasMore: items.length === limit };
}

export function useShopProductsInfinite({ 
  shopId, 
  categoryId 
}: { 
  shopId: string; 
  categoryId?: string | null; 
}) {
  return useInfiniteQuery({
    queryKey: ['shop-products', shopId, categoryId ?? 'all'],
    queryFn: async ({ pageParam }) => {
      const res = await fetchShopProductsPage({ 
        shopId, 
        categoryId, 
        cursor: pageParam 
      });
      return res;
    },
    initialPageParam: null as { created_at: string; id: string } | null,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore && lastPage.nextCursor) return lastPage.nextCursor;
      return undefined;
    },
    staleTime: 1000 * 60 * 1,
    enabled: !!shopId,
  });
}