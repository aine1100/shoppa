import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const appearanceOptions = [
  { id: 'light', name: 'Light Mode' },
  { id: 'dark', name: 'Dark Mode' },
  { id: 'system', name: 'System Mode' },
];

export default function AppearanceScreen() {
  const [selectedMode, setSelectedMode] = useState('light');

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    // Save selection and go back
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Appearance
          </ThemedText>
        </View>

        {/* Appearance Options */}
        <View style={styles.optionsContainer}>
          {appearanceOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                selectedMode === option.id && styles.selectedOptionItem
              ]}
              onPress={() => handleModeSelect(option.id)}
            >
              <ThemedText style={[
                styles.optionText,
                selectedMode === option.id && styles.selectedOptionText
              ]}>
                {option.name}
              </ThemedText>
              <View style={[
                styles.radioButton,
                selectedMode === option.id && styles.selectedRadioButton
              ]}>
                {selectedMode === option.id && (
                  <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Indicator */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 4,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  selectedOptionItem: {
    backgroundColor: '#E8F5E8',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedOptionText: {
    color: '#333333',
    fontWeight: '500',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    backgroundColor: '#7CB342',
    borderColor: '#7CB342',
  },
  checkmarkText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
  },
});