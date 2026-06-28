// components/FeaturedDoctorCard.tsx
// ✅ النسخة المحسّنة — FeaturedDoctorCard
//
// التحسينات:
// 1. Gradient Overlay فوق الصورة → لا قطع حاد في الأسفل
// 2. المعلومات (الاسم + التخصص + التقييم) مدمجة فوق الصورة مباشرةً
//    → تصميم "Hero Card" حديث بدلاً من نص فوق + صورة أسفل
// 3. زر المفضلة أكبر (40px) مع shadow خفيف
// 4. شارة التخصص (Badge) بلون primaryLight → تفاصيل احترافية
// 5. Skeleton placeholder أثناء تحميل الصورة
// 6. نجوم التقييم مرئية بشكل أوضح مع عدد المراجعين
// 7. زر "احجز الآن" صغير داخل البطاقة → CTA واضح

import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import { AppColors, Spacing, Typography } from '../theme';

type FeaturedDoctorCardProps = {
  name: string;
  specialty: string;
  rating: string;
  reviewsCount: number;
  image: string;
  initiallyFavorite?: boolean;
  onPress?: () => void;
  onBookPress?: () => void;
};

export default function FeaturedDoctorCard({
  name,
  specialty,
  rating,
  reviewsCount,
  image,
  initiallyFavorite = false,
  onPress,
  onBookPress,
}: FeaturedDoctorCardProps) {
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const toggleFavorite = () => {
    heartScale.value = withSpring(1.3, { damping: 5, stiffness: 320 }, () => {
      heartScale.value = withSpring(1, { damping: 12, stiffness: 200 });
    });
    setIsFavorite((prev) => !prev);
  };

  return (
    <Animated.View style={[styles.card, cardAnimStyle]}>
      <Pressable
        onPressIn={() => {
          scale.value = withTiming(0.985, { duration: 100 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 200 });
        }}
        onPress={onPress}
      >

        {/* ── الصورة كخلفية Hero ─────────────────── */}
        <View style={styles.imageContainer}>

          {/* Skeleton أثناء التحميل */}
          {imageLoading && !imageError && (
            <View style={styles.skeleton}>
              <ActivityIndicator color={AppColors.primary} size="small" />
            </View>
          )}

          {/* صورة fallback عند الخطأ */}
          {imageError && (
            <View style={styles.skeleton}>
              <Ionicons name="person" size={48} color={AppColors.primaryLight} />
            </View>
          )}

          {/* الصورة الفعلية */}
          {!imageError && (
            <Image
              source={{ uri: image }}
              style={styles.doctorImage}
              resizeMode="cover"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          )}

          {/* ✅ Gradient Overlay من أسفل — يمنع القطع الحاد ويجعل النص مقروءاً */}
          {/* React Native لا يدعم LinearGradient مباشرةً بدون expo-linear-gradient */}
          {/* نستخدم طبقتين شفافتين كبديل خفيف الوزن */}
          <View style={styles.gradientBottom} />
          <View style={styles.gradientMiddle} />

          {/* ── شارة التخصص (أعلى اليمين) ──────── */}
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialtyBadgeText}>{specialty}</Text>
          </View>

          {/* ── زر المفضلة (أعلى اليسار) ─────────── */}
          <Pressable
            onPress={toggleFavorite}
            style={styles.favoriteButton}
            hitSlop={10}
          >
            <Animated.View style={heartAnimStyle}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorite ? '#E53E3E' : AppColors.textSecondary}
              />
            </Animated.View>
          </Pressable>

          {/* ── معلومات الطبيب فوق الصورة (أسفل) ─── */}
          <View style={styles.infoOverlay}>

            {/* الاسم */}
            <Text style={styles.name} numberOfLines={1}>{name}</Text>

            {/* صف التقييم + زر الحجز */}
            <View style={styles.bottomRow}>

              {/* التقييم */}
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color="#F0AC3D" />
                <Text style={styles.ratingValue}>{rating}</Text>
                <Text style={styles.reviewsCount}>
                  ({reviewsCount} تقييم)
                </Text>
              </View>

              {/* زر احجز الآن */}
              <Pressable
                style={styles.bookButton}
                onPress={(e) => {
                  e.stopPropagation?.();
                  onBookPress?.();
                }}
                hitSlop={4}
              >
                <Text style={styles.bookButtonText}>احجز الآن</Text>
              </Pressable>

            </View>
          </View>

        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.borderRadius['2xl'], // 24px
    overflow: 'hidden',
    marginBottom: Spacing[5],
    // ظل أنيق موزّع
    shadowColor: '#1A2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
    backgroundColor: AppColors.primarySoft,
  },

  // ── حاوية الصورة ──────────────────────────────
  imageContainer: {
    width: '100%',
    height: 220,        // ✅ أطول من 160px → تناسب Hero Card
    position: 'relative',
  },

  doctorImage: {
    width: '100%',
    height: '100%',
  },

  skeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: AppColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Gradient Overlay (طبقتان بدون expo-linear-gradient) ──
  // الطبقة السفلية: داكنة تمامًا في الأسفل لإظهار النص
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(10, 67, 62, 0.72)', // primary[900] مع شفافية
    // gradient يدوي عبر borderRadius العلوي
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  // الطبقة الوسطى: أخف → تدرّج ناعم
  gradientMiddle: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(10, 67, 62, 0.25)',
  },

  // ── شارة التخصص ───────────────────────────────
  specialtyBadge: {
    position: 'absolute',
    top: Spacing[3],        // 12px
    right: Spacing[3],
    backgroundColor: AppColors.primaryLight,
    borderRadius: Spacing.borderRadius.full,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
  },

  specialtyBadgeText: {
    fontSize: Typography.size.xs,    // 11px
    fontWeight: Typography.weight.semibold,
    color: AppColors.primaryDark,
  },

  // ── زر المفضلة ────────────────────────────────
  favoriteButton: {
    position: 'absolute',
    top: Spacing[3],
    left: Spacing[3],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  // ── معلومات الطبيب (فوق الصورة أسفل) ─────────
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing[4],   // 16px
    paddingBottom: Spacing[4],
    paddingTop: Spacing[3],
  },

  name: {
    fontSize: Typography.size.lg,    // 20px
    fontWeight: Typography.weight.bold,
    color: AppColors.textInverse,    // أبيض على الـ overlay الداكن
    textAlign: 'right',
    marginBottom: Spacing[2],        // 8px
  },

  // ── صف التقييم + زر الحجز ──────────────────
  bottomRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ratingRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },

  ratingValue: {
    fontSize: Typography.size.sm,    // 13px
    fontWeight: Typography.weight.semibold,
    color: AppColors.textInverse,
  },

  reviewsCount: {
    fontSize: Typography.size.xs,    // 11px
    color: 'rgba(255,255,255,0.75)',
  },

  // ── زر "احجز الآن" ────────────────────────────
  bookButton: {
    backgroundColor: AppColors.surface,
    borderRadius: Spacing.borderRadius.full,
    paddingHorizontal: Spacing[4],   // 16px
    paddingVertical: Spacing[2],     // 8px
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  bookButtonText: {
    fontSize: Typography.size.xs,    // 11px
    fontWeight: Typography.weight.bold,
    color: AppColors.primary,
  },
});