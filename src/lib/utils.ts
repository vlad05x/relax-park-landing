import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names conditionally.
 * Uses clsx under the hood for efficient class merging.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Easing functions matching the design system tokens.
 * Use these for GSAP animations consistency.
 */
export const easing = {
  default: [0.4, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
  elastic: [0.34, 1.56, 0.64, 1],
};

/**
 * Breakpoint values matching the design system.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
};

/**
 * Spacing scale in pixels.
 */
export const spacing = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 48,
  6: 64,
  8: 96,
  10: 128,
  12: 160,
  16: 256,
  20: 320,
  24: 384,
};

/**
 * Check if user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is mobile.
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}