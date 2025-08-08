import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface RoleSelectorProps {
  selectedRole: 'buyer' | 'seller' | null;
  onRoleSelect: (role: 'buyer' | 'seller') => void;
}

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Select Role</ThemedText>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === 'buyer' && styles.roleOptionSelected
          ]}
          onPress={() => onRoleSelect('buyer')}
        >
          <View style={[
            styles.roleCircle,
            selectedRole === 'buyer' && styles.roleCircleSelected
          ]}>
            <ThemedText style={[
              styles.roleIcon,
              selectedRole === 'buyer' && styles.roleIconSelected
            ]}>
              🛒
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.roleText,
            selectedRole === 'buyer' && styles.roleTextSelected
          ]}>
            Buyer
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === 'seller' && styles.roleOptionSelected
          ]}
          onPress={() => onRoleSelect('seller')}
        >
          <View style={[
            styles.roleCircle,
            selectedRole === 'seller' && styles.roleCircleSelected
          ]}>
            <ThemedText style={[
              styles.roleIcon,
              selectedRole === 'seller' && styles.roleIconSelected
            ]}>
              🏪
            </ThemedText>
          </View>
          <ThemedText style={[
            styles.roleText,
            selectedRole === 'seller' && styles.roleTextSelected
          ]}>
            Seller
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
    fontWeight: '500',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  roleOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  roleOptionSelected: {
    borderColor: '#7CB342',
    backgroundColor: '#F8FDF8',
  },
  roleCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  roleCircleSelected: {
    backgroundColor: '#7CB342',
  },
  roleIcon: {
    fontSize: 24,
  },
  roleIconSelected: {
    fontSize: 24,
  },
  roleText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  roleTextSelected: {
    color: '#7CB342',
    fontWeight: '600',
  },
});