'use client';

import NextImage, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * Optimized Image component with lazy loading and blur placeholder.
 * Uses Next.js Image component with automatic WebP/AVIF generation.
 */
export function Image({
  className,
  priority = false,
  quality = 85,
  placeholder,
  blurDataURL,
  ...props
}: ImageProps & { className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // If placeholder is explicitly 'blur', check if we have blurDataURL to avoid Next.js runtime errors for remote images
  const resolvedPlaceholder = placeholder === 'blur' && !blurDataURL ? undefined : placeholder;

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        !isLoaded && 'bg-[var(--color-stone)]/20',
        className
      )}
    >
      <NextImage
        {...props}
        priority={priority}
        quality={quality}
        placeholder={resolvedPlaceholder}
        blurDataURL={blurDataURL}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

/**
 * Responsive image for full-width sections.
 * Automatically selects appropriate size based on viewport.
 */
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '4/5' | '1/1';
  className?: string;
  priority?: boolean;
}) {
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
  };

  return (
    <div className={cn(aspectClasses[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}