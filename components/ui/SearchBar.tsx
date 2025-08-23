import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Product"
        placeholderTextColor="#bdbdbd"
      />
      <TouchableOpacity style={styles.iconWrapper}>
        <Ionicons name="image-outline" size={22} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7", 
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconWrapper: {
    paddingLeft: 10,
  },
});

export default SearchBar;
