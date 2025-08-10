import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('Reviews');

  const reviews = [
    {
      id: 1,
      user: 'User Name',
      avatar: require('@/assets/images/avatar.png'),
      title: 'Great shirt!',
      rating: 4.5,
      date: 'Dec 23, 2022',
      comment: 'The material is great and the fit is perfect. I bought it for my son and he loves it.',
      hasResponse: true
    },
    {
      id: 2,
      user: 'User Name',
      avatar: require('@/assets/images/avatar.png'),
      title: 'Great shirt!',
      rating: 4.5,
      date: 'Dec 23, 2022',
      comment: 'The material is great and the fit is perfect. I bought it for my son and he loves it.',
      hasResponse: true
    },
    {
      id: 3,
      user: 'User Name',
      avatar: require('@/assets/images/avatar.png'),
      title: 'Great shirt!',
      rating: 4.5,
      date: 'Dec 23, 2022',
      comment: 'The material is great and the fit is perfect. I bought it for my son and he loves it.',
      hasResponse: true
    }
  ];

  const complaints = [
    {
      id: 1,
      user: 'User Name',
      avatar: require('@/assets/images/avatar.png'),
      title: 'Poor quality!',
      rating: 2.0,
      date: 'Dec 20, 2022',
      comment: 'The material feels cheap and the sizing is completely off. Very disappointed with this purchase.',
      hasResponse: false
    }
  ];

  const currentData = activeTab === 'Reviews' ? reviews : complaints;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="storefront" size={20} color="white" />
          </View>
          <Text style={styles.logoText}>Shopa</Text>
        </View>
        <Image 
          source={require('@/assets/images/avatar.png')} 
          style={styles.avatar} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Buyer reviews & complaints</Text>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
            onPress={() => setActiveTab('Reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Complaints' && styles.activeTab]}
            onPress={() => setActiveTab('Complaints')}
          >
            <Text style={[styles.tabText, activeTab === 'Complaints' && styles.activeTabText]}>
              Complaints
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reviews/Complaints List */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.reviewsList}>
          {currentData.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={item.avatar} style={styles.reviewAvatar} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewTitle}>{item.title}</Text>
                  <View style={styles.reviewMeta}>
                    <Text style={styles.reviewRating}>{item.rating} star</Text>
                    <Text style={styles.reviewDate}>• {item.date}</Text>
                  </View>
                  {item.hasResponse && (
                    <View style={styles.responseStatus}>
                      <Text style={styles.responseText}>Respond on</Text>
                      <View style={styles.whatsappIcon}>
                        <Ionicons name="logo-whatsapp" size={12} color="white" />
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  reviewsList: {
    flex: 1,
  },
  reviewCard: {
    marginBottom: 25,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: '#666',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  responseStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseText: {
    fontSize: 12,
    color: '#4CAF50',
    marginRight: 5,
  },
  whatsappIcon: {
    backgroundColor: '#25D366',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingLeft: 65,
  },
});