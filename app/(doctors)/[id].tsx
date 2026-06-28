// app/(doctors)/[id].tsx

import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import DoctorHeader from '@/components/doctors/DoctorHeader';
import DoctorInfo from '@/components/doctors/DoctorInfo';
import StatsCard from '@/components/doctors/StatsCard';
import DayPicker from '@/components/doctors/DayPicker';
import TimePicker from '@/components/doctors/TimePicker';
import BookButton from '@/components/doctors/BookButton';

import { MOCK_DOCTOR, TIME_SLOTS, generateDays } from '@/data/mockDoctor';

const DAYS = generateDays();

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = MOCK_DOCTOR;

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);

  const handleBook = useCallback(() => {
    if (!selectedTimeId) {
      Alert.alert('تنبيه', 'الرجاء اختيار وقت الموعد');
      return;
    }
    const day = DAYS[selectedDayIndex];
    const slot = TIME_SLOTS.find((s) => s.id === selectedTimeId);
    Alert.alert(
      '✅ تم الحجز بنجاح',
      `${doctor.name}\nيوم ${day.dayName} ${day.date} — الساعة ${slot?.time}`,
      [{ text: 'حسنًا' }]
    );
  }, [selectedTimeId, selectedDayIndex, doctor.name]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FCFC" />
      <DoctorHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <DoctorInfo doctor={doctor} />
        <StatsCard doctor={doctor} />
        <DayPicker
          days={DAYS}
          selectedIndex={selectedDayIndex}
          onSelect={setSelectedDayIndex}
        />
        <TimePicker
          slots={TIME_SLOTS}
          selectedId={selectedTimeId}
          onSelect={setSelectedTimeId}
        />
        <View style={{ height: 24 }} />
      </ScrollView>
      <BookButton onPress={handleBook} disabled={!selectedTimeId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FCFC',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 8 },
});