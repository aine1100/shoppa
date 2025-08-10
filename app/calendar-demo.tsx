import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../components/ui/Calendar';

export default function CalendarDemoScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2024, 11, 25), title: 'Christmas', type: 'holiday' },
    { date: new Date(2024, 11, 31), title: 'New Year\'s Eve', type: 'holiday' },
    { date: new Date(2025, 0, 1), title: 'New Year\'s Day', type: 'holiday' },
    { date: new Date(), title: 'Today', type: 'today' },
  ]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date.toDateString());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const todayEvents = getEventsForDate(selectedDate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar Demo</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Full Year Calendar</Text>
        <Text style={styles.subtitle}>
          Navigate through months and years, select dates, and view events
        </Text>

        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          style={styles.calendar}
        />

        <View style={styles.selectedDateInfo}>
          <Text style={styles.selectedDateTitle}>Selected Date</Text>
          <Text style={styles.selectedDateText}>
            {formatDate(selectedDate)}
          </Text>
          
          {todayEvents.length > 0 && (
            <View style={styles.eventsContainer}>
              <Text style={styles.eventsTitle}>Events on this date:</Text>
              {todayEvents.map((event, index) => (
                <View key={index} style={[
                  styles.eventItem,
                  event.type === 'holiday' && styles.holidayEvent,
                  event.type === 'today' && styles.todayEvent
                ]}>
                  <Text style={styles.eventText}>{event.title}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Calendar Features</Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Navigate through any month and year</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="finger-print-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Touch to select any date</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="today-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Quick navigation to today</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="list-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Month and year picker modals</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="color-palette-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Highlighted today and selected dates</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="phone-portrait-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Responsive design for all screen sizes</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDateSelect(new Date())}
          >
            <Ionicons name="today" size={20} color="white" />
            <Text style={styles.actionButtonText}>Go to Today</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              const christmas = new Date(2024, 11, 25);
              handleDateSelect(christmas);
            }}
          >
            <Ionicons name="gift" size={20} color="white" />
            <Text style={styles.actionButtonText}>Go to Christmas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              const newYear = new Date(2025, 0, 1);
              handleDateSelect(newYear);
            }}
          >
            <Ionicons name="sparkles" size={20} color="white" />
            <Text style={styles.actionButtonText}>Go to New Year</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  calendar: {
    marginBottom: 30,
  },
  selectedDateInfo: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  selectedDateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  selectedDateText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  holidayEvent: {
    backgroundColor: '#FFE8E8',
  },
  todayEvent: {
    backgroundColor: '#E8F4FD',
  },
  eventText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 15,
    flex: 1,
  },
  quickActions: {
    marginBottom: 30,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
  },
});