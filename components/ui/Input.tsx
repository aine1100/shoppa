import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
  showPasswordToggle?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  inputStyle,
  error,
  showPasswordToggle = false,
  multiline = false,
  numberOfLines = 1,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <ThemedText style={styles.passwordToggleText}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    borderColor: '#7CB342',
    backgroundColor: '#FFFFFF',
    shadowColor: '#7CB342',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainerError: {
    borderColor: '#FF5252',
    shadowColor: '#FF5252',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    minHeight: 20,
  },
  passwordToggle: {
    padding: 4,
  },
  passwordToggleText: {
    fontSize: 16,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});