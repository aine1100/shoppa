import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const getIconSource = () => {
    switch (name) {
      case "home":
        return focused
          ? require("@/assets/tabIcons/Shop.png")
          : require("@/assets/tabIcons/Shop.png");
      case "favorites":
        return focused
          ? require("@/assets/tabIcons/wishlist.png")
          : require("@/assets/tabIcons/wishlist.png");
      case "orders":
        return focused
          ? require("@/assets/tabIcons/Categories.png")
          : require("@/assets/tabIcons/Categories.png");
      case "cart":
        return focused
          ? require("@/assets/tabIcons/Cart.png")
          : require("@/assets/tabIcons/Cart.png");
      case "settings":
        return focused
          ? require("@/assets/tabIcons/setting.png")
          : require("@/assets/tabIcons/setting.png");
      default:
        return require("@/assets/tabIcons/Shop.png");
    }
  };

  return (
    <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      <Image
        source={getIconSource()}
        style={[styles.iconImage, focused && styles.iconImageFocused]}
        resizeMode="contain"
      />
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
}

export default function MainTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#7CB342",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="favorites" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="orders" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="cart" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="settings" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  tabIconFocused: {
    // Add any focused styles here
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  iconImageFocused: {
    // Add any focused image styles here
  },
  activeIndicator: {
    position: "absolute",
    bottom: -8,
    width: 30,
    height: 3,
    backgroundColor: "#7CB342",
    borderRadius: 2,
  },
});
