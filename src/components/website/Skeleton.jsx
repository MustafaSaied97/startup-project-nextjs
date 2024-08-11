import React from 'react';
import { WishlistBtn } from '@/components';
import { DeleteCartIcon } from '@/assets/icons/components';

const Skeleton = {
  ProductItem: () => {
    return (
      <div
        id='productItem-skeleton'
        className=' h-fit min-w-[180px] animate-pulse rounded-[25px_8px] bg-gray-200/30 p-2 pb-4 shadow-md sm:rounded-[45px_15px] md:max-h-[283px] md:min-w-[237px] rtl:rounded-[8px_25px] rtl:sm:rounded-[15px_45px]  '
      >
        <section className=' relative h-[130px] w-full overflow-hidden rounded-[25px_8px] bg-gray-300/30  sm:rounded-[45px_20px] md:h-[194px] rtl:rounded-[8px_25px]  rtl:sm:rounded-[20px_45px]'>
          <button className='absolute end-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-gray-200/20 shadow-md '></button>
          <button className='repeat-1  group absolute  bottom-2 start-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-gray-400/30 shadow-md ease-in-out	 '></button>
        </section>
        <section className='mt-1 flex h-[35px] sm:h-[60px] md:h-[50px]'></section>
      </div>
    );
  },

  HomeSections: ({ items = 2 }) => {
    return Array(items)
      .fill(null)
      .map((_, i) => (
        <section key={i} className='Skeleton   mt-9  flex flex-col gap-7'>
          <section className=' flex  flex-col '>
            <div className='app-container flex w-full items-center justify-between'>
              <h1 className='relative h-3 w-[100px] animate-pulse rounded-sm bg-gray-400/30 font-semibold  sm:h-6 sm:w-[200px] md:w-[200px]'>
                <p className=' sm:border-3 absolute -bottom-2   w-[54px] rounded-sm border  border-gray-600/30 sm:-bottom-2'></p>
              </h1>
              <button className='h-[30px] w-[70px] animate-pulse  rounded-md bg-gray-400/30 sm:h-[45px] sm:w-[100px] '></button>
            </div>
            <div className=' app-container-slider w-full'>
              <ul className='flex cursor-pointer flex-nowrap items-center gap-2 overflow-hidden py-7'>
                {Array(6)
                  .fill(null)
                  .map((_, index) => {
                    return <Skeleton.ProductItem key={index} />;
                  })}
              </ul>
            </div>
          </section>
        </section>
      ));
  },

  HomeOffers: () => {
    return (
      <section className='Skeleton app-container'>
        <div className=' h-[150px]  animate-pulse bg-gray-400/30 sm:h-[170px] md:h-[443px]'></div>
      </section>
    );
  },
  Text: () => {
    return (
      <section className='flex flex-col gap-4'>
        <div className='h-5 w-1/2 animate-pulse rounded bg-gray-300'></div>
        <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
        <div className='h-5 w-2/3 animate-pulse rounded bg-gray-300'></div>
        <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
        <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
        <div className='h-5 w-1/2 animate-pulse rounded bg-gray-300'></div>
      </section>
    );
  },
  AboutUs: () => {
    return (
      <section className='Skeleton app-container-full'>
        <div className=' h-[150px]  animate-pulse bg-gray-400/30 sm:h-[170px] md:h-[443px]'></div>
        <section className='app-container my-9 flex flex-col gap-4'>
          <div className='h-5 w-1/2 animate-pulse rounded bg-gray-300'></div>
          <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
          <div className='h-5 w-2/3 animate-pulse rounded bg-gray-300'></div>
          <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
          <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
          <div className='h-5 w-1/2 animate-pulse rounded bg-gray-300'></div>
        </section>
      </section>
    );
  },
  ReviewCards: ({ items = 1 }) => {
    return Array(items)
      .fill(null)
      .map((_, i) => (
        <section key={i} className='flex items-start justify-start gap-2 border-b pb-3 last-of-type:border-none'>
          <picture className='grid h-12 w-12 animate-pulse  place-items-center rounded-full bg-gray-300 '></picture>
          <article className='flex flex-1 flex-col justify-between gap-3'>
            <h1 className='w- h-3 w-2/6 animate-pulse rounded bg-gray-300 sm:w-3/12'></h1>
            <p className='h-2 w-1/6 animate-pulse rounded bg-gray-300 sm:w-2/12'></p>
            <p className='h-2 w-3/6 animate-pulse rounded bg-gray-300 sm:w-5/12'></p>
          </article>
        </section>
      ));
  },
  ProductTabs: () => {
    return (
      <section className='rounded-md border'>
        <ul className='-mb-px flex h-[52px] items-center justify-start gap-x-8 border-b border-gray-200 px-2 text-center  text-base font-medium sm:gap-x-12  sm:px-4 sm:text-lg '>
          <li className='h-full  w-20 animate-pulse bg-gray-400/30 sm:w-32'></li>
          <li className='h-full  w-20 animate-pulse bg-gray-400/30 sm:w-32'></li>
        </ul>
        <article className='flex flex-col gap-4 p-3 sm:p-6'>
          {/* <Skeleton.Text /> */}
          <Skeleton.ReviewCards items={3} />
        </article>
      </section>
    );
  },
  ProductDetails: () => {
    return (
      <section className='flex w-full flex-1 animate-pulse flex-col gap-6'>
        <Skeleton.Text />

        <article className='mt-3 flex h-14  items-end gap-1'>
          <div className='flex h-full w-[100px] animate-pulse items-center justify-around gap-2 rounded-md  bg-gray-400/30 px-1 py-4 sm:w-[124px]  '></div>
          <button className='h-full flex-1 animate-pulse rounded-md   bg-gray-400/30 p-4 text-white'></button>
          <button className='h-14 w-14 animate-pulse rounded-md  bg-gray-400/30  transition-colors duration-300 focus:bg-red-500'></button>
        </article>
      </section>
    );
  },
  ProductCarousel: () => {
    return (
      <section className='flex h-full w-full justify-between gap-2   sm:gap-3 lg:w-fit '>
        <div className=' flex h-full w-[75px] flex-col items-center  justify-center  sm:w-[100px] lg:w-[148px]   '>
          <picture className=' mb-[5px] block h-[80px] w-full animate-pulse bg-gray-400/30 p-0   sm:h-[150px]'></picture>
          <picture className=' mb-[5px] block h-[80px] w-full animate-pulse bg-gray-400/30 p-0   sm:h-[150px]'></picture>
          <picture className=' mb-[5px] block h-[80px] w-full animate-pulse bg-gray-400/30 p-0   sm:h-[150px]'></picture>
        </div>
        <div className='slider-container group h-[255px] flex-1 animate-pulse bg-gray-400/30 sm:h-[460px] lg:w-[450px] lg:flex-auto'></div>
      </section>
    );
  },
  Breadcrumb: ({ items = 4 }) => {
    return (
      <div className='flex flex-wrap items-center justify-start gap-2 text-xs font-medium text-[--gray-text-clr] sm:text-sm  lg:text-base'>
        {Array(items)
          .fill(null)
          .map((_, i) => (
            <React.Fragment key={i}>
              {/* text */}
              <a className='h-4 w-14 animate-pulse  rounded-md bg-gray-400/30 last-of-type:text-[--main-clr] dark:hover:text-white'></a>
              {/* separator element */}
              <p className='last-of-type:hidden'>/</p>
            </React.Fragment>
          ))}
      </div>
    );
  },
  WishlistRows: ({ items = 2 }) => {
    return (
      <tbody className=''>
        {Array(items)
          .fill(null)
          .map((_, i) => (
            <tr key={i} className='border-b last:border-0 sm:border-0' scope='row'>
              <td className=''>
                <button disabled className='flex h-12 w-full  items-center justify-end px-5  sm:h-full sm:p-0'>
                  <WishlistBtn />
                </button>
              </td>
              <td className='px-6 py-4 text-center'>
                <figure className='flex flex-col items-center   gap-3 sm:flex-row'>
                  <div className='skeleton h-[75px] w-[75px] cursor-pointer rounded-md '></div>
                  <figcaption className='skeleton h-3  w-16 rounded-md   '></figcaption>
                </figure>
              </td>
              <td className='whitespace-nowrap px-6  py-4 text-center'>
                <p className='skeleton mx-auto  h-7 w-14 rounded-md '></p>
              </td>
              <td className='px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-3 w-10 rounded-md '></span>
                </article>
              </td>
              <td className='px-6 py-4 text-center'>
                <article className='flex w-full items-stretch gap-4'>
                  <button className='skeleton  sm:min-w h-[52px] flex-1 rounded-md   p-4 '></button>
                  <button className='skeleton h-[52px] w-14 rounded-md'></button>
                </article>
              </td>
            </tr>
          ))}
      </tbody>
    );
  },
  CarttRows: ({ items = 2 }) => {
    return (
      <tbody className=''>
        {Array(items)
          .fill(null)
          .map((_, i) => (
            <tr key={i} className='border-b last:border-0 sm:border-0' scope='row'>
              <td className=''>
                <button disabled className='flex h-12 w-full  items-center justify-end px-5  sm:h-full sm:p-0'>
                  <DeleteCartIcon />
                </button>
              </td>
              <td className='px-6 py-4 text-center'>
                <figure className='flex flex-col items-center   gap-3 sm:flex-row'>
                  <div className='skeleton h-[75px] w-[75px] cursor-pointer rounded-md '></div>
                  <figcaption className='skeleton h-3  w-16 rounded-md   '></figcaption>
                </figure>
              </td>
              <td className='whitespace-nowrap px-6  py-4 text-center'>
                <p className='skeleton mx-auto h-7  w-14 rounded-md '></p>
              </td>
              <td className='px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-3 w-10 rounded-md '></span>
                </article>
              </td>
              <td className='px-6 py-4 text-center'>
                <article className='flex w-full items-stretch gap-4'>
                  <button className='skeleton mx-auto  h-[52px] w-[100px]  rounded-md   p-4 '></button>
                </article>
              </td>
              <td className='px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-3 w-10 rounded-md '></span>
                </article>
              </td>
            </tr>
          ))}
      </tbody>
    );
  },
  TableRows: ({ items = 2 }) => {
    return (
      <tbody className=''>
        {Array(items)
          .fill(null)
          .map((_, i) => (
            <tr key={i} className='border-b last:border-0 sm:border-0' scope='row'>
              <td className='table-lable px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-4 w-10 rounded-md '></span>
                </article>
              </td>
              <td className='table-lable px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-4 w-16 rounded-md '></span>
                </article>
              </td>
              <td className='table-lable px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-4 w-16 rounded-md '></span>
                </article>
              </td>
              <td className='table-lable px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-4 w-16 rounded-md '></span>
                </article>
              </td>
              <td className='table-lable px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-4 w-6 rounded-md '></span>
                </article>
              </td>
              <td className='table-lable px-6 py-4 text-center'>
                <article className='flex  items-stretch justify-center gap-3'>
                  <span className='skeleton h-4 w-[139px] rounded-md '></span>
                </article>
              </td>
            </tr>
          ))}
      </tbody>
    );
  },
  GeneralTableRows: ({ items = 2, className='h-14' }) => {
    return (
      <tbody className=''>
        {Array(items)
          .fill(null)
          .map((_, i) => (
            <tr key={i} className={` skeleton  text-base shadow-lg last:border-0 sm:border-0 [&>*]:px-4 [&>*]:py-4 ${className}`} scope='row'>
              <td className='rounded-lg '></td>
            </tr>
          ))}
      </tbody>
    );
  },
};

export default Skeleton;
