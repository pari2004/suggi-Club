import React from 'react';
import { cn } from '@/lib/utils';

export function Separator({
  orientation = 'horizontal',
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' }) {
  return (
    <div
      className={cn(
        'shrink-0 bg-[#E8E1D5]',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#F5F0E6]', className)}
      {...props}
    />
  );
}
