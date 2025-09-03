// hooks/useShops.ts
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/database.types';

type Shop = Tables<'shops'>;

const SHOPS_PER_PAGE = 10;

// Hook for infinite scrolling shops (ordered by size: large -> medium -> small)
export const useInfiniteShops = () => {
  return useInfiniteQuery({
    queryKey: ['shops', 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * SHOPS_PER_PAGE;
      const to = from + SHOPS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('shops')
        .select('*', { count: 'exact' })
        .order('size', { ascending: false }) // large -> medium -> small
        .order('created_at', { ascending: false }) // then by newest
        .range(from, to);

      if (error) {
        throw new Error(error.message);
      }

      return {
        data: data || [],
        count: count || 0,
        hasMore: (count || 0) > to + 1,
        nextPage: (count || 0) > to + 1 ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

// Hook for latest shops (for homepage)
export const useLatestShops = (limit: number = 2) => {
  return useQuery({
    queryKey: ['shops', 'latest', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(error.message);
      }
      return data || [];
    },
  });
};