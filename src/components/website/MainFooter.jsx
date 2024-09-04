'use client';
import React, { useMemo } from 'react';
import Image from 'next/image';
import * as Icons from '@/assets/icons';
import { ROUTES_PATH } from '@/utils';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useLocale from '@/hooks/useLocale';

export default function MainFooter() {
  const layoutData = useSelector((state) => state.layout.layoutData);

  const { locale } = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const pages = useMemo(() => [
    {
      title: t('general.home'),
      path: ROUTES_PATH.website.home,
    },
    { title: 'about_us', path: ROUTES_PATH.website.aboutUs },
    { title: 'contact_us', path: ROUTES_PATH.website.contactUs },
    { title: 'privacy_policy', path: ROUTES_PATH.website.privacyPolicy },
    { title: 'terms_of_service', path: ROUTES_PATH.website.termsOfService },
  ]);
  const socialMedia = useMemo(() =>
    [
      { icon: <Icons.Facebook />, url: layoutData?.social_media?.facebook },
      { icon: <Icons.TwitterX />, url: layoutData?.social_media?.twitter },
      { icon: <Icons.Discord />, url: layoutData?.social_media?.discord },
      { icon: <Icons.Instagram />, url: layoutData?.social_media?.instagram },
    ].filter((item) => item?.url)
  );
  return (
    <footer className='responsive-text app-container flex min-h-[--main-footer-height] flex-col items-center  bg-[--sec-bg] pt-10 text-white  '>
      <Image
        className='mx-auto mb-3'
        src={layoutData?.style?.logo || '/assets/images/main-footer-logo.png'}
        width={109}
        height={60}
        alt='Picture of the author'
      />
      <section className='mb-6 text-center'>{layoutData?.footer?.[`footer_${locale}`]}</section>
      <section className='mb-4 flex min-w-40 items-center justify-between'>
        {socialMedia.map((item, index) => (
          <button key={index} onClick={() => window.open(item?.url, '_blank')}>
            {item.icon}
          </button>
        ))}
      </section>
      <section className='flex  flex-wrap items-center  justify-center gap-2 pb-8 sm:min-w-[538px] sm:justify-between'>
        {pages.map((page, index) => (
          <Link key={index} href={page.path} className={`${pathname == page.path ? 'text-red-600' : ''}`}>
            {page.title}
          </Link>
        ))}
      </section>
      <section className='flex w-full flex-wrap items-center justify-center gap-2 border-t-2 border-gray-400 py-8  sm:min-w-[538px] sm:justify-between '>
        <p className='flex items-center gap-1'>
          <Icons.Phone /> {layoutData?.contacts?.phone}
        </p>
        <p className='text-center'>{'website.footer.rights'}</p>
        <p className='flex items-center gap-1'>
          <Icons.Email />
          {layoutData?.contacts?.email}
        </p>
      </section>
    </footer>
  );
}
