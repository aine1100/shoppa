import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      icon: "home-outline",
      activeIcon: "home",
      route: "/(main)/home",
    },
    {
      id: "favorites",
      icon: "heart-outline",
      activeIcon: "heart",
      route: "/(main)/favorites",
    },
    {
      id: "orders",
      icon: "receipt-outline",
      activeIcon: "receipt",
      route: "/(main)/orders",
    },
    {
      id: "cart",
      icon: "bag-outline",
      activeIcon: "bag",
      route: "/(main)/cart",
    },
    {
      id: "settings",
      icon: "person-outline",
      activeIcon: "person",
      route: "/(main)/settings",
    },
  ];

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  const isActiveTab = (tabId: string, route: string) => {
    if (activeTab) {
      return activeTab === tabId;
    }
    return pathname === route || pathname.startsWith(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab.id, tab.route);
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.route)}
            >
              <Ionicons
                name={isActive ? (tab.activeIcon as any) : (tab.icon as any)}
                size={24}
                color={isActive ? "#4CAF50" : "#999"}
              />
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.homeIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 5,
  },
});

export default BottomNavigation;
