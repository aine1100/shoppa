import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label: string;
}

export function Checkbox({ checked, onPress, label }: CheckboxProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <ThemedText style={styles.checkmark}>✓</ThemedText>}
      </View>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#7CB342',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#7CB342',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#7CB342',
  },
});