// app/(tabs)/index.tsx
// الصفحة الرئيسية لتطبيق داويني - تصميم Premium Medical / Soft UI
// البنية مستلهمة من مرجع تصميمي، بألوان داويني التركوازية الفاتحة

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import { AppColors, Spacing, Typography } from '../../theme';
import FeaturedDoctorCard from '../../components/FeaturedDoctorCard';
import SpecialtyPill from '../../components/SpecialtyPill';

// ──────────────────────────────────────────────────────────
// بيانات تجريبية (Mock Data) — تستبدل لاحقًا بالبيانات الحقيقية من الـ API
// ──────────────────────────────────────────────────────────

const SPECIALTIES = [
  { id: '1', label: 'الأسنان', icon: 'happy-outline' },
  { id: '2', label: 'الأعصاب', icon: 'pulse-outline' },
  { id: '3', label: 'الأطفال', icon: 'body-outline' },
  { id: '4', label: 'القلب', icon: 'heart-outline' },
  { id: '5', label: 'العيون', icon: 'eye-outline' },
] as const;

const UPCOMING_APPOINTMENT = {
  doctorName: 'د. أمينة حداد',
  specialty: 'طبيبة أعصاب',
  date: 'الأحد 7 نوفمبر',
  time: '15:00',
  image:
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=140&h=140&fit=crop&crop=faces',
};

const FEATURED_DOCTOR = {
  name: 'د. شارلوت آدامز',
  specialty: 'طبيبة أعصاب',
  rating: '4.9',
  reviewsCount: 320,
  image:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=400&fit=crop&crop=faces',
};

// ──────────────────────────────────────────────────────────
// مكوّن: عنصر يظهر تدريجيًا من الأسفل (Fade + Slide Up)
// ──────────────────────────────────────────────────────────

function FadeInUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 16, stiffness: 130 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, animStyle]}>{children}</Animated.View>;
}

// ──────────────────────────────────────────────────────────
// مكوّن: عنصر قابل للضغط مع تأثير Scale
// ──────────────────────────────────────────────────────────

function PressableScale({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animStyle]}>
      <Pressable
        onPressIn={() => {
          scale.value = withTiming(0.97, { duration: 100 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 14, stiffness: 200 });
        }}
        onPress={onPress}
        style={{ width: '100%' }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

// ──────────────────────────────────────────────────────────
// المكوّن الرئيسي
// ──────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [activeSpecialtyId, setActiveSpecialtyId] = useState('2');

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ──────────────────────────────── */}
        <FadeInUp delay={50} style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=90&h=90&fit=crop&crop=faces',
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>مريم بلخير</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color={AppColors.textMuted} />
                <Text style={styles.locationText}>الوادي، الجزائر</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={18} color={AppColors.primary} />
            <View style={styles.notificationDot} />
          </Pressable>
        </FadeInUp>

        {/* ── عنوان قسم المواعيد ──────────────────── */}
        <FadeInUp delay={90}>
          <Text style={styles.sectionLabelCenter}>المواعيد القادمة</Text>
        </FadeInUp>

        {/* ── بطاقة الموعد القادم ──────────────────── */}
        <FadeInUp delay={130}>
          <PressableScale style={styles.appointmentCard}>
            <View style={styles.appointmentTopRow}>
              <View style={styles.appointmentDoctorInfo}>
                <Image source={{ uri: UPCOMING_APPOINTMENT.image }} style={styles.appointmentDoctorImage} />
                <View>
                  <Text style={styles.appointmentDoctorName}>{UPCOMING_APPOINTMENT.doctorName}</Text>
                  <Text style={styles.appointmentDoctorSpecialty}>{UPCOMING_APPOINTMENT.specialty}</Text>
                </View>
              </View>
              <Text style={styles.viewDetailsLink}>عرض التفاصيل</Text>
            </View>

            <View style={styles.appointmentMetaRow}>
              <View style={styles.appointmentMetaItem}>
                <Ionicons name="calendar-outline" size={14} color={AppColors.primary} />
                <Text style={styles.appointmentMetaText}>{UPCOMING_APPOINTMENT.date}</Text>
              </View>
              <View style={styles.appointmentMetaItem}>
                <Ionicons name="time-outline" size={14} color={AppColors.primary} />
                <Text style={styles.appointmentMetaText}>{UPCOMING_APPOINTMENT.time}</Text>
              </View>
            </View>

            <View style={styles.appointmentActions}>
              <Pressable style={styles.rescheduleButton}>
                <Text style={styles.rescheduleButtonText}>إعادة جدولة</Text>
              </Pressable>
              <Pressable style={styles.joinButton}>
                <Ionicons name="videocam-outline" size={15} color={AppColors.textOnPrimary} />
                <Text style={styles.joinButtonText}>انضم الآن</Text>
              </Pressable>
            </View>
          </PressableScale>
        </FadeInUp>

        {/* ── قسم التخصصات ─────────────────────────── */}
        <FadeInUp delay={180} style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>تخصص الطبيب</Text>
          <Pressable>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </Pressable>
        </FadeInUp>

        <FadeInUp delay={210}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtiesRow}
          >
            {SPECIALTIES.map((item, index) => (
              <SpecialtyPill
                key={item.id}
                label={item.label}
                icon={item.icon}
                isActive={activeSpecialtyId === item.id}
                entryDelay={230 + index * 60}
                onPress={() => setActiveSpecialtyId(item.id)}
              />
            ))}
          </ScrollView>
        </FadeInUp>

        {/* ── طبيب مميز ─────────────────────────────── */}
        <FadeInUp delay={260} style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>طبيب مميز</Text>
          <Pressable>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </Pressable>
        </FadeInUp>

        <FadeInUp delay={300}>
          <FeaturedDoctorCard
            name={FEATURED_DOCTOR.name}
            specialty={FEATURED_DOCTOR.specialty}
            rating={FEATURED_DOCTOR.rating}
            reviewsCount={FEATURED_DOCTOR.reviewsCount}
            image={FEATURED_DOCTOR.image}
            initiallyFavorite
          />
        </FadeInUp>
      </ScrollView>
    </View>
  );
}

// ──────────────────────────────────────────────────────────
// الأنماط
// ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.surface,
  },
  scrollContent: {
    paddingHorizontal: Spacing.layout.horizontalPadding,
    paddingTop: Spacing[6],
    paddingBottom: Spacing.layout.tabBarHeight + Spacing[10],
  },

  // Header
  headerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[6],
  },
  headerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing[3],
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.medium,
    color: AppColors.textPrimary,
    textAlign: 'right',
    marginBottom: 3,
  },
  locationRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: Typography.size.xs,
    color: AppColors.textMuted,
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: AppColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    left: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E8866B',
  },

  // Section label (centered, small)
  sectionLabelCenter: {
    textAlign: 'center',
    fontSize: Typography.size.sm,
    color: AppColors.textMuted,
    marginBottom: Spacing[3],
  },

  // Appointment card
  appointmentCard: {
    backgroundColor: AppColors.primarySoft,
    borderRadius: Spacing.borderRadius['2xl'],
    padding: Spacing[4],
    marginBottom: Spacing[6],
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 4,
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
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  appointmentDoctorName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: AppColors.textPrimary,
    textAlign: 'right',
  },
  appointmentDoctorSpecialty: {
    fontSize: Typography.size.xs,
    color: AppColors.textMuted,
    textAlign: 'right',
  },
  viewDetailsLink: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
    color: AppColors.primary,
  },
  appointmentMetaRow: {
    flexDirection: 'row-reverse',
    gap: Spacing[4],
    paddingVertical: Spacing[3],
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: AppColors.borderTinted,
    marginBottom: Spacing[4],
  },
  appointmentMetaItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Spacing[1],
  },
  appointmentMetaText: {
    fontSize: Typography.size.sm,
    color: AppColors.textPrimary,
  },
  appointmentActions: {
    flexDirection: 'row-reverse',
    gap: Spacing[3],
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: AppColors.surface,
    borderRadius: Spacing.borderRadius.md,
    paddingVertical: Spacing[3],
    alignItems: 'center',
  },
  rescheduleButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: AppColors.textSecondary,
  },
  joinButton: {
    flex: 1.2,
    flexDirection: 'row-reverse',
    backgroundColor: AppColors.primary,
    borderRadius: Spacing.borderRadius.md,
    paddingVertical: Spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  joinButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: AppColors.textOnPrimary,
  },

  // Section header
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
    color: AppColors.primary,
  },

  // Specialty pills row container
  specialtiesRow: {
    flexDirection: 'row-reverse',
    gap: Spacing[2],
    paddingBottom: Spacing[2],
    marginBottom: Spacing[6],
  },
});