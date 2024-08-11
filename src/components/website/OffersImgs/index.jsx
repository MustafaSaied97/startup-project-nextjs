'use client';
import React, { useMemo, lazy } from 'react';
import Slider from 'react-slick';
// const Slider = lazy(() => import('react-slick'));
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImgCarousel.scss';
import Image from 'next/image';
import { ArrowIcon, DoubleArrowsIcon, Shape1Icon, Shape2Icon } from '@/assets/icons/components';
import { useLocale } from 'next-intl';

export default function ImgCarousel({ offers = [] }) {
  const locale = useLocale();
  const settings = {
    adaptiveHeight: true,
    dots: true,
    speed: 500,
    fade: false,
    // rtl: locale == 'ar' ? true : false,
    // initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...(offers.length > 1 && {
      infinite: true,
      autoplay: true,
      // nextArrow: !isLoading && <CustomNextArrow />,
      // prevArrow: !isLoading && <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />,
    }),
    appendDots: DotsContainer,
    customPaging: DotItem,
  };
  const handleImgClick = (offerUrl) => {
    offerUrl && window.open(offerUrl, '_blank');
  };

  function swapIndices(arr) {
    //workaround misordering item at rtl in react-slicke library
    let formatedArr = [];
    arr.forEach((item, index) => {
      const position = index == arr.length - 1 ? index : arr.length - 2 - index;
      formatedArr[position] = item;
    });
    return formatedArr;
  }
  const formattedOffers = useMemo(() => (locale == 'ar' ? swapIndices(offers) : offers), [locale]);
  return (
    <section className='app-container relative   inset-0 mb-9'>
      <Slider {...settings}>
        {formattedOffers?.map((offer, index) => {
          return (
            <Image
              key={offer?.id}
              className='h-[150px] w-full object-cover sm:h-[170px]   md:h-[443px]'
              priority={true}
              src={offer?.image || '/assets/icons/failed-img.jpg'}
              width={3000}
              height={100}
              alt='text'
              onClick={() => handleImgClick(offer?.url)}
            />
          );
        })}
      </Slider>
    </section>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick, currentSlide, slideCount } = props;
  return (
    <div onClick={onClick} className='absolute end-0  top-0 z-10 hidden h-full cursor-pointer flex-col  justify-center md:flex'>
      <section className='group relative flex h-full items-center justify-between gap-1'>
        <div className='  z-10 grid h-full place-items-center transition-all duration-300 group-hover:translate-x-9'>
          <button className=' grid h-8 w-8 translate-x-0 -rotate-90 place-items-center rounded-full bg-gray-400/70 group-hover:bg-transparent '>
            <ArrowIcon className='block group-hover:hidden ' height={24} width={24} color='#fff' />
            <DoubleArrowsIcon className='hidden rotate-90 group-hover:block' height={12} width={12} />
          </button>
        </div>
        <div className=' h-full '>
          <Shape1Icon className='rectangle-13 block group-hover:hidden' />
          <Shape2Icon className='rectangle-13 n -z-10 hidden translate-x-1  group-hover:block' />
        </div>
      </section>
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick, currentSlide, slideCount } = props;
  return (
    <>
      <div onClick={onClick} className='absolute start-0  top-0 z-10 hidden h-full cursor-pointer flex-col  items-start justify-center md:flex'>
        <section className='group relative flex h-full items-center justify-between gap-1'>
          <div className=' h-full'>
            <Shape1Icon className='block rotate-180 group-hover:hidden ' />
            <Shape2Icon className='-z-10  hidden  -translate-x-1 rotate-180 group-hover:block' />
          </div>
          <div className='  z-10 grid h-full place-items-center transition-all duration-300 group-hover:-translate-x-9'>
            <button className=' grid h-8 w-8 translate-x-0 rotate-90 place-items-center rounded-full bg-gray-400/70 group-hover:bg-transparent '>
              <ArrowIcon className='block group-hover:hidden ' height={24} width={24} color='#fff' />
              <DoubleArrowsIcon className='hidden rotate-90 group-hover:block' height={12} width={12} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
function DotsContainer(dots) {
  return (
    <div style={{ position: 'absolute', bottom: '0px' }} className='neweaw absolute bottom-0'>
      <ul id='dots-container' className='[&>*]:group-[]:  flex justify-center gap-1 sm:gap-1 [&>*]:!m-0'>
        {dots}
      </ul>
    </div>
  );
}

function DotItem(dot) {
  return (
    <div className='h-2'>
      <p className={`dot-item  h-[3px] w-[3px] rounded-sm bg-gray-400  dark:bg-stone-950 xs:w-2 sm:w-4 `}></p>
    </div>
  );
}
