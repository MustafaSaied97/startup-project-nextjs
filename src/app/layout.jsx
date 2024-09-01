import '@/assets/styles/global.scss';
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  fallback: ['Arial', 'Times New Roman'],
  weight: ['400', '500', '600', '700', '800'],
});

import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import StoreProvider from '@/providers/StoreProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import LayoutProvider from '@/providers/LayoutProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from '@/components';
import { apis } from '@/services/serverApis';

// export async function generateMetadata({ }) {
//   const { data: layoutData } = (await apis.getLayout()) || {};

//   const { meta_title_en, meta_title_ar, meta_description_en, meta_description_ar, meta_keywords } = layoutData?.meta || {};
//   const metaTitle = locale == 'en' ? meta_title_en : meta_title_ar;
//   const metaDescription = locale == 'en' ? meta_description_en : meta_description_ar;

//   const ogImage = layoutData?.style?.logo || '/assets/images/main-logo-light.png';
//   const logo = layoutData?.style?.logo;

//   return {
//     title: metaTitle,
//     description: metaDescription,
//     keywords: meta_keywords,
//     // authors: [ { name: 'market bff', url: '' }],
//     openGraph: {
//       title: metaTitle,
//       description: metaDescription,
//       type: 'website',
//       images: [ogImage],
//       locale: locale,
//       site_name: 'Market-Bff',
//       url: 'https://market-bff.hmaserv.online',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: metaTitle,
//       description: metaDescription,
//       images: [ogImage],
//     },
//     icons: {
//       icon: logo
//         ? [
//             {
//               media: '(prefers-color-scheme: light)',
//               url: logo,
//               href: logo,
//             },
//             {
//               media: '(prefers-color-scheme: dark)',
//               url: logo,
//               href: logo,
//             },
//           ]
//         : [
//             {
//               media: '(prefers-color-scheme: light)',
//               url: '/assets/images/main-logo-light.png',
//               href: '/assets/images/main-logo-light.png',
//             },
//             {
//               media: '(prefers-color-scheme: dark)',
//               url: '/assets/images/main-logo-dark.png',
//               href: '/assets/images/main-logo-dark.png',
//             },
//           ],
//     },
//   };
// }

// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'ar' }];
// }

export default async function Layout({ children, repo }) {
  let locale = '';
  let messages = '';
  try {
    locale = await getLocale();
    messages = await getMessages();
  } catch (err) {
    console.log('err=======>', err);
  }

  const { data: layoutData } = (await apis.getLayout()) || {};

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={` `}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <ThemeProvider>
              <ToastContainer />
              <ScrollToTop />
              <LayoutProvider layoutData={layoutData}>{children}</LayoutProvider>
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
