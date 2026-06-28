// components/doctors/TrustBadge.tsx
// القسم الجديد — شارة الثقة أسفل معلومات الطبيب

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrustBadge() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconWrap}>
          <Ionicons name="star" size={14} color="#F4B740" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.value}>4.9</Text>
          <Text style={styles.label}>من 12k+ تقييم</Text>
        </View>
      </View>

      <View style={styles.sep} />

      <View style={styles.item}>
        <View style={[styles.iconWrap, styles.iconGreen]}>
          <Ionicons name="checkmark-circle" size={14} color="#5ED6CF" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.value}>متاح</Text>
          <Text style={styles.label}>اليوم</Text>
        </View>
      </View>

      <View style={styles.sep} />

      <View style={styles.item}>
        <View style={[styles.iconWrap, styles.iconBlue]}>
          <Ionicons name="time-outline" size={14} color="#5ED6CF" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.value}>~10 دق</Text>
          <Text style={styles.label}>وقت الانتظار</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E6F6F5',
    shadowColor: '#5ED6CF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF9EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreen: {
    backgroundColor: '#EDFAF9',
  },
  iconBlue: {
    backgroundColor: '#EDFAF9',
  },
  textWrap: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  label: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  sep: {
    width: 1,
    height: 32,
    backgroundColor: '#E6F6F5',
  },
});