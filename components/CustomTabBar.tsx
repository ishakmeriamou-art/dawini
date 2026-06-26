// components/CustomTabBar.tsx
// شريط تنقل سفلي عائم (Floating) مع Capsule ناعمة متحركة خلف الأيقونة المفعّلة

import { useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { AppColors, Spacing } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TAB_ITEMS = [
  { key: 'index', icon: 'home', iconOutline: 'home-outline' },
  { key: 'appointments', icon: 'calendar', iconOutline: 'calendar-outline' },
  { key: 'messages', icon: 'chatbubble', iconOutline: 'chatbubble-outline' },
  { key: 'profile', icon: 'person', iconOutline: 'person-outline' },
] as const;

// أبعاد الـ Capsule العائمة (تحسب بشكل مستقل عن عرض الشاشة الكامل)
const CAPSULE_HORIZONTAL_MARGIN = Spacing[8];
const CAPSULE_INNER_PADDING = Spacing[2];
const ITEM_SIZE = 42;

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const capsuleTrackWidth =
    SCREEN_WIDTH - CAPSULE_HORIZONTAL_MARGIN * 2 - CAPSULE_INNER_PADDING * 2;
  const itemSlotWidth = capsuleTrackWidth / TAB_ITEMS.length;

  // الاتجاه RTL: العنصر الأول بصريًا (الرئيسية) يقع في أقصى اليمين
  const translateX = useSharedValue(0);

  useEffect(() => {
    const targetVisualIndex = TAB_ITEMS.length - 1 - state.index;
    translateX.value = withSpring(targetVisualIndex * itemSlotWidth, {
      damping: 18,
      stiffness: 160,
    });
  }, [state.index]);

  const capsuleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <Animated.View
          style={[styles.capsule, { width: itemSlotWidth }, capsuleStyle]}
        />

        {[...TAB_ITEMS].reverse().map((tab, displayIndex) => {
          const actualIndex = TAB_ITEMS.length - 1 - displayIndex;
          const isFocused = state.index === actualIndex;

          return (
            <Pressable
              key={tab.key}
              onPress={() => navigation.navigate(tab.key)}
              style={[styles.tabItem, { width: itemSlotWidth }]}
              hitSlop={6}
            >
              <Ionicons
                name={(isFocused ? tab.icon : tab.iconOutline) as any}
                size={19}
                color={isFocused ? AppColors.primary : AppColors.textMuted}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Spacing[6],
    left: CAPSULE_HORIZONTAL_MARGIN,
    right: CAPSULE_HORIZONTAL_MARGIN,
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: AppColors.surface,
    borderRadius: Spacing.borderRadius.full,
    padding: CAPSULE_INNER_PADDING,
    shadowColor: '#1A2E2B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 10,
  },
  capsule: {
    position: 'absolute',
    top: CAPSULE_INNER_PADDING,
    height: ITEM_SIZE,
    backgroundColor: AppColors.primarySoft,
    borderRadius: Spacing.borderRadius.full,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_SIZE,
  },
});