'use client';

import React, { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ROUTES_PATH, formatNumber } from '@/utils';
import { CartBtn, WishlistBtn, CustomImg } from '@/components';
import { Link, useRouter } from '@/navigation';
import ReactStars from 'react-rating-stars-component';
import { FilledStar, HalfStar, EmptyStar } from '@/assets/icons/components';
export default function ProductItem({ product = {}, widthContainerClass = 'w-[190px] md:w-[237px]' }) {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const formattedReviews = useMemo(() => {
    return product?.ratings_count >= 100 ? '99+' : product?.ratings_count;
  }, [product.ratings_count]);

  const discountPercentage = useMemo(() => (product?.discount ? parseFloat(product.discount) : 0), [product.discount]);
  const isAvailable = useMemo(() => product.stock > 0, [product.stock]);
  return (
    <div
      id='productItem'
      className={`${widthContainerClass} block h-full w-[190px]  rounded-[25px_8px] bg-[--tr-bg] p-2 pb-4  shadow-md  dark:shadow-gray-400/30 sm:rounded-[45px_15px] md:max-h-[283px] md:w-[237px] rtl:rounded-[8px_25px] rtl:sm:rounded-[15px_45px]  `}
    >
      <picture className='relative block h-[130px] w-full overflow-hidden rounded-[25px_8px] bg-neutral-200 sm:rounded-[45px_20px] md:h-[194px] rtl:rounded-[8px_25px]  rtl:sm:rounded-[20px_45px]'>
        <CustomImg
          onClick={() => router.push(`${ROUTES_PATH.website.products}/${product?.id}/${encodeURIComponent(product[`name_${locale}`])}`)}
          className='h-full w-full object-cover transition-transform duration-200 hover:scale-110'
          priority={false}
          src={product?.images[0]?.image}
          width={6000}
          height={100}
          alt='text'
        />
        <span className='absolute end-2 top-2  grid h-7 w-7 place-items-center rounded-full bg-[--tr-bg] shadow-md '>
          <WishlistBtn productData={product} />
        </span>
        <button
          disabled={!isAvailable}
          className='repeat-1 group absolute bottom-2  start-2  grid h-9 w-9 place-items-center rounded-full bg-[#373737] shadow-md transition-colors	duration-300 ease-in-out focus:bg-red-500 '
        >
          <CartBtn isAvailable={isAvailable} productId={product.id} productQuantity={1} />
        </button>
      </picture>
      <section>
        <h1 className='mt-2 min-h-[14px]   overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal leading-[14px] text-[--pr-text] '>{product?.[`name_${locale}`]}</h1>
        <article className='mt-1 flex items-center gap-1'>
          {/* stars */}
          <div className=''>
            <ReactStars
              value={product?.ratings_avg}
              onChange={ratingChanged}
              isHalf={false}
              edit={false}
              count={5}
              size={15}
              activeColor='#FCD635'
              filledIcon={<FilledStar />}
              halfIcon={<HalfStar />}
              emptyIcon={<EmptyStar />}
            />
          </div>
          {/* Reviews */}
          {formattedReviews != 0 && (
            <div className='    overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal leading-3 text-zinc-400'>
              ({formattedReviews} <span className='hidden sm:inline'>{t('general.reviews')}</span>)
            </div>
          )}
        </article>
        <article className='mt-1 flex items-center justify-start gap-2'>
          {/* price after discount */}
          <p title={product?.price} className='text-sm font-medium  leading-[18px] text-[--pr-text]  sm:text-lg'>
            ${formatNumber(product?.price)}
          </p>
          {/* price before discount  and discount */}
          {discountPercentage != 0 && (
            <div className='inline-flex items-start justify-start gap-1'>
              <div title={product?.basic_price} className='text-[clamp(.5rem,_100%,_0.875rem)] text-xs font-normal leading-3 text-zinc-400 line-through'>
                {formatNumber(product?.basic_price)}
              </div>
              <div className='text-xs font-normal leading-3 text-rose-600'>- {discountPercentage}%</div>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
