import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';


export type FetchProductsParams = {
  categoryId?: string | null;
  limit?: number;
  // cursor is the last seen created_at (ISO string) and id as tie-breaker
  cursor?: { created_at: string; id: string } | null;
  // if you want newest first, we use descending created_at
};

const DEFAULT_LIMIT = 12;

async function fetchPage({
  categoryId,
  limit = DEFAULT_LIMIT,
  cursor,
}: {
  categoryId?: string | null;
  limit?: number;
  cursor?: { created_at: string; id: string } | null;
}) {
  // Build query
  // We'll select product fields and join category name and shop title
  // Supabase syntax for select with relations: '*, categories(name), shops(title)'
  let q = supabase
    .from('products')
    .select('*, categories(name), shops(title)')
    .order('created_at', { ascending: false }) // newest first
    .limit(limit);

  if (categoryId) {
    q = q.eq('category_id', categoryId);
  }

  if (cursor) {
    // since we're ordering by created_at desc, to fetch older items we need created_at < cursor.created_at
    // if equal, use id < cursor.id (assuming consistent ordering)
    q = q.or(
      `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`
    );
  }

  const { data, error } = await q;

  if (error) {
    const e = error as PostgrestError;
    throw new Error(e.message);
  }

  // return items and nextCursor derived from last item (if any)
  const items = data ?? [];
  const last = items.length ? items[items.length - 1] : null;
  const nextCursor = last
    ? { created_at: last.created_at ?? '', id: last.id }
    : null;

  return { items, nextCursor, hasMore: items.length === limit };
}

export function useProductsInfinite({ categoryId }: { categoryId?: string | null }) {
  return useInfiniteQuery({
    queryKey: ['products', categoryId ?? 'all'],
    queryFn: async ({ pageParam }) => {
      const res = await fetchPage({ categoryId, cursor: pageParam });
      return res;
    },
    initialPageParam: null as { created_at: string; id: string } | null,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore && lastPage.nextCursor) return lastPage.nextCursor;
      return undefined;
    },
    staleTime: 1000 * 60 * 1,
  });
}