import '@/assets/styles/global.scss';
import { Inter } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import StoreProvider from '@/providers/StoreProvider';
import LayoutProvider from '@/providers/LayoutProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from '@/components';
import { apis } from '@/services/serverApis';
import { cookies } from 'next/headers';

export async function generateMetadata({}) {
  const { data: layoutData } = (await apis.getLayout()) || {};
  const locale = await getLocale();
  const slogan = layoutData?.style?.[`slogan_${locale}`];
  const metaTitle = layoutData?.meta?.[`meta_title_${locale}`];
  const metaDescription = layoutData?.meta?.[`meta_description_${locale}`];
  const metaKeywords = layoutData?.meta?.meta_keywords;
  const ogImage = layoutData?.style?.logo || '/assets/images/main-logo-light.png';
  const logo = layoutData?.style?.logo;

  return {
    title: slogan,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: slogan, url: '' }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      images: [ogImage],
      locale: locale,
      site_name: 'Market-Bff',
      url: 'https://market-bff.hmaserv.online',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    icons: {
      icon: [
        {
          media: '(prefers-color-scheme: light)',
          url: logo || '/assets/images/main-logo-light.png',
          href: logo || '/assets/images/main-logo-light.png',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: logo || '/assets/images/main-logo-dark.png',
          href: logo || '/assets/images/main-logo-dark.png',
        },
      ],
    },
  };
}

const inter = Inter({
  subsets: ['latin'],
  fallback: ['Arial', 'Times New Roman'],
  weight: 'variable',
});

export default async function Layout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const serverTheme = cookies().get('theme')?.value || 'light';
  const { data: layoutData } = (await apis.getLayout()) || {};

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} data-theme={serverTheme}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <ToastContainer />
            <ScrollToTop />
            <LayoutProvider layoutData={layoutData}>{children}</LayoutProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
