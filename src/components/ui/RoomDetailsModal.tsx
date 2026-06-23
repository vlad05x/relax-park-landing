'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Modal } from './Modal';
import { Button } from './Button';
import { useLanguage } from '@/hooks';

interface Room {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: string;
  guests: string;
  image: string;
  images?: string[];
  amenities: string[];
  bedType: string;
  area: number;
  features?: string[];
}

interface RoomDetailsModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: () => void;
}

/**
 * Room Details Modal with two-column layout.
 * Desktop: Photos gallery left, description/amenities right.
 * Mobile: Single column stacked layout.
 */
export function RoomDetailsModal({ room, isOpen, onClose, onBookNow }: RoomDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!room) return null;

  // Translate room properties dynamically in the modal to support instant language switching
  const translation = t(`rooms.items.${room.id}`);
  const localizedRoom: Room = {
    ...room,
    name: translation.name || room.name,
    description: translation.description || room.description,
    fullDescription: translation.fullDescription || room.fullDescription,
    price: translation.price || room.price,
    guests: translation.guests || room.guests,
    bedType: translation.bedType || room.bedType,
    features: translation.features || room.features,
    amenities: translation.amenities || room.amenities,
  };

  const allImages = Array.from(new Set(localizedRoom.images ? [localizedRoom.image, ...localizedRoom.images] : [localizedRoom.image]));

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="bg-[var(--color-white)]">

        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column: Photo Gallery */}
          <div className="relative bg-[var(--color-charcoal)]">
            {/* Main image */}
            <div className="aspect-square lg:aspect-auto lg:h-full">
              <img
                src={allImages[currentImageIndex]}
                alt={localizedRoom.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image thumbnails */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      'flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all',
                      currentImageIndex === idx
                        ? 'border-[var(--color-gold)]'
                        : 'border-white/30 hover:border-white/60'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Image counter */}
            {allImages.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                <span className="text-white text-xs font-mono">
                  {currentImageIndex + 1} / {allImages.length}
                </span>
              </div>
            )}

            {/* Navigation arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors hidden md:block"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors hidden md:block"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Right Column: Description & Amenities */}
          <div className="p-6 md:p-10 lg:p-12 overflow-y-auto max-h-[90vh]">
            {/* Room header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-charcoal)] mb-2">
                {localizedRoom.name}
              </h2>
              <div className="flex items-center gap-4 text-[var(--color-charcoal)]/70">
                <span className="text-sm">{localizedRoom.guests}</span>
                <span>•</span>
                <span className="text-sm">{localizedRoom.area} м²</span>
                <span>•</span>
                <span className="text-sm">{localizedRoom.bedType}</span>
              </div>
              <p className="text-2xl md:text-3xl font-serif text-[var(--color-gold)] mt-4">
                {localizedRoom.price}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-serif text-[var(--color-charcoal)] mb-3">
                {t('roomModal.about')}
              </h3>
              <p className="text-[var(--color-charcoal)]/80 leading-relaxed">
                {localizedRoom.fullDescription || localizedRoom.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-lg font-serif text-[var(--color-charcoal)] mb-4">
                {t('roomModal.amenities')}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {localizedRoom.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-gold)]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-[var(--color-charcoal)]/80">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional features */}
            {localizedRoom.features && localizedRoom.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-serif text-[var(--color-charcoal)] mb-4">
                  {t('roomModal.features')}
                </h3>
                <ul className="space-y-2">
                  {localizedRoom.features.map((feature) => (
                    <li key={feature} className="text-sm text-[var(--color-charcoal)]/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-6 border-t border-[var(--color-stone)]/30">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  onClose();
                  onBookNow?.();
                }}
              >
                {t('nav.book')}
              </Button>
              <p className="text-center text-xs text-[var(--color-charcoal)]/50 mt-4">
                {t('roomModal.managerNotice')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}