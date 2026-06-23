/**
 * GSAP Configuration for Relax Park 5*
 * Elegant, smooth animations matching the premium design system.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Default animation settings
const defaults = {
  ease: 'power3.inOut' as const,
  duration: 1.2,
};

gsap.defaults(defaults);

/**
 * Animation presets for common patterns.
 */
export const animations = {
  // Fade in from below
  fadeInUp: {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
  },

  // Scale in with fade
  scaleIn: {
    scale: 0.95,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.inOut',
  },

  // Image reveal
  imageReveal: {
    scale: 1.1,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
  },

  // Text stagger
  textStagger: {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.1,
  },

  // Horizontal scroll section
  horizontalScroll: (sections: number) => ({
    xPercent: -100 * (sections - 1),
    scrollTrigger: {
      trigger: '.horizontal-section',
      pin: true,
      scrub: 1,
      snap: 1 / (sections - 1),
      end: `+=${3000 * sections}`,
    },
  }),
};

/**
 * Create a staggered timeline for text reveals.
 */
export function createTextStagger(
  elements: Element[],
  delay: number = 0
): gsap.core.Tween {
  return gsap.fromTo(
    elements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
      delay,
    }
  );
}

/**
 * Create image parallax effect.
 */
export function createParallax(
  element: Element,
  strength: number = 100
): gsap.core.Tween {
  return gsap.to(element, {
    y: strength,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Create fade on scroll.
 */
export function createFadeOnScroll(
  element: Element,
  options?: {
    trigger?: string;
    start?: string;
    end?: string;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: options?.trigger || element,
        start: options?.start || 'top 85%',
        end: options?.end || 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export { gsap };