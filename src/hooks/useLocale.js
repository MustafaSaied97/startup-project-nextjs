import { defaultLocale, LOCALE_COOKIE_NAME } from '@/plugins/i18n';
import { getCookie } from 'cookies-next';

export default function useLocale() {
  const locale = getCookie(LOCALE_COOKIE_NAME) || defaultLocale;
  return { locale, isRTL: locale == 'ar' };
}
