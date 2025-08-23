// app/screens/HomeScreen.tsx (or .js)
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "@/components/ui/SearchBar";
import ProductCard from "@/components/ui/ProductCard";
import ShopCard from "@/components/ui/ShopCard";
import TabButtons from "@/components/ui/TabButtons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        {/* <TouchableOpacity style={styles.iconCircle}>
          <Ionicons name="menu-outline" size={22} color="#111" />
        </TouchableOpacity> */}
        {/* <Text style={styles.brand}>Shopa</Text> */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollPad}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchWrap}>
          <SearchBar />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>
              Get all the products{"\n"}from different shops
            </Text>
            <TouchableOpacity style={styles.exploreBtn}>
              <Text style={styles.exploreTxt}>Explore</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/images/shoe.png")}
            style={styles.bannerImg}
          />
        </View>

        {/* Products */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Products</Text>
        </View>

        {/* small spacing between title and tabs */}
        <View style={{ height: 6 }} />

        <TabButtons />

        <View style={styles.sectionRow}>
          <Text style={styles.subSectionTitle}>Latest</Text>
          <TouchableOpacity>
            <Text style={styles.link}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Product card */}
        <View style={styles.cardPad}>
          <ProductCard />
        </View>

        {/* Shops */}
        <View style={styles.sectionRow}>
          <Text style={styles.subSectionTitle}>Shops</Text>
          <TouchableOpacity>
            <Text style={styles.link}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shopsRow}
        >
          <View style={{ marginRight: 14 }}>
            <ShopCard />
          </View>
          <View style={{ marginRight: 14 }}>
            <ShopCard />
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.homePill}>
          <Ionicons name="home" size={18} color="#fff" />
          <Text style={styles.homePillTxt}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(user)/Shops")}
        >
          <Entypo name="shop" size={24} color={Colors.tint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(user)/Products")}
        >
          <MaterialIcons name="production-quantity-limits" size={24} color={Colors.tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const R = 16;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  brand: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.tint,
  },

  scrollPad: { paddingBottom: 100 },

  searchWrap: { paddingHorizontal: 16, marginTop: 8 },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tint,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: R,
    height: 150,
    paddingHorizontal: 16,
  },
  bannerLeft: { flex: 1, paddingRight: 8 },
  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  exploreBtn: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  exploreTxt: { color: Colors.tint, fontWeight: "700" },
  bannerImg: { 
    width: 200, 
    height: 195, 
    position: "absolute",
    right: -20,
    top: 20
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  link: { color: Colors.tint, fontSize: 13, fontWeight: "600" },

  cardPad: { paddingHorizontal: 8, marginTop: 6 },

  shopsRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

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
  },
  homePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tint,
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 19,
    minWidth: 92,
    justifyContent: "center",
  },
  homePillTxt: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 13,
  },
  navCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
