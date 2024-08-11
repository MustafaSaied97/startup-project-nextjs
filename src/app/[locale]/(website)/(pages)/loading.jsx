import React from 'react';
import { SpinnerIcon } from '@/assets/icons/components';
import { Skeleton } from '@/components';

export default function loading() {
  return (
    <div className='text  py-9 text-[10px] font-bold text-blue-700'>
      <Skeleton.HomeOffers />
      <Skeleton.HomeSections />
    </div>
  );
}
