import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function PaymentSuccessScreen() {
  const handlePayAgain = () => {
    router.back();
  };

  const handleGoToHome = () => {
    router.replace("/(main)/home");
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
            Payment Confirmation
          </ThemedText>
        </View>

        {/* Success Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/succes.png")}
            style={styles.successImage}
            resizeMode="contain"
          />
        </View>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <ThemedText style={styles.successTitle}>
            Payment Successful
          </ThemedText>
          <ThemedText style={styles.successSubtitle}>
            Total amount paid by MasterCard
          </ThemedText>
          <ThemedText style={styles.celebrationText}>
            🎉 You&apos;re All Set! Your booth is ready.
          </ThemedText>
        </View>

        {/* Payment Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>
              Booth: Flove Store
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>
              Amount: RWF 50,000
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>
              Payment Method: MasterCard
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>
              Transaction ID: SHPA-20250518XYZ
            </ThemedText>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Pay Again"
            onPress={handlePayAgain}
            variant="primary"
            style={styles.payAgainButton}
          />

          <Button
            title="Go To Home"
            onPress={handleGoToHome}
            variant="secondary"
            style={styles.homeButton}
            textStyle={styles.homeButtonText}
          />
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
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  successImage: {
    width: 200,
    height: 200,
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
  },
  celebrationText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  detailsCard: {
    backgroundColor: "#F0F8F0",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  detailRow: {
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  payAgainButton: {
    flex: 1,
  },
  homeButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#7CB342",
  },
  homeButtonText: {
    color: "#7CB342",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 20,
  },
});
