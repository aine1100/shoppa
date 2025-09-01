import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          {Ionicons.glyphMap['cart'] ? (
            <Ionicons name="cart" size={32} color="#68AE3C" />
          ) : (() => {
            let Lucide: any = null;
            try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
            if (!Lucide) return <Ionicons name="help-circle" size={32} color="#68AE3C" />;
            const { ShoppingCart } = Lucide;
            return <ShoppingCart size={32} color="#68AE3C" />;
          })()}
        </View>
        <Text style={styles.brand}>Shopa</Text>
        <Text style={styles.tagline}>Beautiful Digital Shop for your online store</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/buyer/auth/signUp") }>
          <Text style={styles.primaryButtonText}>Create Buyer Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/shop/auth/signUp") }>
          <Text style={styles.secondaryButtonText}>Create Seller Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginRow}>
        <TouchableOpacity onPress={() => router.push("/shop/auth/login") }>
          <Text style={styles.loginHint}>Seller Login</Text>
        </TouchableOpacity>
        <View style={{ width: 16 }} />
        <TouchableOpacity onPress={() => router.push("/buyer/auth/login") }>
          <Text style={styles.loginHint}>Buyer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24, paddingTop: 100, alignItems: "center" },
  header: { alignItems: "center", marginBottom: 40 },
  iconCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#E8F5E9", alignItems: "center", justifyContent: "center" },
  brand: { fontSize: 24, fontWeight: "700", color: "#68AE3C", marginTop: 16 },
  tagline: { fontSize: 13, color: "#666", textAlign: "center", marginTop: 8 },
  actions: { width: "100%", marginTop: 24, gap: 12 },
  primaryButton: { backgroundColor: "#68AE3C", paddingVertical: 14, borderRadius: 8, alignItems: "center" },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryButton: { backgroundColor: "#fff", paddingVertical: 14, borderRadius: 8, alignItems: "center", borderWidth: 1, borderColor: "#68AE3C" },
  secondaryButtonText: { color: "#68AE3C", fontSize: 16, fontWeight: "600" },
  loginRow: { flexDirection: "row", marginTop: 20 },
  loginHint: { color: "#666" },
});


