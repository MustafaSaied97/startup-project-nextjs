'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowIcon } from '@/assets/icons/components';
import { useLocale } from 'next-intl';
import { debounceFunc } from '@/utils';
import { usePathname } from '@/navigation';
import useCachedState from '@/hooks/useCashedState';

export default function CustomItemsSlider({ gap = '1', children, id = 0 }) {
  const [disablePrevArrow, setDisablePrevArrow] = useState(false);
  const [disableNextArrow, setDisableNextArrow] = useState(false);
  const customSliderRef = useRef(null);
  const locale = useLocale();
  const isRTL = useMemo(() => locale == 'ar', [locale]);
  const pathname = usePathname();

  const [sliderPosition, setSliderPosition] = useCachedState(`sliderPosition-${id}`, 0);
  const currentScrollPosition = useRef(sliderPosition||0);

  useEffect(() => {
    const slider = customSliderRef.current;
    if (!slider) return;
    slider.scrollBy({
      left: currentScrollPosition.current,
      behavior: 'auto',
    });
    checkScrollPosition();
    return () =>{
      setSliderPosition(currentScrollPosition.current);};
  }, []);
  

  const scroll = (direction) => {
    const slider = customSliderRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth / 3;
    slider.scrollBy({
      left: scrollAmount * direction,
      behavior: 'smooth',
    });
  };

  const checkScrollPosition = () => {
    const slider = customSliderRef.current;
    if (!slider) return;
    const isAtEndOfSlide = isRTL ? Math.ceil(Math.abs(slider.scrollLeft)) >= slider.scrollWidth - slider.clientWidth - 5 : slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
    const isNeedToScrollPrev = isRTL ? slider.scrollLeft >= 0 : slider.scrollLeft === 0;
    setDisablePrevArrow(isNeedToScrollPrev);
    setDisableNextArrow(isAtEndOfSlide);
    currentScrollPosition.current = slider.scrollLeft;
  };

  const onContainerScroll = () => {
    debounceFunc(() => checkScrollPosition(), 100)();
  };

  return (
    <section id='slider-container' className={`group relative  w-full ${isRTL ? 'rtl' : ''}`}>
      <ul
        id='slider'
        // onClick={() => saveHistoryState()}
        className={`no-scrollbar relative ms-0 flex h-[234px] w-full flex-nowrap overflow-x-auto py-2 md:h-[299px] gap-${gap}`}
        ref={customSliderRef}
        onScroll={onContainerScroll}
      >
        {children}
      </ul>
      {!disablePrevArrow && (
        <button className={`absolute start-0 top-0 z-20 hidden h-full cursor-pointer place-items-center   group-hover:sm:grid`} onClick={() => scroll(isRTL ? 1 : -1)}>
          <i className='rotate-90 rounded-full bg-white p-2 shadow-md rtl:-rotate-90 '>
            <ArrowIcon height={24} width={24} color='gray' />
          </i>
        </button>
      )}
      {!disableNextArrow && (
        <button className={`absolute end-0 top-0 z-20 hidden  h-full cursor-pointer  place-items-center  group-hover:sm:grid`} onClick={() => scroll(isRTL ? -1 : 1)}>
          <i className='-rotate-90 rounded-full  bg-white p-2 shadow-md rtl:rotate-90'>
            <ArrowIcon height={24} width={24} color='gray' />
          </i>
        </button>
      )}
    </section>
  );
}
