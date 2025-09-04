// hooks/useShopDetails.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface ShopDetails {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  owner: {
    id: string;
    full_name: string;
    email: string;
    phone_number: string | null;
  };
  latitude: number | null;
  longitude: number | null;
}

export function useShopDetails(shopId: string) {
  return useQuery({
    queryKey: ['shop', shopId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shops')
        .select(`
          id,
          title,
          description,
          image,
          latitude,
          longitude,
          owner:users!inner (
            id,
            full_name,
            email,
            phone_number
          )
        `)
        .eq('id', shopId)
        .single();

      if (error) throw new Error(error.message);
      return data
    },
    enabled: !!shopId,
  });
}