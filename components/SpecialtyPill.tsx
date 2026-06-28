/// components/SpecialtyPill.tsx
// ✅ النسخة المحسّنة — SpecialtyPill
//
// التحسينات:
// 1. كل pill لها نفس الحجم دائماً (نص + أيقونة ظاهران في كلتا الحالتين)
//    → لا كسر في الـ Layout عند التبديل بين التخصصات
// 2. إصلاح iconColor الذي كان نفس اللون في الحالتين
// 3. أيقونة مفعّلة: دائرة بيضاء + أيقونة بلون primary (واضحة وأنيقة)
// 4. أيقونة غير مفعّلة: أيقونة بلون primary بدون دائرة
// 5. النص موجود دائماً — فقط لونه يتغير (أبيض ↔ primary)
// 6. حركة الدخول stagger محفوظة
// 7. حركة الضغط محفوظة
// 8. minWidth ثابت لمنع القفز

import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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

  // ── 1. حركة الدخول (Fade + Slide up) ───────────
  const entryOpacity = useSharedValue(0);
  const entryY = useSharedValue(10);

  useEffect(() => {
    entryOpacity.value = withDelay(
      entryDelay,
      withTiming(1, { duration: 350, easing: Easing.out(Easing.cubic) })
    );
    entryY.value = withDelay(
      entryDelay,
      withSpring(0, { damping: 16, stiffness: 150 })
    );
  }, []);

  // ── 2. progress: 0 = عادي، 1 = مفعّل ───────────
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 260,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [isActive]);

  // ── 3. حركة الضغط ────────────────────────────
  const pressScale = useSharedValue(1);

  // ── Animated Styles ───────────────────────────

  const entryStyle = useAnimatedStyle(() => ({
    opacity: entryOpacity.value,
    transform: [{ translateY: entryY.value }],
  }));

  // خلفية الـ pill تتغير بين حالتين
  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [AppColors.primarySoft, AppColors.primary]
    ),
    transform: [{ scale: pressScale.value }],
  }));

  // لون النص يتغير: primary → أبيض
  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [AppColors.primary, AppColors.textOnPrimary]
    ),
  }));

  // الدائرة البيضاء خلف الأيقونة: تظهر فقط عند التفعيل
  const iconBgStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.6 + progress.value * 0.4 }],
  }));

  // لون الأيقونة: primary (غير مفعّل) → primary داخل دائرة بيضاء (مفعّل)
  // نستخدم interpolateColor لتمرير اللون للأيقونة عبر JS value
  // لكن Ionicons لا يدعم Animated color مباشرةً،
  // لذا نستخدم حيلة: نُظهر نسختين من الأيقونة بـ opacity معاكس
  const iconActiveStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const iconInactiveStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  return (
    <Animated.View style={entryStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          pressScale.value = withTiming(0.93, { duration: 80 });
        }}
        onPressOut={() => {
          pressScale.value = withSpring(1, { damping: 14, stiffness: 230 });
        }}
        hitSlop={4}
      >
        <Animated.View style={[styles.pill, pillStyle]}>

          {/* ── الأيقونة ─────────────────────────── */}
          <Animated.View style={styles.iconWrapper}>
            {/* دائرة بيضاء (تظهر عند التفعيل) */}
            <Animated.View style={[styles.iconCircle, iconBgStyle]}>
              <Animated.View style={iconActiveStyle}>
                <Ionicons
                  name={icon as any}
                  size={14}
                  color={AppColors.primary}
                />
              </Animated.View>
            </Animated.View>

            {/* أيقونة بدون دائرة (تظهر عند عدم التفعيل) */}
            <Animated.View style={[styles.iconPlain, iconInactiveStyle]}>
              <Ionicons
                name={icon as any}
                size={16}
                color={AppColors.primary}
              />
            </Animated.View>
          </Animated.View>

          {/* ── النص ──────────────────────────────── */}
          <Animated.Text
            style={[styles.label, labelStyle]}
            numberOfLines={1}
          >
            {label}
          </Animated.Text>

        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row-reverse',   // RTL: النص يمين، الأيقونة يسار
    alignItems: 'center',
    borderRadius: Spacing.borderRadius.full,
    paddingVertical: Spacing[2],    // 8px
    paddingHorizontal: Spacing[4],  // 16px — ثابت دائماً لمنع القفز
    minHeight: 44,
    minWidth: 80,                   // ✅ يمنع تقلّص العنصر
    gap: Spacing[2],                // 8px بين النص والأيقونة
    justifyContent: 'center',
  },

  label: {
    fontSize: Typography.size.sm,   // 13px
    fontWeight: Typography.weight.semibold,
    // اللون يُدار بـ Animated لا هنا
  },

  // حاوية الأيقونتين (متراكبتان في نفس المكان)
  iconWrapper: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // الدائرة البيضاء للحالة المفعّلة
  iconCircle: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // الأيقونة المجردة للحالة غير المفعّلة
  iconPlain: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});