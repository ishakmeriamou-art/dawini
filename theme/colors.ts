// theme/colors.ts
// مصدر الحقيقة الوحيد لكل الألوان في تطبيق Dawini

export const Colors = {
  // ── اللون الأساسي (تركوازي فاتح / Light Turquoise) ──
  primary: {
    50:  '#F0FBFA', // خلفية تركوازية شفافة جدًا
    100: '#DCF5F1', // خلفية البطاقات والأيقونات
    200: '#BCEAE3', // حدود ناعمة جدًا
    300: '#8EDCCF', // عناصر ثانوية فاتحة
    400: '#5BC9B8', // hover / لمسات
    500: '#2FB8A8', // اللون الرئيسي - تركوازي فاتح هادئ
    600: '#229E91', // نص على خلفية فاتحة / أزرار مضغوطة
    700: '#187F76', // نص مؤكد، أيقونات داكنة قليلاً
    800: '#106059',
    900: '#0A433E',
  },

  // ── الألوان المحايدة ───────────────────────────
  neutral: {
    0:   '#FFFFFF',
    50:  '#F8FAFA',
    100: '#F1F5F4',
    200: '#E9EFEE',
    300: '#DEE7E5',
    400: '#CED9D7',
    500: '#ADBDBA',
    600: '#869896',
    700: '#495958',
    800: '#34403F',
    900: '#1A2E2B',
  },

  // ── الأزرق الناعم (accent) ─────────────────────
  blue: {
    50:  '#EBF4FF',
    100: '#C3DFFE',
    200: '#90C2FD',
    300: '#5AA5FB',
    400: '#3490F8',
    500: '#1A7CF5',
    600: '#1468D4',
    700: '#0F53AD',
    800: '#0A3F87',
    900: '#062D62',
  },

  // ── الأحمر (للأخطاء) ──────────────────────────
  red: {
    50:  '#FFF0F0',
    100: '#FFD6D6',
    200: '#FFAAAA',
    300: '#FF7777',
    400: '#FF4D4D',
    500: '#E53E3E',
    600: '#C53030',
    700: '#9B2C2C',
    800: '#742A2A',
    900: '#4D1A1A',
  },

  // ── البرتقالي (للتحذيرات) ─────────────────────
  amber: {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // ── الشفاف ────────────────────────────────────
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

// ── الثيم المستخدم في التطبيق ────────────────────
export const AppColors = {
  // الخلفيات
  background: Colors.neutral[50],
  backgroundAlt: Colors.primary[50], // لمسة تركوازية هادئة جدًا
  surface: Colors.white,
  surfaceSecondary: Colors.neutral[50],
  surfaceTinted: Colors.primary[50], // خلفية البطاقات ذات اللمسة التركوازية

  // الألوان الأساسية
  primary: Colors.primary[500],
  primaryLight: Colors.primary[100],
  primaryDark: Colors.primary[700],
  primarySoft: Colors.primary[50],

  // النصوص
  textPrimary: Colors.neutral[900],
  textSecondary: Colors.neutral[600],
  textMuted: Colors.neutral[500],
  textInverse: Colors.white,
  textOnPrimary: Colors.white,
  textOnPrimarySoft: Colors.primary[700], // نص على خلفية primary[50]/[100]

  // الحدود
  border: Colors.neutral[200],
  borderStrong: Colors.neutral[300],
  borderTinted: Colors.primary[200],

  // الحالات
  success: Colors.primary[500],
  successLight: Colors.primary[50],
  error: Colors.red[500],
  errorLight: Colors.red[50],
  warning: Colors.amber[500],
  warningLight: Colors.amber[50],
  info: Colors.blue[500],
  infoLight: Colors.blue[50],

  // الأيقونات
  iconPrimary: Colors.neutral[700],
  iconSecondary: Colors.neutral[500],
  iconMuted: Colors.neutral[400],
  iconAccent: Colors.primary[500],

  // الـ Splash
  splash: {
    background: Colors.white,
    icon: Colors.primary[500],
    iconSecondary: Colors.primary[300],
    logoCircle: Colors.primary[500],
    logoText: Colors.white,
    subtitle: Colors.neutral[400],
  },

  // التنقل السفلي
  tabBar: {
    background: Colors.white,
    active: Colors.primary[500],
    activeBg: Colors.primary[50],
    inactive: Colors.neutral[400],
    border: Colors.neutral[200],
  },
} as const;

export type AppColorsType = typeof AppColors;