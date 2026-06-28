// types/doctor.ts

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  rating: number;
  reviewsCount: number;
  patientsCount: string;
  experienceYears: number;
  pricePerSession: number;
  imageUrl: string;
  isFavorite?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DayItem {
  date: number;
  dayName: string;
  fullDate: Date;
}