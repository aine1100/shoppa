import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Calendar from '../../components/ui/Calendar';

const RecentlyViewedScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const products = [
    {
      id: 1,
      image: require('@/assets/images/product.png'),
      title: 'Lorem ipsum dolor sit amet consectetur',
      price: '$17.00'
    },
    {
      id: 2,
      image: require('@/assets/images/product.png'),
      title: 'Lorem ipsum dolor sit amet consectetur',
      price: '$17.00'
    },
    {
      id: 3,
      image: require('@/assets/images/product.png'),
      title: 'Lorem ipsum dolor sit amet consectetur',
      price: '$17.00'
    },
    {
      id: 4,
      image: require('@/assets/images/product.png'),
      title: 'Lorem ipsum dolor sit amet consectetur',
      price: '$17.00'
    }
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Filter products based on selected date
    console.log('Selected date:', date);
  };

  const handleProductPress = (productId: number) => {
    router.push('/shop/product/product-detail');
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Recently viewed</Text>
          
          <Calendar 
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            style={styles.calendar}
          />
          
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.productCard}
                onPress={() => handleProductPress(product.id)}
              >
                <Image source={product.image} style={styles.productImage} />
                <Text style={styles.productTitle}>{product.title}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{product.price}</Text>
                  <TouchableOpacity style={styles.whatsappButton}>
                    <Ionicons name="logo-whatsapp" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 30,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecentlyViewedScreen;