import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "ru", name: "Русский" },
  { code: "vi", name: "Tiếng Việt" },
];

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Save selection and go back
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>
          <ThemedText style={styles.subtitle}>Language</ThemedText>
        </View>

        {/* Languages List */}
        <View style={styles.languagesContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                selectedLanguage === language.code &&
                  styles.selectedLanguageItem,
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <ThemedText
                style={[
                  styles.languageText,
                  selectedLanguage === language.code &&
                    styles.selectedLanguageText,
                ]}
              >
                {language.name}
              </ThemedText>
              <View
                style={[
                  styles.radioButton,
                  selectedLanguage === language.code &&
                    styles.selectedRadioButton,
                ]}
              >
                {selectedLanguage === language.code && (
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
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "600",
  },
  languagesContainer: {
    gap: 4,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  selectedLanguageItem: {
    backgroundColor: "#E8F5E8",
  },
  languageText: {
    fontSize: 16,
    color: "#333333",
  },
  selectedLanguageText: {
    color: "#333333",
    fontWeight: "500",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioButton: {
    backgroundColor: "#7CB342",
    borderColor: "#7CB342",
  },
  checkmarkText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  bottomIndicator: {
    position: "absolute",
    bottom: 5,
    alignSelf: "center",
    width: 134,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 2.5,
  },
});
