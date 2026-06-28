// data/mockDoctor.ts

import { Doctor, TimeSlot } from '@/types/doctor';

export const MOCK_DOCTOR: Doctor = {
  id: '1',
  name: 'د. أميرة بن سالم',
  specialty: 'طب القلب والأوعية الدموية',
  city: 'الجزائر العاصمة',
  rating: 4.9,
  reviewsCount: 12400,
  patientsCount: '30k+',
  experienceYears: 10,
  pricePerSession: 3500,
  imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face',
  isFavorite: false,
};

export const TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00', available: true },
  { id: '2', time: '09:30', available: true },
  { id: '3', time: '10:15', available: true },
  { id: '4', time: '11:00', available: true },
  { id: '5', time: '13:00', available: false },
  { id: '6', time: '14:15', available: true },
  { id: '7', time: '14:30', available: true },
  { id: '8', time: '16:30', available: true },
  { id: '9', time: '17:30', available: true },
];

export const generateDays = () => {
  const days = [];
  const dayNames = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d.getDate(),
      dayName: dayNames[d.getDay()],
      fullDate: d,
    });
  }
  return days;
};