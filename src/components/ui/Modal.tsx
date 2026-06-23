'use client';

import { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Premium modal with smooth scale transitions
 * and backdrop blur effect.
 */
export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[500]',
        'flex items-center justify-center',
        'p-4 md:p-8'
      )}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-black/60',
          'backdrop-blur-sm',
          'transition-opacity duration-300'
        )}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-[510]',
          'w-full max-w-2xl',
          'bg-[var(--color-white)]',
          'shadow-2xl',
          'animate-in fade-in zoom-in duration-300',
          className
        )}
      >
        <button
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 z-[520]',
            'w-10 h-10',
            'flex items-center justify-center',
            'text-[var(--color-charcoal)]',
            'hover:bg-[var(--color-beige)]/50',
            'transition-colors duration-200'
          )}
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}