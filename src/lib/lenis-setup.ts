/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Lenis Smooth Scroll Configuration
 * Creates buttery-smooth scrolling experience
 * matching the premium feel of the design.
 */

import Lenis from '@studio-freight/lenis';

let lenis: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll.
 * Call once on app mount.
 */
export function initLenis(): Lenis {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Request animation frame loop
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Sync with GSAP ScrollTrigger
  import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => {
    lenis?.on('scroll', ScrollTrigger.update);

    (ScrollTrigger as any).scrollerProxy = {
      scrollTop(value: number) {
        return arguments.length
          ? lenis?.scrollTo(value)
          : lenis?.scroll() ?? 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinSpacing: false,
    };
  });

  return lenis;
}

/**
 * Get the Lenis instance.
 */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Destroy Lenis instance.
 * Call on app unmount.
 */
export function destroyLenis(): void {
  lenis?.destroy();
  lenis = null;
}

/**
 * Scroll to a specific position or element.
 */
export function scrollTo(
  target: string | number,
  options?: {
    offset?: number;
    duration?: number;
    easing?: string;
  }
): void {
  if (!lenis) return;

  lenis.scrollTo(target, {
    offset: options?.offset || 0,
    duration: options?.duration || 1.2,
    easing: options?.easing
      ? (t: number) => {
          // Custom easing
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        }
      : undefined,
  });
}