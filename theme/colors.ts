// theme/colors.ts
// مصدر الحقيقة الوحيد لكل الألوان في تطبيق Dawini

export const Colors = {
  // ── اللون الأساسي ─────────────────────────────
  primary: {
    50:  '#E8F8F1',
    100: '#C5EDD9',
    200: '#9EDFC0',
    300: '#6DD1A4',
    400: '#45C68E',
    500: '#2BB673', // اللون الرئيسي
    600: '#22A063',
    700: '#178751',
    800: '#0D6D3F',
    900: '#05542F',
  },

  // ── الألوان المحايدة ───────────────────────────
  neutral: {
    0:   '#FFFFFF',
    50:  '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
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
  backgroundAlt: Colors.neutral[100],
  surface: Colors.white,
  surfaceSecondary: Colors.neutral[50],

  // الألوان الأساسية
  primary: Colors.primary[500],
  primaryLight: Colors.primary[100],
  primaryDark: Colors.primary[700],

  // النصوص
  textPrimary: Colors.neutral[900],
  textSecondary: Colors.neutral[600],
  textMuted: Colors.neutral[500],
  textInverse: Colors.white,
  textOnPrimary: Colors.white,

  // الحدود
  border: Colors.neutral[200],
  borderStrong: Colors.neutral[300],

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
    inactive: Colors.neutral[400],
    border: Colors.neutral[200],
  },
} as const;

export type AppColorsType = typeof AppColors;