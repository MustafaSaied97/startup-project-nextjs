import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix, localeDetection, useRouter } from '@/navigation';

const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection,
  localePrefix,
});
export default handleI18nRouting;
