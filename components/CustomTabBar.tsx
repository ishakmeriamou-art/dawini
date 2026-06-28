// components/CustomTabBar.tsx
// ✅ النسخة المحسّنة — CustomTabBar
//
// التحسينات:
// 1. أيقونات أكبر: 19px → 22px (معيار iOS/Android = 24px)
// 2. ITEM_SIZE أكبر: 42px → 48px → Hit Area مريح للأصابع
// 3. إضافة Label نصي صغير تحت الأيقونة المفعّلة فقط
//    → يُوضح وظيفة كل تبويب بدون ازدحام
// 4. حركة Label: Fade in/out ناعمة مع الـ Capsule
// 5. إصلاح حساب translateX: أضفنا CAPSULE_INNER_PADDING
//    حتى تتمركز الـ Capsule بدقة تحت كل أيقونة
// 6. Border خفيف على الـ tabRow لفصله عن الخلفية البيضاء
// 7. تأثير Haptic محاكى عبر scale animation عند الضغط

import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { AppColors, Spacing, Typography } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TAB_ITEMS = [
  {
    key: 'index',
    icon: 'home',
    iconOutline: 'home-outline',
    label: 'الرئيسية',
  },
  {
    key: 'appointments',
    icon: 'calendar',
    iconOutline: 'calendar-outline',
    label: 'المواعيد',
  },
  {
    key: 'messages',
    icon: 'chatbubble',
    iconOutline: 'chatbubble-outline',
    label: 'الرسائل',
  },
  {
    key: 'profile',
    icon: 'person',
    iconOutline: 'person-outline',
    label: 'حسابي',
  },
] as const;

const CAPSULE_HORIZONTAL_MARGIN = Spacing[8];  // 32px من كل جانب
const CAPSULE_INNER_PADDING = Spacing[2];       // 8px padding داخل الـ tabRow
const ITEM_SIZE = 48;                           // ✅ 48px بدلاً من 42px
const ICON_SIZE = 22;                           // ✅ 22px بدلاً من 19px

// ── مكوّن تبويب واحد ─────────────────────────────
function TabItem({
  tab,
  isFocused,
  itemSlotWidth,
  onPress,
}: {
  tab: (typeof TAB_ITEMS)[number];
  isFocused: boolean;
  itemSlotWidth: number;
  onPress: () => void;
}) {
  // حركة الـ Label: يظهر فقط عند التفعيل
  const labelOpacity = useSharedValue(isFocused ? 1 : 0);
  const labelY = useSharedValue(isFocused ? 0 : 4);

  // حركة الضغط
  const pressScale = useSharedValue(1);

  useEffect(() => {
    labelOpacity.value = withTiming(isFocused ? 1 : 0, {
      duration: 220,
      easing: Easing.inOut(Easing.cubic),
    });
    labelY.value = withTiming(isFocused ? 0 : 4, {
      duration: 220,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [isFocused]);

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [{ translateY: labelY.value }],
  }));

  const itemStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        pressScale.value = withTiming(0.88, { duration: 80 });
      }}
      onPressOut={() => {
        pressScale.value = withSpring(1, { damping: 14, stiffness: 240 });
      }}
      style={[styles.tabItem, { width: itemSlotWidth }]}
      hitSlop={6}
    >
      <Animated.View style={[styles.tabItemInner, itemStyle]}>
        {/* الأيقونة */}
        <Ionicons
          name={(isFocused ? tab.icon : tab.iconOutline) as any}
          size={ICON_SIZE}
          color={isFocused ? AppColors.primary : AppColors.textMuted}
        />

        {/* Label يظهر فقط عند التفعيل */}
        <Animated.Text
          style={[styles.tabLabel, labelStyle]}
          numberOfLines={1}
        >
          {tab.label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

// ── المكوّن الرئيسي ───────────────────────────────
export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const capsuleTrackWidth =
    SCREEN_WIDTH - CAPSULE_HORIZONTAL_MARGIN * 2 - CAPSULE_INNER_PADDING * 2;
  const itemSlotWidth = capsuleTrackWidth / TAB_ITEMS.length;

  // ✅ إصلاح: نضيف CAPSULE_INNER_PADDING للبداية حتى تتمركز الـ Capsule بدقة
  const translateX = useSharedValue(
    (TAB_ITEMS.length - 1) * itemSlotWidth
  );

  useEffect(() => {
    // RTL: العنصر index=0 (الرئيسية) يظهر بصرياً في أقصى اليمين
    // visualIndex = 0 → أقصى اليمين → translateX = (length-1) * slotWidth
    // visualIndex = 3 → أقصى اليسار → translateX = 0
    const targetVisualIndex = TAB_ITEMS.length - 1 - state.index;
    translateX.value = withSpring(targetVisualIndex * itemSlotWidth, {
      damping: 20,
      stiffness: 180,
      mass: 0.8,
    });
  }, [state.index, itemSlotWidth]);

  const capsuleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>

        {/* الـ Capsule المتحركة خلف الأيقونة المفعّلة */}
        <Animated.View
          style={[
            styles.capsule,
            { width: itemSlotWidth },
            capsuleStyle,
          ]}
        />

        {/* التبويبات — مقلوبة لـ RTL */}
        {[...TAB_ITEMS].reverse().map((tab, displayIndex) => {
          const actualIndex = TAB_ITEMS.length - 1 - displayIndex;
          const isFocused = state.index === actualIndex;

          return (
            <TabItem
              key={tab.key}
              tab={tab}
              isFocused={isFocused}
              itemSlotWidth={itemSlotWidth}
              onPress={() => {
                // لا تُعيد التنقل إذا كنت بالفعل في نفس الشاشة
                if (!isFocused) {
                  navigation.navigate(tab.key);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Spacing[6],          // 24px من أسفل الشاشة
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
    // ✅ Border خفيف لفصل الشريط عن خلفية الصفحة البيضاء
    borderWidth: 1,
    borderColor: AppColors.border,
    // الظل
    shadowColor: '#1A2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },

  capsule: {
    position: 'absolute',
    top: CAPSULE_INNER_PADDING,
    left: CAPSULE_INNER_PADDING,   // ✅ إصلاح: يبدأ من بعد الـ padding
    height: ITEM_SIZE,
    backgroundColor: AppColors.primarySoft,
    borderRadius: Spacing.borderRadius.full,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_SIZE,             // ✅ 48px
  },

  tabItemInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,                        // مسافة بين الأيقونة والـ label
  },

  tabLabel: {
    fontSize: Typography.size.xs,  // 11px
    fontWeight: Typography.weight.semibold,
    color: AppColors.primary,
    textAlign: 'center',
  },
});