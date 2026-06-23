'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to animate elements on scroll with fade-in + up effect.
 */
export function useScrollReveal(options?: {
  threshold?: number;
  delay?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const threshold = options?.threshold ?? 0.1;
    const delay = options?.delay ?? 0;
    const distance = options?.distance ?? 40;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setIsRevealed(true);

            gsap.fromTo(
              element,
              { opacity: 0, y: distance },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay,
              }
            );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options?.threshold, options?.delay, options?.distance]);

  return { ref, isRevealed };
}

/**
 * Hook for horizontal scroll animations.
 */
export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const sections = element.querySelectorAll('.scroll-section');
    const totalSections = sections.length;

    tweenRef.current = gsap.to(element, {
      x: () => -(element.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        pin: true,
        scrub: 1,
        snap: 1 / (totalSections - 1),
        end: () => '+=' + (element.scrollWidth - window.innerWidth),
      },
    });

    return () => {
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}

/**
 * Hook for parallax effect on scroll.
 */
export function useParallax(strength: number = 100) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: strength,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [strength]);

  return ref;
}