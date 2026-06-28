// components/doctors/BookButton.tsx
// زر كبير مطابق للصورة المرجعية

import React from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface BookButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function BookButton({ onPress, disabled = false }: BookButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedTouchable
        style={[styles.button, disabled && styles.buttonDisabled, animStyle]}
        onPress={handlePress}
        onPressIn={() => { scale.value = withSpring(0.96, { damping: 10 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 8 }); }}
        activeOpacity={1}
        disabled={disabled}
      >
        <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
        <Text style={styles.label}>احجز الموعد</Text>
      </AnimatedTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 4 : 16,
    backgroundColor: '#F8FCFC',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#5ED6CF',
    borderRadius: 50,          // capsule shape — مطابق للصورة
    paddingVertical: 20,
    shadowColor: '#38B2AC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#AEEFEB',
    shadowOpacity: 0.08,
    elevation: 2,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});