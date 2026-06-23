'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NavigationDots } from '@/components/layout/Navigation';
import { Button, Image, ResponsiveImage } from '@/components/ui';
import { RoomDetailsModal } from '@/components/ui/RoomDetailsModal';
import { ExperiencesSection, GallerySection, ContactsSection } from '@/components/sections';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { useEffect, useState } from 'react';
import { initLenis, scrollTo } from '@/lib/lenis-setup';
import { gsap } from '@/lib/gsap-config';
import { useLanguage } from '@/hooks';

interface Room {
  id: string;
  name: string;
  guests: string;
  price: string;
  image: string;
  images?: string[];
  description: string;
  fullDescription?: string;
  amenities: string[];
  bedType: string;
  area: number;
  features?: string[];
}

const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Forest Villa',
    guests: '2 гостя',
    price: 'від 25 000 грн / ніч',
    image: '/images/rooms/villa-01.jpg',
    images: [
      '/images/rooms/villa-01.jpg',
      '/images/rooms/villa-02.jpg',
      '/images/rooms/villa-03.jpg',
    ],
    description: 'Отдельный дом в лесу с панорамными окнами',
    fullDescription: 'Forest Villa — это уединенное пространство в сердце леса. Панорамные окна от пола до потолка открывают вид на вековые деревья, создавая ощущение единства с природой. Просторная терраса идеально подходит для утреннего кофе или вечернего бокала вина. Интерьер выполнен в стиле современного минимализма с использованием натуральных материалов.',
    amenities: ['WiFi', 'Камин', 'Терраса', 'Mini bar', 'Кондиционер', 'Фен', 'Халаты и тапочки'],
    bedType: 'King',
    area: 45,
    features: ['Панорамные окна', 'Вид на лес', 'Отдельный вход', 'Звукоизоляция'],
  },
  {
    id: '2',
    name: 'Lake Suite',
    guests: '2-4 гостя',
    price: 'від 35 000 грн / ніч',
    image: '/images/rooms/suite-01.jpg',
    images: [
      '/images/rooms/suite-01.jpg',
      '/images/rooms/suite-02.jpg',
      '/images/rooms/suite-03.jpg',
    ],
    description: 'Люкс с видом на озеро',
    fullDescription: 'Lake Suite — это роскошный люкс с захватывающими видами на озеро. Просторная комната с зонированным пространством, собственная джакузи на балконе и премиальная отделка создают атмосферу исключительного комфорта. Идеальный выбор для романтического getaway или небольшого семейного отдыха.',
    amenities: ['WiFi', 'Джакузи', 'Балкон', 'Mini bar', 'SPA', 'Кондиционер', 'Фен', 'Халаты и тапочки', 'Кофемашина'],
    bedType: 'King + Sofa',
    area: 65,
    features: ['Вид на озеро', 'Балкон с джакузи', 'Зонированное пространство', 'Премиальная отделка'],
  },
  {
    id: '3',
    name: 'Royal Estate',
    guests: 'до 6 гостей',
    price: 'від 55 000 грн / ніч',
    image: '/images/rooms/estate-01.jpg',
    images: [
      '/images/rooms/estate-01.jpg',
      '/images/rooms/estate-02.jpg',
      '/images/rooms/estate-03.jpg',
    ],
    description: 'Премиальный дом для большой компании',
    fullDescription: 'Royal Estate — это максимальный уровень роскоши и комфорта. Двухэтажный дом с двумя спальнями, просторной гостиной, полностью оборудованной кухней и собственной SPA-зоной. Большой камин, панорамные террасы и приватное расположение делают этот выбор идеальным для особенных случаев.',
    amenities: ['WiFi', 'Камин', 'Терраса', 'Джакузи', 'Кухня', 'SPA', 'Кондиционер', 'Фен', 'Халаты и тапочки', 'Кофемашина', 'Винный холодильник'],
    bedType: '2x King + Sofa',
    area: 120,
    features: ['Двухэтажный', 'Приватное расположение', 'Собственная SPA-зона', 'Панорамные террасы', 'Два санузла'],
  },
];

/**
 * Hero Section Component - With beautiful video background
 */
function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Video Background - Beautiful forest lake nature */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay - darker for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />

      {/* Content - better centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-5xl md:text-[96px] font-serif text-white mb-6 opacity-0 leading-tight"
          id="hero-title"
        >
          {t('hero.title')}
        </h1>
        <p
          className="text-lg md:text-2xl text-white/90 max-w-3xl mb-12 opacity-0 font-light leading-relaxed"
          id="hero-subtitle"
        >
          {t('hero.subtitle')}
        </p>
        <div className="opacity-0" id="hero-cta">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              scrollTo('#booking');
            }}
          >
            {t('hero.cta')}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs uppercase tracking-widest mb-3">{t('hero.scroll')}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/**
 * Philosophy Section Component - Enhanced with parallax image
 */
function PhilosophySection() {
  const { t } = useLanguage();

  return (
    <section id="philosophy" className="section bg-[var(--color-white)] overflow-hidden">
      {/* Full-width decorative top */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-stone)] to-transparent" />

      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24">
          <span className="block text-overline text-[var(--color-gold)] mb-6 text-center mx-auto reveal-overline">
            {t('philosophy.overline')}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--color-charcoal)] mb-8 leading-tight max-w-5xl text-center mx-auto reveal-title">
            {t('philosophy.title')}
          </h2>
          <div className="w-24 h-px bg-[var(--color-stone)] mb-10 mx-auto reveal-line" />
          <div className="max-w-3xl space-y-6 mx-auto text-center">
            <p className="text-lg md:text-xl text-[var(--color-charcoal)]/70 leading-relaxed text-center mx-auto reveal-body">
              {t('philosophy.p1')}
            </p>
            <p className="text-lg md:text-xl text-[var(--color-charcoal)]/70 leading-relaxed text-center mx-auto reveal-body">
              {t('philosophy.p2')}
            </p>
          </div>
        </div>
      </div>

      {/* Full-width image strip */}
      <div className="grid grid-cols-3 w-full">
        <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden relative group reveal-fade">
          <ResponsiveImage
            src="/images/nature/forest.jpg"
            alt="Forest"
            aspectRatio="16/9"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden relative group reveal-fade">
          <ResponsiveImage
            src="/images/nature/spa-detail.jpg"
            alt="SPA"
            aspectRatio="16/9"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden relative group reveal-fade">
          <ResponsiveImage
            src="/images/nature/lake.jpg"
            alt="Nature"
            aspectRatio="16/9"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Full-width decorative bottom */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-stone)]/50 to-transparent" />
    </section>
  );
}

/**
 * Rooms Preview Section Component - Full width modern design
 */
function RoomsSection({ onRoomSelect }: { onRoomSelect: (room: Room) => void }) {
  const { t } = useLanguage();

  const rooms = ROOMS.map((room) => {
    const translation = t(`rooms.items.${room.id}`);
    return {
      ...room,
      name: translation.name,
      description: translation.description,
      fullDescription: translation.fullDescription,
      price: translation.price,
      guests: translation.guests,
      bedType: translation.bedType,
      features: translation.features,
      amenities: translation.amenities,
    };
  });

  return (
    <section id="rooms" className="bg-[var(--color-off-white)] py-20 md:py-32">
      {/* Section header */}
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-overline text-[var(--color-gold)] mb-4 block reveal-overline">
            {t('rooms.overline')}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[var(--color-charcoal)] mb-6 reveal-title">
            {t('rooms.title')}
          </h2>
          <div className="w-24 h-px bg-[var(--color-stone)] mx-auto reveal-line" />
        </div>
      </div>

      {/* Full-width rooms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="group relative aspect-[4/5] overflow-hidden bg-[var(--color-charcoal)] reveal-fade"
          >
            {/* Image */}
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center text-white">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-2 flex flex-col items-center">
                <h3 className="text-2xl md:text-3xl font-serif mb-3">{room.name}</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-white/70 mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{room.guests}</span>
                </div>
                <p className="text-[var(--color-gold)] font-medium text-lg">
                  {room.price}
                </p>
              </div>
            </div>

            {/* Hover overlay with CTA */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <Button
                variant="secondary"
                className="text-white border-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                onClick={() => onRoomSelect(room)}
              >
                {t('rooms.detailsBtn')}
              </Button>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[var(--color-gold)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Booking Section Component
 * Features full multi-step booking widget with PMS integration.
 */
function BookingSection() {
  const { t } = useLanguage();

  return (
    <section id="booking" className="bg-[var(--color-white)] py-20 md:py-32">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-overline text-[var(--color-gold)] mb-4 block reveal-overline">
            {t('booking.overline')}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[var(--color-charcoal)] mb-6 reveal-title">
            {t('booking.title')}
          </h2>
          <div className="w-24 h-px bg-[var(--color-stone)] mx-auto reveal-line" />
        </div>

        <div className="max-w-5xl mx-auto reveal-fade">
          <div className="bg-[var(--color-white)] rounded-sm shadow-2xl overflow-hidden border border-[var(--color-stone)]/20">
            <BookingWidget />
          </div>
        </div>

        {/* Alternative CTA */}
        <div className="text-center mt-16 reveal-fade">
          <p className="text-[var(--color-charcoal)]/60 mb-6 text-sm uppercase tracking-wider">
            {t('booking.alternativeCta')}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="ghost" size="sm" className="group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 group-hover:scale-110 transition-transform">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c.237.643.237 2.057 0 3.192-.237 1.135-1.38 2.216-2.215 2.216-.835 0-1.675-.237-2.51-.474-.835-.237-1.67-.474-2.216 0-.546.474-1.09 1.19-1.783 1.19-.693 0-2.057-.835-3.073-2.058C4.026 10.026 2.75 7.368 3.23 6.221c.237-.546.835-.835 1.528-.835.474 0 .948.059 1.303.059.355 0 .71.059.835.643.118.586.474 2.057.474 2.193 0 .136-.237.355-.474.592-.237.237-.592.532-.474.888.118.355.592.835 1.25 1.427 2.038 1.816 2.38 1.45 2.794 1.036.414-.414.888-1.25 1.065-1.664.177-.414.474-.474.83-.355.355.118 2.265 1.065 2.65 1.25.385.177.643.296.71.532.06.237.06 1.012-.237 2.058z"/>
              </svg>
              WhatsApp
            </Button>
            <Button variant="ghost" size="sm" className="group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2 group-hover:scale-110 transition-transform">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.461-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.344-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </Button>
            <Button variant="ghost" size="sm" className="group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-2 group-hover:scale-110 transition-transform">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <a href={`tel:${t('contacts.phoneDetail').replace(/[^+\d]/g, '')}`}>
                {t('contacts.phoneDetail')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Main Page Component
 */
export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    // Initialize smooth scroll
    initLenis();

    // Hero animations
    const tl = gsap.timeline();
    tl.to('#hero-title', { opacity: 1, duration: 1.4, ease: 'power3.out' })
      .to('#hero-subtitle', { opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
      .to('#hero-cta', { opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6');

    // ScrollTrigger animations for reveal elements
    const revealOverlines = gsap.utils.toArray('.reveal-overline');
    revealOverlines.forEach((el) => {
      gsap.fromTo(el as Element,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    const revealTitles = gsap.utils.toArray('.reveal-title');
    revealTitles.forEach((el) => {
      gsap.fromTo(el as Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    const revealLines = gsap.utils.toArray('.reveal-line');
    revealLines.forEach((el) => {
      gsap.fromTo(el as Element,
        { scaleX: 0, transformOrigin: 'center' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    const revealBodies = gsap.utils.toArray('.reveal-body');
    revealBodies.forEach((el) => {
      gsap.fromTo(el as Element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    const revealFades = gsap.utils.toArray('.reveal-fade');
    revealFades.forEach((el) => {
      gsap.fromTo(el as Element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-white)]">
      <Header />
      <NavigationDots />

      <main>
        <HeroSection />
        <PhilosophySection />
        <RoomsSection onRoomSelect={setSelectedRoom} />
        <ExperiencesSection />
        <GallerySection />
        <BookingSection />
        <ContactsSection />
      </main>

      <Footer />

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={selectedRoom}
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookNow={() => {
          scrollTo('#booking');
        }}
      />
    </div>
  );
}