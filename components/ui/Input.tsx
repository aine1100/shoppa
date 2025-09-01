import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
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
  leftIconName?: keyof typeof Ionicons.glyphMap;
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
  leftIconName,
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
        {leftIconName && (
          <View style={styles.leftIcon}>
            {Ionicons.glyphMap[leftIconName] ? (
              <Ionicons name={leftIconName} size={18} color={isFocused ? '#68AE3C' : '#999999'} />
            ) : (() => {
              let Lucide: any = null;
              try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
              if (!Lucide) return <Ionicons name="help-circle" size={18} color={isFocused ? '#68AE3C' : '#999999'} />;
              const { Mail, User, Lock } = Lucide;
              if (leftIconName === 'mail') return <Mail size={18} color={isFocused ? '#68AE3C' : '#999999'} />;
              if (leftIconName === 'person') return <User size={18} color={isFocused ? '#68AE3C' : '#999999'} />;
              if (leftIconName.includes('lock')) return <Lock size={18} color={isFocused ? '#68AE3C' : '#999999'} />;
              return <User size={18} color={isFocused ? '#68AE3C' : '#999999'} />;
            })()}
          </View>
        )}
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
            {Ionicons.glyphMap[isPasswordVisible ? 'eye-off' as any : 'eye' as any] ? (
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={18} color="#999999" />
            ) : (() => {
              let Lucide: any = null;
              try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
              if (!Lucide) return <Ionicons name="eye" size={18} color="#999999" />;
              const { Eye, EyeOff } = Lucide;
              return isPasswordVisible ? <EyeOff size={18} color="#999999" /> : <Eye size={18} color="#999999" />;
            })()}
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
    borderColor: '#68AE3C',
    backgroundColor: '#FFFFFF',
    shadowColor: '#68AE3C',
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
  leftIcon: {
    marginRight: 8,
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