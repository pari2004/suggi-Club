import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' | 'gold';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#F5F0E6] text-[#49301F] border-transparent',
    success: 'bg-[#244832]/10 text-[#244832] border-[#244832]/20 font-medium',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    destructive: 'bg-red-100 text-red-800 border-red-200',
    outline: 'border border-[#B99A61] text-[#49301F] bg-transparent',
    gold: 'bg-[#B99A61]/15 text-[#9A7E4A] border-[#B99A61]/30 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
