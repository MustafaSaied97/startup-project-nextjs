import React from 'react';
import DefaultWebsiteLayout from '@/components/layouts/DefaultWebsiteLayout';
import { websiteApis, panelApis } from '@/services/serverApis';
import Script from 'next/script';

export async function generateMetadata({ params: { locale } }) {
  const { data: layoutData } = (await websiteApis.getLayout()) || {};

  const { meta_title_en, meta_title_ar, meta_description_en, meta_description_ar, meta_keywords } = layoutData?.meta || {};
  const metaTitle = locale == 'en' ? meta_title_en : meta_title_ar;
  const metaDescription = locale == 'en' ? meta_description_en : meta_description_ar;

  const ogImage = layoutData?.style?.logo || '/assets/icons/main-logo-light.png';
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
}

export default async function UserLayout({ children }) {
  return <DefaultWebsiteLayout>{children}</DefaultWebsiteLayout>;
}
