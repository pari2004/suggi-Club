import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#49301F] tracking-wide uppercase">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-lg border border-[#E8E1D5] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#49301F] placeholder:text-[#A89F91] transition-colors focus:border-[#244832] focus:outline-none focus:ring-2 focus:ring-[#244832]/20 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {helperText && !error && <p className="text-xs text-[#6B5E55]">{helperText}</p>}
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
