// components/doctors/DayPicker.tsx
// دوائر أيام مطابقة للصورة المرجعية

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { DayItem } from '@/types/doctor';

interface DayPickerProps {
  days: DayItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function DayCard({
  day,
  isSelected,
  onPress,
}: {
  day: DayItem;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.9, { damping: 8 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 6 }); }}
        activeOpacity={1}
        style={[styles.dayCard, isSelected && styles.dayCardSelected]}
      >
        <Text style={[styles.dayNum, isSelected && styles.dayNumSelected]}>
          {day.date}
        </Text>
        <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
          {day.dayName}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function DayPicker({ days, selectedIndex, onSelect }: DayPickerProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((day, index) => (
          <DayCard
            key={index}
            day={day}
            isSelected={selectedIndex === index}
            onPress={() => onSelect(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  dayCard: {
    width: 56,
    height: 72,
    borderRadius: 28,        // دائري تماماً — مطابق للصورة
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dayCardSelected: {
    backgroundColor: '#5ED6CF',
    shadowColor: '#5ED6CF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  dayNum: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  dayNumSelected: {
    color: '#FFFFFF',
  },
  dayName: {
    fontSize: 11,
    color: '#7C8A96',
    fontWeight: '500',
  },
  dayNameSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
});