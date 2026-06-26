// theme/index.ts
// تصدير موحد لكل عناصر الثيم

export { Colors, AppColors } from './colors';
export type { AppColorsType } from './colors';

export { Typography } from './typography';
export { Spacing } from './spacing';

// ── ثابت مشترك سريع ──────────────────────────────
import { AppColors } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';

export const Theme = {
  colors: AppColors,
  typography: Typography,
  spacing: Spacing,
} as const;

export type Theme = typeof Theme;