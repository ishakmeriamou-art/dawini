// components/doctors/StatsCard.tsx
// بطاقة واحدة بخلفية تركوازية فاتحة — مطابقة للصورة المرجعية

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Doctor } from '@/types/doctor';

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function StatsCard({ doctor }: { doctor: Doctor }) {
  return (
    <View style={styles.container}>
      <StatItem value={`${doctor.experienceYears}y+`} label="خبرة" />
      <StatItem value={doctor.patientsCount} label="مريض" />
      <StatItem value={`${(doctor.reviewsCount / 1000).toFixed(0)}k+`} label="تقييم" />
      <StatItem value={`${doctor.rating}`} label="نجوم" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#DFFAF8',   // تركوازي فاتح جداً — مطابق للصورة
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#5ED6CF',
    fontWeight: '500',
  },
});