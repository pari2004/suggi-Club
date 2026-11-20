'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, description, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#244832]/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Content */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] p-6 shadow-2xl border border-[#E8E1D5] text-[#49301F] z-10 animate-in fade-in zoom-in-95 duration-150',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#A89F91] hover:bg-[#F5F0E6] hover:text-[#49301F] transition-colors"
          aria-label="Close dialog"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {title && <h2 className="text-xl font-bold text-[#244832] pr-6">{title}</h2>}
        {description && <p className="mt-1 text-sm text-[#6B5E55]">{description}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
