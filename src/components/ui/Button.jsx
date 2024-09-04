'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function Button({ type = 'button', text, disabled, isProcessing, onClick, className, ...props }) {
  const t = useTranslations();

  return (
    <button
      disabled={disabled || isProcessing}
      className={`h-14 w-full rounded-lg bg-[var(--primary-clr)] text-center text-white ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {isProcessing ? t('general.is_processing') : text}
    </button>
  );
}
