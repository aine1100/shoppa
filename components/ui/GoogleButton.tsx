import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface GoogleButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export function GoogleButton({ title, onPress, style, disabled = false }: GoogleButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <ThemedText style={styles.icon}>G</ThemedText>
      <ThemedText style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  disabledText: {
    color: '#999999',
  },
});