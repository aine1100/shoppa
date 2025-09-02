import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useCurrentUser } from "@/hooks/useAuth";
import { useCreateOrUpdateShop } from "@/hooks/useShop";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditStoreScreen() {
  const { data: authData, isLoading } = useCurrentUser();
  const createOrUpdateShopMutation = useCreateOrUpdateShop();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (authData?.shop) {
      setTitle(authData.shop.title || "");
      setDescription(authData.shop.description || "");
      setSize(authData.shop.size || "");
    }
  }, [authData]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!authData?.success || !authData.user) {
    router.push("/shop/auth/login");
    return null;
  }

  const { user } = authData;

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a store title");
      return;
    }

    try {
      const result = await createOrUpdateShopMutation.mutateAsync({
        ownerId: user.id,
        shopData: {
          title: title.trim(),
          description: description.trim(),
          size: size.trim(),
        },
      });

      if (result.success) {
        Alert.alert("Success", "Store updated successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", result.error || "Failed to update store");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update store. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Edit Store</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ThemedView style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Store Setup Form */}
          <View style={styles.formContainer}>
            <ThemedText style={styles.sectionTitle}>
              Store Information
            </ThemedText>

            <Input
              placeholder="Store Name"
              value={title}
              onChangeText={setTitle}
              leftIconName="storefront"
              style={styles.input}
            />

            <Input
              placeholder="Store Description"
              value={description}
              onChangeText={setDescription}
              leftIconName="document-text"
              multiline
              numberOfLines={4}
              style={styles.textAreaInput}
            />

            <Input
              placeholder="Store Size (e.g., Small, Medium, Large)"
              value={size}
              onChangeText={setSize}
              leftIconName="resize"
              style={styles.input}
            />

            <Button
              title={
                createOrUpdateShopMutation.isPending
                  ? "Saving..."
                  : "Save Changes"
              }
              onPress={handleSave}
              variant="primary"
              style={styles.saveButton}
              disabled={createOrUpdateShopMutation.isPending}
            />
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    padding: 20,
  },
  formContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  textAreaInput: {
    marginBottom: 8,
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    marginTop: 20,
  },
});
