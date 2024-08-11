'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CustomImg, Skeleton, CartBtn, WishlistBtn, OrderNowBtn } from '@/components';
import { useRouter } from '@/navigation';
import { ROUTES_PATH, formatNumber, generateOrderObj } from '@/utils';

export default function WishlistTable({ wishlistProducts = [], isLoading = false }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const getProductAvailability = (productStock) =>
    productStock > 0
      ? {
          isAvailable: true,
          text: t('general.in_stock'),
          color: 'text-[--completed-clr]',
        }
      : {
          isAvailable: false,
          text: t('general.out_of_stock'),
          color: 'text-rose-500',
        };

  return (
    <section className='rounded-md border'>
      <table id='reponsive-table' className='w-full  text-xs sm:text-sm'>
        <thead className='border-b  text-sm font-medium'>
          <tr className=''>
            <th scope='col' className='py-3 pl-6'></th>
            <th scope='col' className='inline-block px-6 py-3 text-start '>
              {t('general.products')}
            </th>
            <th scope='col' className='px-6 py-3'>
              {t('general.stock_status')}
            </th>
            <th scope='col' className='px-6 py-3'>
              {t('general.price')}
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        {isLoading ? (
          <Skeleton.WishlistRows />
        ) : (
          <tbody className=''>
            {wishlistProducts?.map((product, index) => (
              <tr key={product.id} className='border-b last:border-0 sm:border-0' scope='row'>
                <td className=''>
                  <button className='flex h-12 w-full  items-center justify-end px-5  sm:h-full sm:p-0'>
                    <WishlistBtn productData={product} />
                  </button>
                </td>
                <td className='px-6 py-4 text-center'>
                  <figure className='flex flex-col items-center   gap-3 sm:flex-row'>
                    <CustomImg
                      onClick={() => router.push(`${ROUTES_PATH.website.products}/${product?.id}/${encodeURIComponent(product[`name_${locale}`])}`)}
                      className='h-[75px] w-[75px] cursor-pointer rounded-md bg-gray-200 object-cover'
                      src={product?.images?.[0]?.image}
                      width={75}
                      height={75}
                      alt={product?.name_en}
                    />
                    <figcaption className='max-w-[183px] text-xs font-medium sm:text-sm '>{product?.[`name_${locale}`]}</figcaption>
                  </figure>
                </td>
                <td className='whitespace-nowrap px-6  py-4 text-center'>
                  <p className={getProductAvailability(product?.stock).color}>{getProductAvailability(product?.stock).text}</p>
                </td>
                <td className='px-6 py-4 text-center'>
                  <article className='flex  items-stretch justify-center gap-3'>
                    {product.discount != 0 && <span className='text-sm text-[--gray-text-clr] line-through'>${formatNumber(product?.basic_price)}</span>}
                    <span className='text-sm font-semibold'>${formatNumber(product?.price)}</span>
                  </article>
                </td>
                <td className='px-6 py-4 text-center'>
                  <article className='flex w-full items-stretch gap-4'>
                    <button disabled={!getProductAvailability(product?.stock).isAvailable} className='h-full flex-1 rounded-md  bg-[--main-clr] p-4 text-white'>
                      <OrderNowBtn
                        orders={[
                          generateOrderObj({
                            id: product?.id,
                            name: { ar: product?.name_ar, en: product?.name_en },
                            image: product?.images?.[0]?.image,
                            quantity: 1,
                            price: product?.price,
                          }),
                        ]}
                      />
                    </button>
                    <button disabled={!getProductAvailability(product?.stock).isAvailable} className='w-14 rounded-md bg-[--sec-bg]  transition-colors duration-300 focus:bg-red-500'>
                      <CartBtn isAvailable={getProductAvailability(product?.stock).isAvailable} productId={product.id} productQuantity={1} />
                    </button>
                  </article>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  );
}
