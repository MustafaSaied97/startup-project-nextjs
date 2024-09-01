'use client';
import React, { useEffect, useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode, Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useLocale from '@/hooks/useLocale';

export default function Slider() {
  const locale = useLocale();
  const items = [
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
    { name: 'item' },
  ];

  const [swiperInstance, setSwiperInstance] = useState();
  const [activeIndex, setActiveIndex] = useState();


  return (
    <div className='relative flex h-28 justify-center'>
      <button
        onClick={() => swiperInstance?.slideNext()}
        aria-label='Next slide'
        className='absolute end-0 z-40 grid h-full cursor-pointer place-items-center'
      >
        next
      </button>
      <button
        onClick={() => swiperInstance?.slidePrev()}
        aria-label='Previous slide'
        className='absolute start-0 z-40 grid h-full cursor-pointer place-items-center'
      >
        prev
      </button>
      <section className='absolute bottom-1 z-40 flex h-fit w-full cursor-pointer justify-center gap-3'>
        {swiperInstance?.slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => {
              swiperInstance?.slideTo(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-4 w-4 rounded-full border ${activeIndex === index ? 'bg-gray-400/20' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </section>

      <Swiper
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        centeredSlides={false}
        initialSlide={1}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        modules={[
          FreeMode,
          //Pagination,
          Autoplay,
          Navigation,
        ]}
        className='mySwiper'
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='h-full w-full border border-rose-400 text-center'>Slide {index + 1}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
