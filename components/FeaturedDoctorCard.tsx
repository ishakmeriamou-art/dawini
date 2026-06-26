// components/FeaturedDoctorCard.tsx
// بطاقة "طبيب مميز" بتصميم كبير: اسم بارز + تقييم + صورة بعرض كامل بالأسفل

import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
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
};

export default function FeaturedDoctorCard({
  name,
  specialty,
  rating,
  reviewsCount,
  image,
  initiallyFavorite = false,
  onPress,
}: FeaturedDoctorCardProps) {
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const toggleFavorite = () => {
    heartScale.value = withSpring(1.25, { damping: 6, stiffness: 300 }, () => {
      heartScale.value = withSpring(1, { damping: 10, stiffness: 200 });
    });
    setIsFavorite((prev) => !prev);
  };

  return (
    <Animated.View style={[styles.card, cardAnimStyle]}>
      <Pressable
        onPressIn={() => {
          scale.value = withTiming(0.98, { duration: 100 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 14, stiffness: 200 });
        }}
        onPress={onPress}
      >
        <View style={styles.topSection}>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.specialty}>{specialty}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color="#F0AC3D" />
              <Text style={styles.ratingValue}>{rating}</Text>
              <Text style={styles.reviewsCount}>({reviewsCount} تقييم)</Text>
            </View>
          </View>

          <Pressable onPress={toggleFavorite} style={styles.favoriteButton} hitSlop={8}>
            <Animated.View style={heartAnimStyle}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={16}
                color={AppColors.primary}
              />
            </Animated.View>
          </Pressable>
        </View>

        <Image source={{ uri: image }} style={styles.doctorImage} resizeMode="cover" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.primarySoft,
    borderRadius: Spacing.borderRadius['2xl'],
    overflow: 'hidden',
    marginBottom: Spacing[6],
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 5,
  },
  topSection: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[5],
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: AppColors.textPrimary,
    textAlign: 'right',
    lineHeight: Typography.size.xl * 1.25,
  },
  specialty: {
    fontSize: Typography.size.sm,
    color: AppColors.textMuted,
    textAlign: 'right',
    marginTop: Spacing[1],
  },
  ratingRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing[3],
  },
  ratingValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: AppColors.textPrimary,
  },
  reviewsCount: {
    fontSize: Typography.size.xs,
    color: AppColors.textMuted,
  },
  favoriteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorImage: {
    width: '100%',
    height: 160,
    marginTop: Spacing[4],
  },
});