import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RoleSelector } from '@/components/ui/RoleSelector';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function VerifyScreen() {
  const [nationalId, setNationalId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);

  const handleNext = () => {
    // Navigate to shop room selection
    router.push('/shop/profile/store');
  };

  const handleUploadId = () => {
    console.log('Upload ID pressed');
  };

  const roles = ['Customer', 'Seller', 'Admin'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Verify Your Identity
          </ThemedText>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot,styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
         
          <Input
            placeholder="Phone No"
            value={phoneNo}
            onChangeText={setPhoneNo}
            keyboardType="phone-pad"
          />

          {/* Role Selection */}
          <RoleSelector
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
          />

          <Button
            title="Next →"
            onPress={handleNext}
            variant="primary"
            style={styles.nextButton}
          />
        </View>

        {/* Bottom Indicator */}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  progressDot: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  progressDotActive: {
    backgroundColor: '#7CB342',
  },
  formContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    color: '#999999',
  },
  uploadIcon: {
    fontSize: 16,
    color: '#7CB342',
  },
  nextButton: {
    marginTop: 24,
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 20,
  },
});