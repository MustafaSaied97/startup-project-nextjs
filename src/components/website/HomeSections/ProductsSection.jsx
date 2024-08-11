'use client';

import React, { memo } from 'react';
import { ProductItem, CustomItemsSlider } from '@/components';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';

const ProductsSection = memo(function ProductsSection({ title = '', url = '', products = [] }) {
  const t = useTranslations();
  const router = useRouter();
  const handleClickViewMore = () => {
    router.push(url);
  };
  return (
    <section className='flex flex-col '>
      <div className='app-container flex w-full items-center justify-between'>
        <h1 className='relative text-lg font-semibold text-black dark:text-white sm:text-xl md:text-[32px]'>
          {title}
          <p className=' absolute bottom-0   w-[54px] rounded-sm border border-rose-600 sm:-bottom-2 sm:border-2'></p>
        </h1>
        <button
          onClick={handleClickViewMore}
          className='rounded-md border border-rose-600 px-2 py-1 text-sm font-semibold  text-rose-600 hover:border-gray-300 hover:shadow-lg  dark:shadow-gray-200/20 sm:px-4 sm:py-2 sm:text-base'
        >
          {t('general.view_all')}
        </button>
      </div>
      <div className='app-container-slider group my-7 w-full cursor-pointer'>
        <CustomItemsSlider id={title}>
          {products?.map((product, index) => {
            return (
              <li key={product?.id || index} className='mx-2 h-full w-fit list-none '>
                <ProductItem product={product} />
              </li>
            );
          })}
        </CustomItemsSlider>
      </div>
    </section>
  );
});
export default ProductsSection;
