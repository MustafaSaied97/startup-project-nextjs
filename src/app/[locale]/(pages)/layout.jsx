import React from 'react';
import DefaultWebsiteLayout from '@/components/layouts/DefaultWebsiteLayout';
import { apis } from '@/services/serverApis';
import WebsiteLayoutProvider from '@/providers/WebsiteLayoutProvider';

export async function generateMetadata({ params: { locale } }) {
  const { data: layoutData } = (await apis.getLayout()) || {};

  const { meta_title_en, meta_title_ar, meta_description_en, meta_description_ar, meta_keywords } = layoutData?.meta || {};
  const metaTitle = locale == 'en' ? meta_title_en : meta_title_ar;
  const metaDescription = locale == 'en' ? meta_description_en : meta_description_ar;

  const ogImage = layoutData?.style?.logo || '/assets/images/main-logo-light.png';
  const logo = layoutData?.style?.logo;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: meta_keywords,
    // authors: [ { name: 'market bff', url: '' }],
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
      icon: logo
        ? [
            {
              media: '(prefers-color-scheme: light)',
              url: logo,
              href: logo,
            },
            {
              media: '(prefers-color-scheme: dark)',
              url: logo,
              href: logo,
            },
          ]
        : [
            {
              media: '(prefers-color-scheme: light)',
              url: '/assets/images/main-logo-light.png',
              href: '/assets/images/main-logo-light.png',
            },
            {
              media: '(prefers-color-scheme: dark)',
              url: '/assets/images/main-logo-dark.png',
              href: '/assets/images/main-logo-dark.png',
            },
          ],
    },
  };
}

export default async function UserLayout({ children }) {
  const { data: layoutData } = (await apis.getLayout()) || {}; // used in InfoBar,NavBar1,MainFooter,HomePage,SEO,DefaultFormLayout
return (
  <WebsiteLayoutProvider layoutData={layoutData}>
    <DefaultWebsiteLayout>{children}</DefaultWebsiteLayout>
  </WebsiteLayoutProvider>
);
}
