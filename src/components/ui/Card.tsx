'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  price?: string;
  onClick?: () => void;
}

/**
 * Premium card component for rooms and experiences.
 * Features elegant hover states and image zoom effect.
 */
export function Card({
  children,
  className,
  image,
  title,
  subtitle,
  price,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'aspect-[4/5]',
        'bg-[var(--color-off-white)]',
        'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Image */}
      {image && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            className={cn(
              'w-full h-full',
              'object-cover',
              'transition-transform duration-700 ease-out',
              'group-hover:scale-105'
            )}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {title && (
          <h3 className="text-2xl font-serif text-white mb-2">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-white/80 mb-3">
            {subtitle}
          </p>
        )}
        {price && (
          <p className="text-lg text-[var(--color-gold)] font-medium">
            {price}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}