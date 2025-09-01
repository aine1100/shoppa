import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
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
            {Ionicons.glyphMap['cart'] ? (
              <Ionicons name="cart" size={22} color={selectedRole === 'buyer' ? '#FFFFFF' : '#666666'} />
            ) : (() => {
              let Lucide: any = null;
              try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
              if (!Lucide) return <Ionicons name="help-circle" size={22} color={selectedRole === 'buyer' ? '#FFFFFF' : '#666666'} />;
              const { ShoppingCart } = Lucide;
              return <ShoppingCart size={22} color={selectedRole === 'buyer' ? '#FFFFFF' : '#666666'} />;
            })()}
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
            {Ionicons.glyphMap['storefront'] ? (
              <Ionicons name="storefront" size={22} color={selectedRole === 'seller' ? '#FFFFFF' : '#666666'} />
            ) : (() => {
              let Lucide: any = null;
              try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
              if (!Lucide) return <Ionicons name="help-circle" size={22} color={selectedRole === 'seller' ? '#FFFFFF' : '#666666'} />;
              const { Store } = Lucide;
              return <Store size={22} color={selectedRole === 'seller' ? '#FFFFFF' : '#666666'} />;
            })()}
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
    borderColor: '#68AE3C',
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
    backgroundColor: '#68AE3C',
  },
  roleIcon: {
    fontSize: 24,
  },
  roleText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  roleTextSelected: {
    color: '#68AE3C',
    fontWeight: '600',
  },
});