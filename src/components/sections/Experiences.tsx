'use client';

import { useLanguage } from '@/hooks';
import { Image } from '@/components/ui';

interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

/**
 * Experiences Section Component
 * Showcases SPA, Restaurant, and Activities.
 */
export function ExperiencesSection() {
  const { t } = useLanguage();

  const experiences: Experience[] = [
    {
      id: 'spa',
      title: t('experiences.items.spa.title'),
      description: t('experiences.items.spa.description'),
      image: '/images/experiences/spa.jpg',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      id: 'restaurant',
      title: t('experiences.items.restaurant.title'),
      description: t('experiences.items.restaurant.description'),
      image: '/images/experiences/restaurant.jpg',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 2v18h18V2H3zm16 16H5V4h14v14z" />
          <path d="M8 6h8M8 10h8M8 14h4" />
        </svg>
      ),
    },
    {
      id: 'activities',
      title: t('experiences.items.activities.title'),
      description: t('experiences.items.activities.description'),
      image: '/images/experiences/activities.jpg',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      id: 'events',
      title: t('experiences.items.events.title'),
      description: t('experiences.items.events.description'),
      image: '/images/experiences/events.jpg',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <section id="experiences" className="bg-[var(--color-white)] py-20 md:py-32">
      {/* Section header */}
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-overline text-[var(--color-gold)] mb-4 block reveal-overline">
            {t('experiences.overline')}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[var(--color-charcoal)] mb-6 reveal-title">
            {t('experiences.title')}
          </h2>
          <div className="w-24 h-px bg-[var(--color-stone)] mx-auto reveal-line" />
        </div>
      </div>

      {/* Full-width experiences grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="group relative aspect-[16/10] overflow-hidden reveal-fade"
          >
            {/* Actual Image */}
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Icon */}
            <div className="absolute top-8 left-8 text-white drop-shadow-lg">
              {experience.icon}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                {experience.title}
              </h3>
              <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto font-light leading-relaxed">
                {experience.description}
              </p>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex justify-center">
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    import('@/lib/lenis-setup').then(({ scrollTo }) => scrollTo('#booking'));
                  }}
                  className="text-[var(--color-gold)] text-sm uppercase tracking-wider hover:underline flex items-center gap-3"
                >
                  {t('experiences.detailsBtn')}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}