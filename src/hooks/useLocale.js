import { defaultLocale, LOCALE_COOKIE_NAME } from '@/plugins/i18n';
import React, { useEffect, useMemo, useState } from 'react';
import { getCookie } from 'cookies-next';

export default function useLocale() {
  const currentLocale = getCookie(LOCALE_COOKIE_NAME);
  useEffect(() => {
    console.log('currentLocale', currentLocale);
  }, []);

  return currentLocale;
}
