import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  style?: any;
}

const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate = new Date(), 
  onDateSelect,
  style 
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDate(date, today);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setCurrentDate(newDate);
    onDateSelect?.(newDate);
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex, currentDate.getDate());
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const selectYear = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), currentDate.getDate());
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayButton}>
          <Text style={styles.emptyDayText}></Text>
        </View>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = isSameDate(dayDate, selectedDate);
      const isTodayDate = isToday(dayDate);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayButton,
            isSelected && styles.selectedDay,
            isTodayDate && !isSelected && styles.todayDay
          ]}
          onPress={() => selectDate(day)}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isTodayDate && !isSelected && styles.todayDayText
          ]}>
            {day.toString().padStart(2, '0')}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      years.push(year);
    }

    return (
      <Modal
        visible={showYearPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Year</Text>
              <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerList}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.pickerItem,
                    year === currentDate.getFullYear() && styles.selectedPickerItem
                  ]}
                  onPress={() => selectYear(year)}
                >
                  <Text style={[
                    styles.pickerItemText,
                    year === currentDate.getFullYear() && styles.selectedPickerItemText
                  ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderMonthPicker = () => {
    return (
      <Modal
        visible={showMonthPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Month</Text>
              <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerList}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.pickerItem,
                    index === currentDate.getMonth() && styles.selectedPickerItem
                  ]}
                  onPress={() => selectMonth(index)}
                >
                  <Text style={[
                    styles.pickerItemText,
                    index === currentDate.getMonth() && styles.selectedPickerItemText
                  ]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.calendarContainer, style]}>
      {/* Header with month/year navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <Ionicons name="chevron-back" size={24} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <TouchableOpacity 
            style={styles.monthYearButton}
            onPress={() => setShowMonthPicker(true)}
          >
            <Text style={styles.monthText}>
              {months[currentDate.getMonth()]}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#4CAF50" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.monthYearButton}
            onPress={() => setShowYearPicker(true)}
          >
            <Text style={styles.yearText}>
              {currentDate.getFullYear()}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Week days header */}
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDayButton}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar days grid */}
      <View style={styles.daysGrid}>
        {renderCalendarDays()}
      </View>

      {/* Quick navigation to today */}
      <TouchableOpacity 
        style={styles.todayButton}
        onPress={() => {
          const today = new Date();
          setCurrentDate(today);
          onDateSelect?.(today);
        }}
      >
        <Ionicons name="today" size={16} color="#4CAF50" />
        <Text style={styles.todayButtonText}>Today</Text>
      </TouchableOpacity>

      {renderYearPicker()}
      {renderMonthPicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monthYearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  monthText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 16,
  },
  yearText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 16,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDayButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  todayDay: {
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todayDayText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  emptyDayText: {
    fontSize: 16,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 8,
    gap: 5,
  },
  todayButtonText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    maxHeight: '70%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerList: {
    maxHeight: 300,
  },
  pickerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  selectedPickerItem: {
    backgroundColor: '#E8F5E8',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedPickerItemText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default Calendar;