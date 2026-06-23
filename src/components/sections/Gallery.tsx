'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { getLenis } from '@/lib/lenis-setup';
import { useLanguage } from '@/hooks';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

interface GalleryGridItemProps {
  image: ImageItem;
  index: number;
  onClick: (image: ImageItem) => void;
  translateCategory: (cat?: string) => string;
}

/**
 * Individual gallery grid item with Lenis-based parallax and CSS reveal.
 */
function GalleryGridItem({ image, index, onClick, translateCategory }: GalleryGridItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // CSS-based reveal on scroll (no GSAP conflicts)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax via Lenis scroll event
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const speed = 0.15 + (index % 3) * 0.05;
      const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setParallaxY(scrollProgress * 30 * speed);
    };

    lenis.on('scroll', handleScroll);
    handleScroll(); // initial call

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [index]);

  const isRowSpan = index % 5 === 0;
  const isColSpan = index % 7 === 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative overflow-hidden cursor-pointer',
        'bg-[var(--color-off-white)]',
        isRowSpan ? 'row-span-2' : '',
        isColSpan ? 'col-span-2' : ''
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 40}px)`,
        transition: 'opacity 1.2s cubic-bezier(0, 0, 0.2, 1), transform 1.2s cubic-bezier(0, 0, 0.2, 1)',
        transitionDelay: `${Math.min(index * 50, 300)}ms`,
      }}
      onClick={() => onClick(image)}
    >
      {/* Image wrapper */}
      <div className={cn(
        'aspect-square',
        isRowSpan ? 'md:aspect-auto md:h-96' : ''
      )}>
        {/* Actual Image with parallax transform */}
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `scale(${1 + parallaxY / 100}) translateY(-${parallaxY}px)`,
            transition: 'transform 0.1s linear',
          }}
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Zoom icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-2xl">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </div>
      </div>

      {/* Category label - appears on hover */}
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <span className="text-white text-xs uppercase tracking-wider bg-black/70 backdrop-blur-sm px-4 py-2.5 rounded-sm">
          {translateCategory(image.category)}
        </span>
      </div>

      {/* Image number indicator */}
      <div className="absolute top-4 right-4 text-white/60 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

/**
 * Gallery Section with Lenis-compatible parallax and CSS reveal.
 * Features smooth scroll animations and interactive lightbox.
 */
export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const { t, language } = useLanguage();

  const translateCategory = (cat?: string) => {
    if (!cat) return '';
    switch (cat) {
      case 'Экстерьер': return language === 'uk' ? "Екстер'єр" : language === 'en' ? 'Exterior' : 'Экстерьер';
      case 'Интерьер': return language === 'uk' ? "Інтер'єр" : language === 'en' ? 'Interior' : 'Интерьер';
      case 'SPA': return 'SPA';
      case 'Природа': return language === 'uk' ? 'Природа' : language === 'en' ? 'Nature' : 'Природа';
      case 'Ресторан': return language === 'uk' ? 'Ресторан' : language === 'en' ? 'Restaurant' : 'Ресторан';
      default: return cat;
    }
  };

  const translateAlt = (alt: string) => {
    switch (alt) {
      case 'Экстерьер комплекса': return language === 'uk' ? "Екстер'єр комплексу" : language === 'en' ? 'Resort Exterior' : 'Экстерьер комплекса';
      case 'Интерьер люкса': return language === 'uk' ? "Інтер'єр люксу" : language === 'en' ? 'Suite Interior' : 'Интерьер люкса';
      case 'SPA бассейн': return language === 'uk' ? 'SPA басейн' : language === 'en' ? 'SPA Pool' : 'SPA бассейн';
      case 'Лесная тропа': return language === 'uk' ? 'Лісова стежка' : language === 'en' ? 'Forest Path' : 'Лесная тропа';
      case 'Ресторан': return language === 'uk' ? 'Ресторан' : language === 'en' ? 'Restaurant' : 'Ресторан';
      case 'Вид на озеро': return language === 'uk' ? 'Вид на озеро' : language === 'en' ? 'Lake View' : 'Вид на озеро';
      case 'Терраса виллы': return language === 'uk' ? 'Тераса вілли' : language === 'en' ? 'Villa Terrace' : 'Терраса виллы';
      case 'Ванная комната': return language === 'uk' ? 'Ванна кімната' : language === 'en' ? 'Bathroom' : 'Ванная комната';
      case 'Утренний туман': return language === 'uk' ? 'Ранковий туман' : language === 'en' ? 'Morning Mist' : 'Утренний туман';
      case 'Зона у камина': return language === 'uk' ? 'Зона біля каміна' : language === 'en' ? 'Fireplace Area' : 'Зона у камина';
      case 'Йога deck': return language === 'uk' ? 'Йога-платформа' : language === 'en' ? 'Yoga Deck' : 'Йога deck';
      case 'Закат': return language === 'uk' ? 'Захід сонця' : language === 'en' ? 'Sunset' : 'Закат';
      default: return alt;
    }
  };

  // Premium gallery images from Unsplash
  const images: ImageItem[] = [
    { id: '1', src: '/images/gallery/01.jpg', alt: 'Экстерьер комплекса', category: 'Экстерьер' },
    { id: '2', src: '/images/gallery/02.jpg', alt: 'Интерьер люкса', category: 'Интерьер' },
    { id: '3', src: '/images/gallery/03.jpg', alt: 'SPA бассейн', category: 'SPA' },
    { id: '4', src: '/images/gallery/04.jpg', alt: 'Лесная тропа', category: 'Природа' },
    { id: '5', src: '/images/gallery/05.jpg', alt: 'Ресторан', category: 'Ресторан' },
    { id: '6', src: '/images/gallery/06.jpg', alt: 'Вид на озеро', category: 'Природа' },
    { id: '7', src: '/images/gallery/07.jpg', alt: 'Терраса виллы', category: 'Экстерьер' },
    { id: '8', src: '/images/gallery/08.jpg', alt: 'Ванная комната', category: 'Интерьер' },
    { id: '9', src: '/images/gallery/09.jpg', alt: 'Утренний туман', category: 'Природа' },
    { id: '10', src: '/images/gallery/10.jpg', alt: 'Зона у камина', category: 'Интерьер' },
    { id: '11', src: '/images/gallery/11.jpg', alt: 'Йога deck', category: 'SPA' },
    { id: '12', src: '/images/gallery/12.jpg', alt: 'Закат', category: 'Природа' },
  ];

  return (
    <section id="gallery" className="bg-[var(--color-white)] py-20 md:py-32 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-overline text-[var(--color-gold)] mb-4 block reveal-overline">
            {t('gallery.overline')}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[var(--color-charcoal)] mb-6 reveal-title">
            {t('gallery.title')}
          </h2>
          <div className="w-24 h-px bg-[var(--color-stone)] mx-auto reveal-line" />
          <p className="text-[var(--color-charcoal)]/60 mt-6 max-w-2xl mx-auto reveal-body">
            {t('gallery.subtitle')}
          </p>
        </div>
      </div>

      {/* Full-width masonry grid with auto flow dense */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 grid-flow-dense">
        {images.map((image, index) => (
          <GalleryGridItem
            key={image.id}
            image={image}
            index={index}
            onClick={setSelectedImage}
            translateCategory={translateCategory}
          />
        ))}
      </div>

      {/* Lightbox Modal with enhanced navigation */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="max-w-7xl"
      >
        {selectedImage && (
          <div className="relative bg-[var(--color-charcoal)] min-h-[60vh] md:min-h-[80vh]">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-50 p-3 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Aspect ratio container */}
            <div className="aspect-video">
              {/* Actual Image in Modal */}
              <img
                src={selectedImage.src}
                alt={translateAlt(selectedImage.alt)}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Previous button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full"
              onClick={() => {
                const currentIndex = images.findIndex((i) => i.id === selectedImage.id);
                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                setSelectedImage(images[prevIndex]);
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full"
              onClick={() => {
                const currentIndex = images.findIndex((i) => i.id === selectedImage.id);
                const nextIndex = (currentIndex + 1) % images.length;
                setSelectedImage(images[nextIndex]);
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="text-white font-serif text-2xl mb-1">{translateAlt(selectedImage.alt)}</p>
                  <p className="text-white/60 text-sm uppercase tracking-wider">{translateCategory(selectedImage.category)}</p>
                </div>
                <div className="text-white/40 text-sm font-mono">
                  {images.findIndex((i) => i.id === selectedImage.id) + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}