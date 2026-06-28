// components/doctors/DoctorInfo.tsx
// Layout مطابق للصورة المرجعية: اسم يسار + صورة يمين بدون frame

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Doctor } from '@/types/doctor';

interface DoctorInfoProps {
  doctor: Doctor;
}

const { width } = Dimensions.get('window');

export default function DoctorInfo({ doctor }: DoctorInfoProps) {
  const [isFav, setIsFav] = useState(doctor.isFavorite ?? false);
  const heartScale = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const toggleFav = () => {
    heartScale.value = withSpring(1.4, { damping: 5 }, () => {
      heartScale.value = withSpring(1, { damping: 8 });
    });
    setIsFav((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* صف العلوي: معلومات يسار + صورة يمين (بدون frame) */}
      <View style={styles.heroRow}>
        {/* معلومات يسار */}
        <View style={styles.textBlock}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <Text style={styles.price}>
            <Text style={styles.priceAmount}>
              {doctor.pricePerSession.toLocaleString('ar-DZ')} دج
            </Text>
            <Text style={styles.priceLabel}> / جلسة</Text>
          </Text>
        </View>

        {/* صورة يمين — تطفو بدون border */}
        <Image
          source={{ uri: doctor.imageUrl }}
          style={styles.doctorImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#5ED6CF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    overflow: 'visible',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingTop: 28,
    paddingBottom: 0,
    overflow: 'visible',
  },
  textBlock: {
    flex: 1,
    paddingBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 32,
  },
  specialty: {
    fontSize: 13,
    color: '#7C8A96',
    fontWeight: '400',
    marginBottom: 14,
  },
  price: {
    fontSize: 14,
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5ED6CF',
  },
  priceLabel: {
    fontSize: 13,
    color: '#7C8A96',
    fontWeight: '400',
  },
  doctorImage: {
    width: width * 0.42,
    height: 200,
    borderTopRightRadius: 24,
    // لا border radius أسفل — تطفو من الأسفل مثل الصورة المرجعية
  },
});