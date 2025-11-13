/**
 * Calming pastel green palette for the production monitoring web app.
 *
 * Notes
 * - Primary is a soft, calm green (emerald-like) suitable for brand and positive states.
 * - Surfaces use neutral stone tones for low-contrast, calm UIs.
 * - Accent "mint" (teal-like) complements green for highlights without being loud.
 * - Semantic scales are provided for success/warning/error/info.
 *
 * Usage idea (no Tailwind wiring yet):
 *   import { colorPalette } from '@/configs/color.config'
 *   const bg = colorPalette.surface[50]
 *   const brand = colorPalette.brand.primary[600]
 */

export type Shade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950
export type ColorScale = Record<Shade, string>

// Primary: brighter, more vivid green (less pastel than emerald)
const primaryGreen: ColorScale = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a', // recommended primary
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
}

// Neutral surfaces: soft stone (warm gray) to keep things calm and legible
const surfaceNeutral: ColorScale = {
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c',
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#0c0a09',
}

// Accent: mint/teal vibe for subtle highlights
const mintAccent: ColorScale = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
  950: '#042f2e',
}

// Semantic companion scales
const amberWarning: ColorScale = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
}

const roseError: ColorScale = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e',
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
  950: '#4c0519',
}

const skyInfo: ColorScale = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
}

export const colorPalette = {
  // Brand and UI
  brand: {
    primary: primaryGreen,
  },
  surface: surfaceNeutral,
  accent: {
    mint: mintAccent,
  },

  // Semantic states (monitoring)
  semantic: {
    success: primaryGreen, // ok/normal
    warning: amberWarning, // caution
    error: roseError, // fault/critical
    info: skyInfo, // neutral information
  },

  // Recommended default tokens (optional):
  tokens: {
    bgDefault: surfaceNeutral[50],
    bgMuted: surfaceNeutral[100],
    borderMuted: surfaceNeutral[200],
    textPrimary: surfaceNeutral[900],
    textSecondary: surfaceNeutral[600],

    primary: primaryGreen[600],
    primaryHover: primaryGreen[700],
    primarySoft: primaryGreen[200],

    successSoft: primaryGreen[200],
    warningSoft: amberWarning[200],
    errorSoft: roseError[200],
    infoSoft: skyInfo[200],
  },
} as const

export type ColorPalette = typeof colorPalette
