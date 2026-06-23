'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Premium input component with minimal borders
 * and elegant focus states.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-[52px] px-4 rounded-sm',
            'bg-[var(--color-off-white)]/60 hover:bg-[var(--color-off-white)]/90',
            'border border-[var(--color-stone)]/40',
            'text-[var(--color-charcoal)]',
            'placeholder:text-[var(--color-charcoal)]/40',
            'transition-all duration-300 ease-in-out',
            'focus:outline-none',
            'focus:bg-[var(--color-white)]',
            'focus:border-[var(--color-gold)]',
            'focus:ring-1 focus:ring-[var(--color-gold)]',
            'focus:shadow-[0_0_0_4px_rgba(184,159,122,0.12)]',
            error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)] focus:shadow-[0_0_0_4px_rgba(139,58,58,0.12)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';