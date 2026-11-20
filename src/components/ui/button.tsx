import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg cursor-pointer';

    const variants = {
      primary: 'bg-[#244832] text-[#FFFEFA] hover:bg-[#193323] focus-visible:ring-[#244832]',
      secondary: 'bg-[#49301F] text-[#F5F0E6] hover:bg-[#352317] focus-visible:ring-[#49301F]',
      outline: 'border border-[#B99A61] text-[#49301F] bg-transparent hover:bg-[#F5F0E6] focus-visible:ring-[#B99A61]',
      accent: 'bg-[#B99A61] text-[#244832] font-semibold hover:bg-[#9A7E4A] hover:text-[#FFFEFA] focus-visible:ring-[#B99A61]',
      ghost: 'bg-transparent text-[#49301F] hover:bg-[#F5F0E6] focus-visible:ring-[#244832]',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base font-semibold',
      icon: 'h-10 w-10 p-2',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
