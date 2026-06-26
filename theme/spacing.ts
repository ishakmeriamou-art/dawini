// theme/spacing.ts

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Spacing = {
  // ── الوحدات الأساسية ─────────────────────────
  0:   0,
  1:   4,
  2:   8,
  3:   12,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  9:   36,
  10:  40,
  12:  48,
  14:  56,
  16:  64,
  20:  80,
  24:  96,
  32:  128,

  // ── الأحجام الدائرية ──────────────────────────
  borderRadius: {
    none:   0,
    xs:     4,
    sm:     8,
    md:     12,
    lg:     16,
    xl:     20,
    '2xl':  24,
    '3xl':  32,
    full:   9999,
  },

  // ── الشاشة ───────────────────────────────────
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  // ── الـ Layout الثابتة ────────────────────────
  layout: {
    horizontalPadding: 20,
    verticalPadding: 16,
    cardPadding: 16,
    sectionGap: 32,
    itemGap: 12,
    tabBarHeight: 80,
    headerHeight: 60,
  },

  // ── الأيقونات ─────────────────────────────────
  icon: {
    xs:  16,
    sm:  20,
    md:  24,
    lg:  28,
    xl:  32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64,
    '5xl': 80,
  },

  // ── الأزرار ───────────────────────────────────
  button: {
    heightSm: 40,
    height:   52,
    heightLg: 60,
  },

  // ── الـ Avatar ────────────────────────────────
  avatar: {
    xs:  28,
    sm:  36,
    md:  44,
    lg:  56,
    xl:  72,
    '2xl': 96,
  },
} as const;