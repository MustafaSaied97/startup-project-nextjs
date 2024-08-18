'use client';
import React, { useMemo } from 'react';
import Image from 'next/image';
import * as Icon from '@/assets/icons';
import { Link, usePathname } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ROUTES_PATH } from '@/utils';
import { useSelector } from 'react-redux';
export default function MainFooter() {
  const layoutData = useSelector((state) => state.layout.layoutData);
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const pages = useMemo(() => [
    { title: t('general.home'), path: ROUTES_PATH.website.home },
    { title: t('general.about_us'), path: ROUTES_PATH.website.aboutUs },
    { title: t('general.contact_us'), path: ROUTES_PATH.website.contactUs },
    { title: t('general.privacy_policy'), path: ROUTES_PATH.website.privacyPolicy },
    { title: t('general.terms_of_service'), path: ROUTES_PATH.website.termsOfService },
  ]);
  const socialMedia = useMemo(() =>
    [
      { icon: <Icon.Facebook />, url: layoutData?.social_media?.facebook },
      { icon: <Icon.TwitterX />, url: layoutData?.social_media?.twitter },
      { icon: <Icon.Discord />, url: layoutData?.social_media?.discord },
      { icon: <Icon.Instagram />, url: layoutData?.social_media?.instagram },
    ].filter((item) => item?.url)
  );
  return (
    <footer className='responsive-text app-container flex min-h-[--main-footer-height] flex-col items-center  bg-[--sec-bg] pt-10 text-white  '>
      <Image className='mx-auto mb-3' src={layoutData?.style?.logo || '/assets/images/main-footer-logo.png'} width={109} height={60} alt='Picture of the author' />
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
          <Icon.Phone /> {layoutData?.contacts?.phone}
        </p>
        <p className='text-center'>{t('website.footer.rights', { website_name: layoutData?.meta?.[`meta_title_${locale}`] })}</p>
        <p className='flex items-center gap-1'>
          <Icon.Email />
          {layoutData?.contacts?.email}
        </p>
      </section>
    </footer>
  );
}
