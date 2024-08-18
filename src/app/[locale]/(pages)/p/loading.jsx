import React from 'react';
import * as Icon from '@/assets/icons';

export default function loading() {
  return (
    <div className='relative h-full'>
      <div className='absolute z-10 grid h-full w-full place-items-center bg-gray-100/10	 backdrop-blur-[2px]'>
        <Icon.Spinner />
      </div>
    </div>
  );
}
