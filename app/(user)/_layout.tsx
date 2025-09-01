import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserLayout() {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Home",
      route: "/(user)/Home",
      icon: (color: string) => <FontAwesome6 name="house" size={22} color={color} />,
    },
    {
      name: "Shops",
      route: "/(user)/Shops",
      icon: (color: string) => <Entypo name="shop" size={24} color={color} />,
    },
    {
      name: "Products",
      route: "/(user)/Products",
      icon: (color: string) => (
        <MaterialIcons name="production-quantity-limits" size={24} color={color} />
      ),
    },
    {
      name: "Chats",
      route: "/(user)/ChatList",
      icon: (color: string) => <MaterialIcons name="chat" size={24} color={color} />,
    },
    {
      name: "Recent",
      route: "/(user)/RecentlyViewed",
      icon: (color: string) => <MaterialIcons name="history" size={24} color={color} />,
    },
  ] as const;

  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      {/* Render all (user) screens */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.route;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabButton, isActive && styles.activeTab]}
              onPress={() => router.push(tab.route)}
            >
              {tab.icon(isActive ? "#fff" : Colors.tint)}
              {isActive && <Text style={styles.activeTabText}>{tab.name}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    height: 58,
    borderRadius: 28,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: Colors.tint,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 8,
  },
});
