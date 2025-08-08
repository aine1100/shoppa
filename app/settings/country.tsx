import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const countries = [
  "Rwanda",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
];

export default function CountryScreen() {
  const [selectedCountry, setSelectedCountry] = useState("Rwanda");

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
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
          <ThemedText style={styles.subtitle}>Country</ThemedText>
        </View>

        {/* Countries List */}
        <View style={styles.countriesContainer}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country}
              style={[
                styles.countryItem,
                selectedCountry === country && styles.selectedCountryItem,
              ]}
              onPress={() => handleCountrySelect(country)}
            >
              <ThemedText
                style={[
                  styles.countryText,
                  selectedCountry === country && styles.selectedCountryText,
                ]}
              >
                {country}
              </ThemedText>
              {selectedCountry === country && (
                <View style={styles.checkmark}>
                  <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                </View>
              )}
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
  countriesContainer: {
    gap: 4,
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  selectedCountryItem: {
    backgroundColor: "#E8F5E8",
  },
  countryText: {
    fontSize: 16,
    color: "#333333",
  },
  selectedCountryText: {
    color: "#333333",
    fontWeight: "500",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#7CB342",
    alignItems: "center",
    justifyContent: "center",
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
