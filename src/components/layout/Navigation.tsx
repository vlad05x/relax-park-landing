'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks';
import { scrollTo } from '@/lib/lenis-setup';

/**
 * Floating navigation dots for section indicators.
 * Shows current section and allows quick navigation.
 */
export function NavigationDots() {
  const [activeSection, setActiveSection] = useState(0);
  const { t, language } = useLanguage();

  const homeLabel = language === 'uk' ? 'Головна' : language === 'en' ? 'Home' : 'Главная';

  const sections = [
    { id: 'hero', label: homeLabel },
    { id: 'philosophy', label: t('nav.philosophy') },
    { id: 'rooms', label: t('nav.rooms') },
    { id: 'experiences', label: t('nav.experiences') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'booking', label: t('booking.overline') },
    { id: 'contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (index: number) => {
    scrollTo(`#${sections[index].id}`);
  };

  return (
    <nav
      className={cn(
        'fixed right-8 top-1/2 -translate-y-1/2',
        'hidden lg:flex',
        'flex-col',
        'items-center',
        'gap-4',
        'z-[200]'
      )}
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => handleClick(index)}
          className={cn('group flex items-center gap-3 transition-all duration-300')}
          aria-label={section.label}
        >
          {/* Label on hover */}
          <span
            className={cn(
              'text-xs uppercase tracking-wider text-[var(--color-charcoal)]',
              'opacity-0 translate-x-2',
              'group-hover:opacity-100 group-hover:translate-x-0',
              'transition-all duration-300'
            )}
          >
            {section.label}
          </span>

          {/* Dot indicator */}
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              'border border-[var(--color-charcoal)]',
              'transition-all duration-300',
              index === activeSection
                ? 'bg-[var(--color-charcoal)] scale-125'
                : 'bg-transparent hover:bg-[var(--color-charcoal)]/50'
            )}
          />
        </button>
      ))}
    </nav>
  );
}