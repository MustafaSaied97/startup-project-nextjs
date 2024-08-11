import { getTranslations } from 'next-intl/server';
import React from 'react';
import { OffersImgs, HomeSections, ProductsSection, TawkChat } from '@/components';
import { websiteApis } from '@/services/serverApis';

// export const revalidate = 10 * 60;

export default async function HomePage() {
  const t = await getTranslations();
  const res = await websiteApis.getHome();

  const { data: layoutData } = (await websiteApis.getLayout()) || {};

  return (
    <>
      {/* {layoutData?.twak_script && <TawkChat tawkScript={layoutData?.twak_script} />}

      <div className='text py-9 text-[10px] font-bold text-blue-700' style={layoutData?.style?.color && { backgroundColor: layoutData.style.color }}>
        <OffersImgs offers={res?.data?.offers} />
        <ProductsSection title={t('general.best_seller')} url={`/products?sort_by=best_seller`} products={res?.data?.best_seller} />
        <ProductsSection title={t('general.latest_products')} url={`/products?sort_by=date&sort_type=desc`} products={res?.data?.latest_products} />
        <HomeSections />
      </div> */}
    </>
  );
}
