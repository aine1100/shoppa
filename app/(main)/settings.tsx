import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, TouchableOpacity, View,StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSettingPress = (setting: string) => {
    switch (setting) {
      case 'country':
        router.push('/settings/country');
        break;
      case 'language':
        router.push('/settings/language');
        break;
      case 'location':
        // Handle location setting
        break;
      case 'appearance':
        router.push('/settings/appearance');
        break;
      case 'privacy':
        // Handle privacy setting
        break;
      case 'storage':
        // Handle storage setting
        break;
    }
  };

  const handleLogout = () => {
    // Handle logout
    router.replace('/');
  };

  const handleSwitchAccounts = () => {
    // Handle switch accounts
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // Handle account deletion
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <ThemedText style={styles.profileImageText}>LK</ThemedText>
            </View>
            <View style={styles.verifiedBadge}>
              <ThemedText style={styles.verifiedIcon}>✓</ThemedText>
            </View>
          </View>
          
          <ThemedText style={styles.profileName}>Livia Kirezi</ThemedText>
          <ThemedText style={styles.profileHandle}>@liviakirezi</ThemedText>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsContainer}>
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => handleSettingPress('country')}
          >
            <ThemedText style={styles.settingText}>Country</ThemedText>
            <ThemedText style={styles.settingArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => handleSettingPress('language')}
          >
            <ThemedText style={styles.settingText}>Language</ThemedText>
            <ThemedText style={styles.settingArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => handleSettingPress('location')}
          >
            <ThemedText style={styles.settingText}>Location</ThemedText>
            <ThemedText style={styles.settingArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => handleSettingPress('appearance')}
          >
            <ThemedText style={styles.settingText}>Appearance</ThemedText>
            <ThemedText style={styles.settingArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => handleSettingPress('privacy')}
          >
            <ThemedText style={styles.settingText}>Privacy & Security</ThemedText>
            <ThemedText style={styles.settingArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => handleSettingPress('storage')}
          >
            <ThemedText style={styles.settingText}>Storage</ThemedText>
            <ThemedText style={styles.settingArrow}>›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Log out</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleSwitchAccounts}>
            <ThemedText style={styles.switchAccountsText}>Switch accounts</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delete Account Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.warningIcon}>
              <ThemedText style={styles.warningText}>!</ThemedText>
            </View>
            
            <ThemedText style={styles.modalTitle}>
              You are going to delete your account
            </ThemedText>
            
            <ThemedText style={styles.modalSubtitle}>
              You won&apos;t be able to restore your data
            </ThemedText>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowDeleteModal(false)}
                variant="secondary"
                style={styles.cancelButton}
                textStyle={styles.cancelButtonText}
              />
              
              <Button
                title="Delete"
                onPress={handleDeleteAccount}
                variant="primary"
                style={styles.deleteButton}
              />
            </View>
          </View>
        </View>
      </Modal>

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
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7CB342',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedIcon: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 14,
    color: '#666666',
  },
  settingsContainer: {
    marginBottom: 40,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
  },
  settingArrow: {
    fontSize: 20,
    color: '#999999',
  },
  actionsContainer: {
    gap: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: '500',
  },
  switchAccountsText: {
    fontSize: 16,
    color: '#00BCD4',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  warningIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#7CB342',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  warningText: {
    fontSize: 24,
    color: '#7CB342',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666666',
  },
  deleteButton: {
    flex: 1,
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