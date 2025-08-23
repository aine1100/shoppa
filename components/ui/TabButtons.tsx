import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabButtons = () => {
  const [selectedTab, setSelectedTab] = useState('All'); 

  const tabs = ['All', 'Clothes'];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.button,
            selectedTab === tab ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === tab ? styles.selectedText : styles.unselectedText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: Colors.tabIconSelected,
  },
  unselectedButton: {
    backgroundColor:"white",
    opacity: 0.7,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'black',
  },
});

export default TabButtons;