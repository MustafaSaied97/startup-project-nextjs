import '@/assets/styles/global.scss';
// import { Inter } from 'next/font/google';
// const inter = Inter({
//   subsets: ['latin'],
//   fallback: ['Arial', 'Times New Roman'],
//   weight: ['400', '500', '600', '700', '800'],
// });
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import StoreProvider from '@/providers/StoreProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cookies } from 'next/headers';
import { ScrollToTop } from '@/components';

export const metadata = {
  title: 'Market BFF',
  description: 'Market BFF Description',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/assets/icons/main-logo-light.png',
        href: '/assets/icons/main-logo-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/assets/icons/main-logo-dark.png',
        href: '/assets/icons/main-logo-dark.png',
      },
    ],
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function LocaleLayout({ children, params: { locale }, repo }) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={` `}>
      {/* <body className={inter.className}> */}
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <ThemeProvider>
              <ToastContainer />
              <ScrollToTop />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
