import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Modal } from "@/components/ui/Modal";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: "mastercard", name: "Mastercard", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  { id: "visa", name: "Visa", icon: "💳" },
  { id: "momo", name: "MoMo", icon: "📱" },
];

export default function PaymentMethodScreen() {
  const [selectedMethod, setSelectedMethod] = useState<string>("mastercard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleConfirmPayment = () => {
    setShowLoadingModal(true);

    // Simulate payment processing
    setTimeout(() => {
      setShowLoadingModal(false);
      router.push("/shop/payment/success");
    }, 3000);
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
            Payment Method
          </ThemedText>
        </View>

        {/* Paying For Section */}
        <View style={styles.payingForContainer}>
          <ThemedText style={styles.sectionTitle}>Paying For</ThemedText>

          <View style={styles.boothCard}>
            <View style={styles.boothImageContainer}>
              <View style={styles.boothImagePlaceholder}>
                <ThemedText style={styles.boothImageIcon}>🏪</ThemedText>
              </View>
            </View>

            <View style={styles.boothDetails}>
              <ThemedText style={styles.boothTitle}>Booth</ThemedText>
              <ThemedText style={styles.boothDescription}>
                A compact space perfect for beginners or small sellers.
              </ThemedText>
              <ThemedText style={styles.boothRent}>
                Monthly Rent:{" "}
                <ThemedText style={styles.boothPrice}>RWF 50,000</ThemedText> /
                month
              </ThemedText>
              <ThemedText style={styles.boothIncludes}>
                Includes: List up to 5 products
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          <ThemedText style={styles.sectionTitle}>
            Add Payment Method
          </ThemedText>

          <View style={styles.methodsGrid}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.methodCardSelected,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <ThemedText style={styles.methodIcon}>{method.icon}</ThemedText>
                <ThemedText style={styles.methodName}>{method.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.sectionTitle}>Details</ThemedText>

          <View style={styles.paymentForm}>
            <Input
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />

            <View style={styles.formRow}>
              <Input
                placeholder="mm/yy"
                value={expiryDate}
                onChangeText={setExpiryDate}
                style={styles.halfInput}
              />
              <Input
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                style={styles.halfInput}
              />
            </View>

            <Input
              placeholder="Card Holder Name"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />

            <View style={styles.totalContainer}>
              <ThemedText style={styles.totalLabel}>Total Price</ThemedText>
              <ThemedText style={styles.totalPrice}>50,000RWF</ThemedText>
            </View>

            <Button
              title="Confirm Payment"
              onPress={handleConfirmPayment}
              variant="primary"
              style={styles.confirmButton}
            />
          </View>
        </View>

        {/* Bottom Indicator */}
      </ScrollView>

      {/* Loading Modal */}
      <Modal
        visible={showLoadingModal}
        onClose={() => {}}
        title="Payment is in progress"
      >
        <LoadingSpinner size={60} />
        <ThemedText style={styles.loadingText}>
          Please, wait a few moments
        </ThemedText>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  payingForContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  boothCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  boothImageContainer: {
    marginRight: 16,
  },
  boothImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#7CB342",
    alignItems: "center",
    justifyContent: "center",
  },
  boothImageIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  boothDetails: {
    flex: 1,
  },
  boothTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7CB342",
    marginBottom: 4,
  },
  boothDescription: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
  },
  boothRent: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 2,
  },
  boothPrice: {
    fontWeight: "bold",
    color: "#333333",
  },
  boothIncludes: {
    fontSize: 11,
    color: "#7CB342",
  },
  paymentMethodsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  methodsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  methodCard: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  methodCardSelected: {
    borderColor: "#7CB342",
    backgroundColor: "#F8FDF8",
  },
  methodIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  methodName: {
    fontSize: 10,
    color: "#666666",
    textAlign: "center",
  },
  detailsContainer: {
    paddingHorizontal: 24,
  },
  paymentForm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalLabel: {
    fontSize: 16,
    color: "#666666",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7CB342",
  },
  confirmButton: {
    marginTop: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 32,
  },
});
