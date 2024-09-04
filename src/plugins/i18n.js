import { getRequestConfig } from 'next-intl/server';
import { getCookies } from '@/utils/cookies-action';

export const locales = ['en', 'ar'];
export const localeNames = {
  en: 'English',
  ar: 'العربية (Arabic)',
};
export const defaultLocale = 'en';
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export default getRequestConfig(async () => {
  // Validate that the incoming `locale` parameter is valid
  const locale = (await getCookies(LOCALE_COOKIE_NAME)) || defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
