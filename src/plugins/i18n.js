import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { getCookies } from '@/utils/cookies-action';

// Can be imported from a shared config
export const locales = ['en', 'ar'];
export const localeNames = {
  en: 'English',
  ar: 'العربية (Arabic)',
};
// Used when no locale matchesrouter
export const defaultLocale = 'en';
export const localePrefix = 'never'; //never to hide prefix in url ||always to put prefix always in url ||"as-needed" to remove prefix from url in case that current lang is  deafult lang
//below extra details when switch between two local it will hide it form url
export const localeDetection = true; //true; enable locale detection based on the accept-language header and a potentially existing cookie value from a previous visit. ||false; This will disable locale detection based on the accept-language header and a potentially existing cookie value from a previous visit.
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export default getRequestConfig(async () => {
  // Validate that the incoming `locale` parameter is valid
  const locale = (await getCookies(LOCALE_COOKIE_NAME)) || defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
