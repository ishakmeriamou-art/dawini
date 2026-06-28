// components/doctors/TimePicker.tsx
// شبكة أوقات مطابقة للصورة المرجعية — داخل بطاقة بيضاء

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TimeSlot } from '@/types/doctor';

interface TimePickerProps {
  slots: TimeSlot[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function TimeChip({
  slot,
  isSelected,
  onSelect,
}: {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const isUnavailable = !slot.available;

  return (
    <Animated.View style={[styles.chipWrap, animStyle]}>
      <TouchableOpacity
        onPress={() => slot.available && onSelect(slot.id)}
        onPressIn={() => { if (slot.available) scale.value = withSpring(0.93, { damping: 8 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 6 }); }}
        activeOpacity={1}
        disabled={isUnavailable}
        style={[
          styles.chip,
          isSelected && styles.chipSelected,
          isUnavailable && styles.chipDisabled,
        ]}
      >
        <Text
          style={[
            styles.chipText,
            isSelected && styles.chipTextSelected,
            isUnavailable && styles.chipTextDisabled,
          ]}
        >
          {slot.time}
        </Text>
        {isUnavailable && <View style={styles.strikethrough} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function TimePicker({ slots, selectedId, onSelect }: TimePickerProps) {
  return (
    <View style={styles.wrapper}>
      {/* بطاقة بيضاء تحتوي الكل — مطابقة للصورة */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>اختر الوقت</Text>
        <View style={styles.grid}>
          {slots.map((slot) => (
            <TimeChip
              key={slot.id}
              slot={slot}
              isSelected={selectedId === slot.id}
              onSelect={onSelect}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'right',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  chipWrap: {
    width: '30%',
  },
  chip: {
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#F8FCFC',
    borderWidth: 1,
    borderColor: '#E6F6F5',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  chipSelected: {
    backgroundColor: '#5ED6CF',
    borderColor: '#5ED6CF',
    shadowColor: '#5ED6CF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipDisabled: {
    opacity: 0.45,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  chipTextDisabled: {
    color: '#9CA3AF',
  },
  strikethrough: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1.5,
    backgroundColor: '#9CA3AF',
    opacity: 0.4,
  },
});