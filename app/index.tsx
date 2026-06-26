// app/index.tsx
// شاشة البداية السينمائية لتطبيق Dawini

import { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppColors, Spacing, Typography } from '../theme';

const { width: W, height: H } = Dimensions.get('window');

// ── تعريف الأيقونات الطبية ────────────────────────────
const ICONS: Array<{
  emoji: string;
  label: string;
  fromX: number;
  fromY: number;
  delay: number;
}> = [
  { emoji: '❤️',  label: 'قلب',       fromX: -W * 0.5,    fromY: -H * 0.1,  delay: 100  },
  { emoji: '➕',  label: 'صليب طبي',  fromX: 0,           fromY: -H * 0.55, delay: 200  },
  { emoji: '🏥',  label: 'مستشفى',    fromX:  W * 0.5,    fromY: -H * 0.1,  delay: 150  },
  { emoji: '💊',  label: 'دواء',       fromX:  0,          fromY:  H * 0.55, delay: 250  },
  { emoji: '🩺',  label: 'سماعة',     fromX: -W * 0.5,    fromY: -H * 0.4,  delay: 300  },
  { emoji: '📅',  label: 'تقويم',      fromX:  W * 0.5,    fromY: -H * 0.4,  delay: 180  },
  { emoji: '🛡️', label: 'حماية',      fromX: -W * 0.5,    fromY:  H * 0.4,  delay: 350  },
  { emoji: '👨‍⚕️', label: 'طبيب',    fromX:  W * 0.5,    fromY:  H * 0.4,  delay: 220  },
];

// ── مكوّن الأيقونة ──────────────────────────────────────
function MedicalIcon({
  emoji,
  fromX,
  fromY,
  delay,
}: {
  emoji: string;
  fromX: number;
  fromY: number;
  delay: number;
}) {
  const translateX = useSharedValue(fromX);
  const translateY = useSharedValue(fromY);
  const opacity    = useSharedValue(0);
  const scale      = useSharedValue(0.3);
  const rotate     = useSharedValue(fromX < 0 ? -30 : 30);

  // المرحلة 2: الدخول
  useEffect(() => {
    const easing = Easing.out(Easing.cubic);

    opacity.value    = withDelay(delay, withTiming(1, { duration: 600, easing }));
    scale.value      = withDelay(delay, withSpring(1, { damping: 12, stiffness: 120 }));
    translateX.value = withDelay(delay, withSpring(0, { damping: 14, stiffness: 100 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 14, stiffness: 100 }));
    rotate.value     = withDelay(delay, withTiming(0, { duration: 700, easing }));
  }, []);

  // المرحلة 3: الدمج نحو المركز
  useEffect(() => {
    const mergeDelay = 2400;
    const easing = Easing.in(Easing.cubic);

    opacity.value    = withDelay(mergeDelay, withTiming(0, { duration: 500, easing }));
    scale.value      = withDelay(mergeDelay, withTiming(0, { duration: 500 }));
    translateX.value = withDelay(mergeDelay, withTiming(0, { duration: 500, easing }));
    translateY.value = withDelay(mergeDelay, withTiming(0, { duration: 500, easing }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.iconWrapper, animStyle]}>
      <Text style={styles.iconEmoji}>{emoji}</Text>
    </Animated.View>
  );
}

// ── المكوّن الرئيسي ─────────────────────────────────────
export default function SplashScreen() {
  // ── حالات الأنيميشن للشعار ──────────────────────
  const logoScale    = useSharedValue(0);
  const logoOpacity  = useSharedValue(0);
  const circleScale  = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleY       = useSharedValue(20);
  const subOpacity   = useSharedValue(0);

  const navigateToWelcome = () => {
    router.replace('/(auth)/welcome');
  };

  useEffect(() => {
    // المرحلة 4: ظهور الشعار بعد اندماج الأيقونات
    const LOGO_START = 3100;

    // الدائرة الخضراء تتمدد
    circleScale.value = withDelay(
      LOGO_START,
      withSpring(1, { damping: 10, stiffness: 80 })
    );

    // الشعار كله يظهر
    logoOpacity.value = withDelay(
      LOGO_START,
      withTiming(1, { duration: 400 })
    );
    logoScale.value = withDelay(
      LOGO_START,
      withSpring(1, { damping: 12, stiffness: 100 })
    );

    // اسم التطبيق يصعد
    titleOpacity.value = withDelay(
      LOGO_START + 300,
      withTiming(1, { duration: 500 })
    );
    titleY.value = withDelay(
      LOGO_START + 300,
      withSpring(0, { damping: 14, stiffness: 120 })
    );

    // الجملة الفرعية
    subOpacity.value = withDelay(
      LOGO_START + 600,
      withTiming(1, { duration: 500 })
    );

    // الانتقال للشاشة التالية
    const timer = setTimeout(navigateToWelcome, 5200);
    return () => clearTimeout(timer);
  }, []);

  const logoContainerStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const subStyle = useAnimatedStyle(() => ({
    opacity: subOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* ── طبقة الأيقونات الطبية ── */}
      <View style={styles.iconsLayer} pointerEvents="none">
        {ICONS.map((icon) => (
          <MedicalIcon
            key={icon.label}
            emoji={icon.emoji}
            fromX={icon.fromX}
            fromY={icon.fromY}
            delay={icon.delay}
          />
        ))}
      </View>

      {/* ── الشعار ── */}
      <Animated.View style={[styles.logoContainer, logoContainerStyle]}>
        {/* الدائرة الخضراء */}
        <Animated.View style={[styles.logoCircle, circleStyle]}>
          <Text style={styles.logoEmoji}>🏥</Text>
        </Animated.View>

        {/* الاسم */}
        <Animated.Text style={[styles.logoTitle, titleStyle]}>
          Dawini
        </Animated.Text>

        {/* الجملة الفرعية */}
        <Animated.Text style={[styles.logoSubtitle, subStyle]}>
          صحتك أولويتنا
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

// ── الأنماط ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // طبقة الأيقونات
  iconsLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 46,
  },

  // الشعار
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[3],
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  logoEmoji: {
    fontSize: 56,
  },
  logoTitle: {
    fontSize: 46,
    fontWeight: '800',
    color: AppColors.textPrimary,
    letterSpacing: -1.5,
    marginTop: Spacing[2],
  },
  logoSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: AppColors.textMuted,
    letterSpacing: 0.5,
  },
});