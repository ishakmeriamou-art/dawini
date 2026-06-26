// theme/typography.ts

import { Platform } from 'react-native';

// نستخدم الخطوط الافتراضية الأنيقة لكل منصة
const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
};

export const Typography = {
  // ── أحجام الخط ───────────────────────────────
  size: {
    xs:   11,
    sm:   13,
    base: 15,
    md:   17,
    lg:   20,
    xl:   24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 38,
    '5xl': 46,
  },

  // ── وزن الخط ──────────────────────────────────
  weight: {
    regular:   '400' as const,
    medium:    '500' as const,
    semibold:  '600' as const,
    bold:      '700' as const,
    extrabold: '800' as const,
  },

  // ── ارتفاع السطر ──────────────────────────────
  lineHeight: {
    tight:   1.2,
    snug:    1.35,
    normal:  1.5,
    relaxed: 1.65,
    loose:   2.0,
  },

  // ── عائلة الخط ───────────────────────────────
  family: fontFamily,

  // ── الأنماط الجاهزة ───────────────────────────
  styles: {
    // العناوين
    display: {
      fontSize: 46,
      fontWeight: '800' as const,
      lineHeight: 52,
      letterSpacing: -1.2,
    },
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 38,
      letterSpacing: -0.8,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700' as const,
      lineHeight: 34,
      letterSpacing: -0.6,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 30,
      letterSpacing: -0.4,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 26,
      letterSpacing: -0.2,
    },
    // النصوص
    bodyLarge: {
      fontSize: 17,
      fontWeight: '400' as const,
      lineHeight: 26,
      letterSpacing: 0,
    },
    body: {
      fontSize: 15,
      fontWeight: '400' as const,
      lineHeight: 23,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    // التسميات
    label: {
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 18,
      letterSpacing: 0.1,
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.3,
    },
    caption: {
      fontSize: 11,
      fontWeight: '400' as const,
      lineHeight: 15,
      letterSpacing: 0.2,
    },
    // الأزرار
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
      letterSpacing: 0.1,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 19,
      letterSpacing: 0.1,
    },
  },
} as const;