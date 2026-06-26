// components/SpecialtyPill.tsx
// عنصر تخصص واحد ضمن شريط التخصصات الأفقي
// يدير: دخول متدرّج (stagger)، انتقال سلس بين عادي/مفعّل، وتأثير ضغط واضح

import { useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

import { AppColors, Spacing, Typography } from '../theme';

type SpecialtyPillProps = {
  label: string;
  icon: string;
  isActive: boolean;
  entryDelay?: number;
  onPress?: () => void;
};

export default function SpecialtyPill({
  label,
  icon,
  isActive,
  entryDelay = 0,
  onPress,
}: SpecialtyPillProps) {
  // ── حركة الدخول (Fade + Slide up) ──────────────
  const entryOpacity = useSharedValue(0);
  const entryY = useSharedValue(12);

  useEffect(() => {
    entryOpacity.value = withDelay(
      entryDelay,
      withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) })
    );
    entryY.value = withDelay(
      entryDelay,
      withSpring(0, { damping: 15, stiffness: 140 })
    );
  }, []);

  // ── حركة الانتقال بين عادي/مفعّل ──────────────
  // progress: 0 = عادي (دائرة صغيرة شفافة), 1 = مفعّل (كبسولة تركوازية)
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 280,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [isActive]);

  // ── حركة الضغط (Scale) ──────────────
  const pressScale = useSharedValue(1);

  const entryStyle = useAnimatedStyle(() => ({
    opacity: entryOpacity.value,
    transform: [{ translateY: entryY.value }],
  }));

  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [AppColors.primarySoft, AppColors.primary]
    ),
    paddingHorizontal: 14 + progress.value * 4,
    transform: [{ scale: pressScale.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    // نمنع العرض اللاحق للنص عندما لا تكون مفعّلة عبر تصغير الحجم تدريجيًا
    transform: [{ scale: 0.85 + progress.value * 0.15 }],
  }));

  const iconWrapperStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
    width: progress.value * 26,
    marginRight: progress.value * Spacing[2],
  }));

  const iconColor = isActive ? AppColors.primary : AppColors.primary;

  return (
    <Animated.View style={entryStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          pressScale.value = withTiming(0.92, { duration: 90 });
        }}
        onPressOut={() => {
          pressScale.value = withSpring(1, { damping: 12, stiffness: 220 });
        }}
        hitSlop={4}
      >
        <Animated.View style={[styles.pill, pillStyle]}>
          {!isActive && <Ionicons name={icon as any} size={17} color={iconColor} />}

          {isActive && (
            <>
              <Animated.Text style={[styles.labelActive, labelStyle]} numberOfLines={1}>
                {label}
              </Animated.Text>
              <Animated.View style={[styles.iconCircleActive, iconWrapperStyle]}>
                <Ionicons name={icon as any} size={14} color={AppColors.primary} />
              </Animated.View>
            </>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: Spacing.borderRadius.full,
    paddingVertical: Spacing[3],
    minHeight: 44,
    justifyContent: 'center',
  },
  labelActive: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: AppColors.textOnPrimary,
  },
  iconCircleActive: {
    height: 26,
    borderRadius: 13,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});