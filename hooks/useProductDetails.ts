// hooks/useProductDetails.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image: string | null;
  shop: {
    id: string;
    title: string;
    owner: {
      id: string;
      full_name: string;
      email: string;
    };
  };
}

interface ProductReview {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user: {
    id: string;
    full_name: string;
  };
}

interface ProductStats {
  average_rating: number;
  total_reviews: number;
}

export function useProductDetails(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          description,
          image,
          shop:shops!inner (
            id,
            title,
            owner:users!inner (
              id,
              full_name,
              email
            )
          )
        `)
        .eq('id', productId)
        .single();

      if (error) throw new Error(error.message);
      return data ;
    },
    enabled: !!productId,
  });
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          created_at,
          user:users!inner (
            id,
            full_name
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data ;
    },
    enabled: !!productId,
  });
}

export function useProductStats(productId: string) {
  return useQuery({
    queryKey: ['product-stats', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId);

      if (error) throw new Error(error.message);

      if (!data || data.length === 0) {
        return {
          average_rating: 0,
          total_reviews: 0,
        };
      }

      const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / data.length;

      return {
        average_rating: averageRating,
        total_reviews: data.length,
      } as ProductStats;
    },
    enabled: !!productId,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      shopId,
      rating,
      comment,
      userId,
    }: {
      productId: string;
      shopId: string;
      rating: number;
      comment: string;
      userId: string;
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          shop_id: shopId,
          user_id: userId,
          rating,
          comment,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['product-reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product-stats', variables.productId] });
    },
  });
}