'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
}

/**
 * Premium button component with elegant hover states
 * and smooth transitions matching the design system.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  as = 'button',
  href,
  disabled,
  ...props
}: ButtonProps) {
  const Component = href ? 'a' : as;

  const baseStyles = `
    inline-flex items-center justify-center
    font-[var(--font-sans)]
    text-[var(--text-body)]
    font-medium
    tracking-[var(--tracking-wide)]
    uppercase
    transition-[all] duration-[var(--duration-normal)] ease-[var(--ease-default)]
    cursor-pointer
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const variants = {
    primary: `
      bg-[var(--color-charcoal)]
      text-[var(--color-white)]
      border border-[var(--color-charcoal)]
      hover:bg-[var(--color-forest)]
      hover:border-[var(--color-forest)]
      hover:-translate-y-0.5
    `,
    secondary: `
      bg-transparent
      text-[var(--color-charcoal)]
      border border-[var(--color-charcoal)]
      hover:bg-[var(--color-charcoal)]
      hover:text-[var(--color-white)]
    `,
    ghost: `
      bg-transparent
      text-[var(--color-charcoal)]
      border-transparent
      hover:bg-[var(--color-beige)]/30
    `,
  };

  const sizes = {
    sm: 'h-[44px] px-6',
    md: 'h-[52px] px-8',
    lg: 'h-[60px] px-10 text-lg',
  };

  return (
    <Component
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      href={href}
      {...props}
    >
      {children}
    </Component>
  );
}