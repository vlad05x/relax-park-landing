'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks';
import { scrollTo } from '@/lib/lenis-setup';

/**
 * Premium header with transparent-to-solid transition on scroll.
 * Features minimal logo treatment and elegant navigation.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#philosophy', label: t('nav.philosophy') },
    { href: '#rooms', label: t('nav.rooms') },
    { href: '#experiences', label: t('nav.experiences') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[300]',
        'transition-all duration-500 ease-out',
        isScrolled ? 'bg-[var(--color-white)]/98 backdrop-blur-md shadow-lg' : 'bg-transparent',
        'py-4'
      )}
    >
      <div className="flex items-center px-6 md:px-12">
        {/* Logo - Left */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="flex-shrink-0 flex items-center gap-3 group min-w-[180px]"
        >
          <span
            className={cn(
              'text-xl md:text-2xl font-serif tracking-tight transition-colors',
              isScrolled ? 'text-[var(--color-charcoal)]' : 'text-white'
            )}
          >
            RELAX PARK
          </span>
          <div className={cn(
            'w-8 h-px transition-all duration-500',
            isScrolled ? 'bg-[var(--color-charcoal)]' : 'bg-white group-hover:w-12'
          )} />
        </a>

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={cn(
                  'text-xs uppercase tracking-widest',
                  'transition-all duration-300 relative group',
                  isScrolled ? 'text-[var(--color-charcoal)]/70 hover:text-[var(--color-charcoal)]' : 'text-white/70 hover:text-white',
                  'whitespace-nowrap'
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full',
                  isScrolled ? 'bg-[var(--color-charcoal)]' : 'bg-white'
                )} />
              </a>
            ))}
          </div>
        </nav>

        {/* Right Controls (Language + CTA) */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-end min-w-[300px]">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 mr-6 text-xs tracking-wider">
            {(['uk', 'en', 'ru'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'uppercase transition-colors py-1 px-1.5 rounded-sm font-semibold',
                  language === lang
                    ? (isScrolled ? 'text-[var(--color-charcoal)] border-b border-[var(--color-charcoal)]' : 'text-white border-b border-white')
                    : (isScrolled ? 'text-[var(--color-charcoal)]/50 hover:text-[var(--color-charcoal)]' : 'text-white/50 hover:text-white')
                )}
              >
                {lang === 'uk' ? 'ua' : lang}
              </button>
            ))}
          </div>

          <Button
            variant={isScrolled ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              scrollTo('#booking');
            }}
          >
            {t('nav.book')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            'md:hidden p-2 transition-colors ml-auto',
            isScrolled ? 'text-[var(--color-charcoal)]' : 'text-white'
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-[290]',
          'bg-[var(--color-white)]',
          'transition-transform duration-500 ease-in-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                scrollTo(link.href);
              }}
              className="text-2xl font-serif text-[var(--color-charcoal)] fade-in"
              style={{ '--animation-delay': `${index * 100}ms` } as React.CSSProperties}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col items-center gap-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setIsMenuOpen(false);
                scrollTo('#booking');
              }}
            >
              {t('nav.book')}
            </Button>

            {/* Mobile Language Switcher */}
            <div className="flex gap-4 text-sm tracking-wider mt-4">
              {(['uk', 'en', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    'uppercase transition-colors py-1 px-3 rounded-sm font-semibold border',
                    language === lang
                      ? 'text-[var(--color-charcoal)] border-[var(--color-charcoal)]'
                      : 'text-[var(--color-charcoal)]/50 border-transparent hover:text-[var(--color-charcoal)]'
                  )}
                >
                  {lang === 'uk' ? 'ua' : lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}