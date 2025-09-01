import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

export default function StoreProfileScreen() {
  const router=useRouter()
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <ThemedText style={styles.logoIcon}>🛒</ThemedText>
          </View>
          <ThemedText style={styles.logoText}>Shopa</ThemedText>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <ThemedText style={styles.menuIcon}>☰</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Store Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.storeImageContainer}>
              <View style={styles.storeImagePlaceholder}>
                <ThemedText style={styles.storeImageText}>FLOVE</ThemedText>
              </View>
            </View>

            <View style={styles.storeInfo}>
              <View style={styles.storeNameContainer}>
                <ThemedText style={styles.storeName}>Flove Store</ThemedText>
                <View style={styles.verifiedBadge}>
                  <ThemedText style={styles.verifiedIcon}>✓</ThemedText>
                </View>
              </View>

              <ThemedText style={styles.storeType}>COMPANY</ThemedText>

              <ThemedText style={styles.storeDescription}>
                is a brand that empowers women through creativity and
                craftsmanship.
              </ThemedText>

              <View style={styles.statsContainer}>
                <ThemedText style={styles.statsNumber}>278</ThemedText>
                <ThemedText style={styles.statsLabel}>Roomies</ThemedText>
              </View>
            </View>
          </View>

          <ThemedText style={styles.fullDescription}>
            is a brand that empowers women through creativity and craftsmanship.
          </ThemedText>

          {/* Company Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>COMPANY</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>COMPANY</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>COMPANY</ThemedText>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              title="Edit Profile"
              onPress={() => {}}
              variant="primary"
              style={styles.editButton}
            />

            <Button
              title="Continue"
              onPress={() => {router.push("/(main)/home")}}
              variant="secondary"
              style={styles.editButtonSecondary}
              textStyle={styles.editButtonSecondaryText}
            />
          </View>
        </View>

        {/* Approval Pending Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/images/pending.png")}
            style={styles.pendingImage}
            resizeMode="contain"
          />
        </View>

        {/* Approval Message */}
        <View style={styles.approvalContainer}>
          <ThemedText style={styles.approvalText}>
            <ThemedText style={styles.approvalLabel}>NB:</ThemedText> Kindly
            Wait For an Approval message via your email and SMS via your phone
            number
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7CB342",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  logoIcon: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7CB342",
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: "#7CB342",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  profileHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  storeImageContainer: {
    marginRight: 16,
  },
  storeImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  storeImageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  storeInfo: {
    flex: 1,
  },
  storeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#7CB342",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedIcon: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  storeType: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
  },
  storeDescription: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  statsLabel: {
    fontSize: 14,
    color: "#666666",
  },
  fullDescription: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    flex: 1,
  },
  editButtonSecondary: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#7CB342",
  },
  editButtonSecondaryText: {
    color: "#7CB342",
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  pendingImage: {
    width: 280,
    height: 280,
  },
  approvalContainer: {
    backgroundColor: "#F8FDF8",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#7CB342",
  },
  approvalText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    textAlign: "center",
  },
  approvalLabel: {
    fontWeight: "bold",
    color: "#7CB342",
  },
  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
    color: "#7CB342",
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
