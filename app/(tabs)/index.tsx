// app/(tabs)/index.tsx
// ✅ النسخة النهائية — هيدر تركوازي متدرج مثل المرجع تماماً

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import { AppColors, Colors, Spacing, Typography } from '../../theme';
import FeaturedDoctorCard from '../../components/FeaturedDoctorCard';
import SpecialtyPill from '../../components/SpecialtyPill';

const HEADER_TOP    = Colors.primary[400];
const HEADER_BOTTOM = Colors.primary[600];

const SPECIALTIES = [
  { id: '1', label: 'الأسنان',  icon: 'happy-outline'    },
  { id: '2', label: 'الأعصاب', icon: 'pulse-outline'     },
  { id: '3', label: 'الأطفال', icon: 'body-outline'      },
  { id: '4', label: 'القلب',   icon: 'heart-outline'     },
  { id: '5', label: 'العيون',  icon: 'eye-outline'       },
] as const;

const UPCOMING_APPOINTMENT = {
  doctorName: 'د. أمينة حداد',
  specialty:  'طبيبة أعصاب',
  date:       'الأحد 7 نوفمبر',
  time:       '15:00',
  image:      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=140&h=140&fit=crop&crop=faces',
};

const FEATURED_DOCTOR = {
  name:         'د. شارلوت آدامز',
  specialty:    'طبيبة أعصاب',
  rating:       '4.9',
  reviewsCount: 320,
  image:        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=400&fit=crop&crop=faces',
};

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return 'صباح الخير';
  if (h >= 12 && h < 17) return 'مساء النور';
  if (h >= 17 && h < 21) return 'مساء الخير';
  return 'مرحباً';
}

function FadeInUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: any }) {
  const opacity    = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value    = withDelay(delay, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 18, stiffness: 140 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, animStyle]}>{children}</Animated.View>;
}

function PressableScale({ children, style, onPress }: { children: React.ReactNode; style?: any; onPress?: () => void }) {
  const scale     = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[style, animStyle]}>
      <Pressable
        onPressIn={() => { scale.value = withTiming(0.975, { duration: 90 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 15, stiffness: 210 }); }}
        onPress={onPress}
        style={{ width: '100%' }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [activeSpecialtyId, setActiveSpecialtyId] = useState('2');

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_TOP} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ══ HEADER — خلفية تركوازية متدرجة ══ */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerBgTop} />
          <View style={styles.headerBgBottom} />

          <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
            <FadeInUp delay={40} style={styles.headerRow}>
              <View style={styles.headerRight}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=90&h=90&fit=crop&crop=faces' }}
                  style={styles.avatar}
                />
                <View style={styles.headerTextBlock}>
                  <Text style={styles.greetingText}>{getGreeting()}</Text>
                  <Text style={styles.userName}>مريم بلخير</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={11} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.locationText}>الوادي، الجزائر</Text>
                  </View>
                </View>
              </View>

              <Pressable style={styles.notificationButton} hitSlop={8}>
                <Ionicons name="notifications-outline" size={20} color={AppColors.primary} />
                <View style={styles.notificationDot} />
              </Pressable>
            </FadeInUp>

            <FadeInUp delay={80}>
              <Text style={styles.sectionLabelOnHeader}>المواعيد القادمة</Text>
            </FadeInUp>
          </SafeAreaView>
        </View>

        {/* ══ بطاقة الموعد — تطفو فوق الهيدر ══ */}
        <FadeInUp delay={120} style={styles.appointmentCardWrapper}>
          <PressableScale style={styles.appointmentCard}>

            <View style={styles.appointmentTopRow}>
              <View style={styles.appointmentDoctorInfo}>
                <Image source={{ uri: UPCOMING_APPOINTMENT.image }} style={styles.appointmentDoctorImage} />
                <View>
                  <Text style={styles.appointmentDoctorName}>{UPCOMING_APPOINTMENT.doctorName}</Text>
                  <Text style={styles.appointmentDoctorSpecialty}>{UPCOMING_APPOINTMENT.specialty}</Text>
                </View>
              </View>
              <Pressable hitSlop={8}>
                <Text style={styles.viewDetailsLink}>عرض التفاصيل</Text>
              </Pressable>
            </View>

            <View style={styles.divider} />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} color={AppColors.primary} />
                <Text style={styles.metaText}>{UPCOMING_APPOINTMENT.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={AppColors.primary} />
                <Text style={styles.metaText}>{UPCOMING_APPOINTMENT.time}</Text>
              </View>
            </View>

            <View style={styles.appointmentActions}>
              <Pressable style={styles.rescheduleButton}>
                <Text style={styles.rescheduleButtonText}>إعادة جدولة</Text>
              </Pressable>
              <Pressable style={styles.joinButton}>
                <Ionicons name="videocam-outline" size={15} color="#fff" />
                <Text style={styles.joinButtonText}>انضم الآن</Text>
              </Pressable>
            </View>

          </PressableScale>
        </FadeInUp>

        {/* ══ باقي المحتوى ══ */}
        <View style={styles.bodyContent}>

          <FadeInUp delay={180} style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>تخصص الطبيب</Text>
            <Pressable hitSlop={8}><Text style={styles.sectionLink}>عرض الكل</Text></Pressable>
          </FadeInUp>

          <FadeInUp delay={210}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.specialtiesRow}>
              {SPECIALTIES.map((item, index) => (
                <SpecialtyPill
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  isActive={activeSpecialtyId === item.id}
                  entryDelay={230 + index * 55}
                  onPress={() => setActiveSpecialtyId(item.id)}
                />
              ))}
            </ScrollView>
          </FadeInUp>

          <FadeInUp delay={270} style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>طبيب مميز</Text>
            <Pressable hitSlop={8}><Text style={styles.sectionLink}>عرض الكل</Text></Pressable>
          </FadeInUp>

          <FadeInUp delay={310}>
            <FeaturedDoctorCard
              name={FEATURED_DOCTOR.name}
              specialty={FEATURED_DOCTOR.specialty}
              rating={FEATURED_DOCTOR.rating}
              reviewsCount={FEATURED_DOCTOR.reviewsCount}
              image={FEATURED_DOCTOR.image}
              initiallyFavorite
              onBookPress={() => {}}
            />
          </FadeInUp>

        </View>
      </ScrollView>
    </View>
  );
}

const HEADER_HEIGHT  = 200;
const CARD_OVERLAP   = 32;
const HORIZONTAL_PAD = Spacing.layout.horizontalPadding;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.surface,
  },
  scrollContent: {
    paddingBottom: Spacing.layout.tabBarHeight + Spacing[12],
  },

  // ── Header ──────────────────────────────────────────────
  headerWrapper: {
    height: HEADER_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBgTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: HEADER_TOP,
  },
  headerBgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT * 0.55,
    backgroundColor: HEADER_BOTTOM,
    opacity: 0.5,
    borderTopLeftRadius: HEADER_HEIGHT,
    borderTopRightRadius: HEADER_HEIGHT,
  },
  headerSafeArea: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PAD,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing[2],
    marginBottom: Spacing[4],
  },
  headerRight: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing[3],
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  headerTextBlock: {
    alignItems: 'flex-end',
  },
  greetingText: {
    fontSize: Typography.size.xs,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: Typography.weight.regular,
    marginBottom: 1,
  },
  userName: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
    textAlign: 'right',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontSize: Typography.size.xs,
    color: 'rgba(255,255,255,0.8)',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    left: 9,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E8866B',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  sectionLabelOnHeader: {
    textAlign: 'center',
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: Typography.weight.medium,
  },

  // ══ بطاقة الموعد ════════════════════════════════════════
  appointmentCardWrapper: {
    marginTop: -CARD_OVERLAP,
    marginHorizontal: HORIZONTAL_PAD,
    marginBottom: Spacing[5],
  },
  appointmentCard: {
    backgroundColor: AppColors.surface,
    borderRadius: Spacing.borderRadius['2xl'],
    padding: Spacing[4],
    shadowColor: '#1A2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  appointmentTopRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[3],
  },
  appointmentDoctorInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing[2],
  },
  appointmentDoctorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: AppColors.primaryLight,
  },
  appointmentDoctorName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: AppColors.textPrimary,
    textAlign: 'right',
  },
  appointmentDoctorSpecialty: {
    fontSize: Typography.size.xs,
    color: AppColors.textMuted,
    textAlign: 'right',
    marginTop: 1,
  },
  viewDetailsLink: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
    color: AppColors.primary,
  },
  divider: {
    height: 0.5,
    backgroundColor: AppColors.borderTinted,
    marginBottom: Spacing[3],
  },
  metaRow: {
    flexDirection: 'row-reverse',
    gap: Spacing[5],
    marginBottom: Spacing[4],
  },
  metaItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing[1],
  },
  metaText: {
    fontSize: Typography.size.sm,
    color: AppColors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  appointmentActions: {
    flexDirection: 'row-reverse',
    gap: Spacing[2],
  },
  rescheduleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: Spacing.borderRadius.lg,
    paddingVertical: Spacing[3],
    borderWidth: 1,
    borderColor: AppColors.borderTinted,
  },
  rescheduleButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: AppColors.textSecondary,
  },
  joinButton: {
    flex: 1.4,
    flexDirection: 'row-reverse',
    backgroundColor: AppColors.primary,
    borderRadius: Spacing.borderRadius.lg,
    paddingVertical: Spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  joinButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: '#FFFFFF',
  },

  // ══ محتوى الجسم ═════════════════════════════════════════
  bodyContent: {
    paddingHorizontal: HORIZONTAL_PAD,
  },
  sectionHeaderRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[4],
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: AppColors.textPrimary,
  },
  sectionLink: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: AppColors.primary,
  },
  specialtiesRow: {
    flexDirection: 'row-reverse',
    gap: Spacing[2],
    paddingBottom: Spacing[2],
    marginBottom: Spacing[5],
    paddingHorizontal: Spacing[1],
  },
});