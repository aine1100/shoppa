import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CategoryButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function CategoryButton({ title, isSelected, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.categoryText,
        isSelected && styles.selectedCategoryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.tint,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.tint,
  },
  selectedCategoryText: {
    color: '#fff',
  },
});