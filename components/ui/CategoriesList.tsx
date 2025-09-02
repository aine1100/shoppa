import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useCategories } from '@/hooks/useCategories';
import { useAppStore } from '@/stores/useAppStore';
import CategoryButton from '@/components/ui/CategoryButton';
import { Colors } from '@/constants/Colors';

interface CategoriesListProps {
  onCategorySelect?: (categoryId: string | null) => void;
}

export default function CategoriesList({ onCategorySelect }: CategoriesListProps) {
  const { selectedCategoryId, setSelectedCategoryId } = useAppStore();
  const { data: categories, isLoading, isError, error } = useCategories();

  const handleCategoryPress = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Colors.tint} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading categories: {error?.message || 'Something went wrong'}
        </Text>
      </View>
    );
  }

  // Create categories array with "All" option
  const allCategories = [
    { id: null, name: 'All' },
    ...(categories || [])
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {allCategories.map((category) => (
        <CategoryButton
          key={category.id || 'all'}
          title={category.name}
          isSelected={selectedCategoryId === category.id}
          onPress={() => handleCategoryPress(category.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
  },
});