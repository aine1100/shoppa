import {
    createReview,
    getProductRatingSummary,
    getProductReviews
} from '@/api/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const reviewKeys = {
  all: ['reviews'] as const,
  byProduct: (productId: string) => ['reviews', 'product', productId] as const,
  ratingSummary: (productId: string) => ['reviews', 'rating', productId] as const,
};

// Get reviews for product
export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: reviewKeys.byProduct(productId),
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

// Get product rating summary
export const useProductRatingSummary = (productId: string) => {
  return useQuery({
    queryKey: reviewKeys.ratingSummary(productId),
    queryFn: () => getProductRatingSummary(productId),
    enabled: !!productId,
  });
};

// Create review mutation
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      productId, 
      userId, 
      rating, 
      comment 
    }: { 
      productId: string; 
      userId: string; 
      rating: number; 
      comment?: string; 
    }) => createReview(productId, userId, rating, comment),
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate product reviews query
        queryClient.invalidateQueries({ queryKey: reviewKeys.byProduct(variables.productId) });
        // Invalidate rating summary query
        queryClient.invalidateQueries({ queryKey: reviewKeys.ratingSummary(variables.productId) });
      }
    },
  });
};