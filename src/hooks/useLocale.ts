import { defaultLocale, LOCALE_COOKIE_NAME } from '@/plugins/i18n';
import { getCookie } from 'cookies-next';
type Locale = 'ar' | 'en'; // Define known locales here
type Return = {
  locale: Locale;
  isRTL: boolean;
};
export default function useLocale(): Return {
  const locale = (getCookie(LOCALE_COOKIE_NAME) as Locale) || defaultLocale;
  return { locale, isRTL: locale === 'ar' };
}