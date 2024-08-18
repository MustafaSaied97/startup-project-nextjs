import React from 'react';
import * as Icons from '@/assets/icons';

export default function loading() {
  return (
    <div className='text  py-9 text-[10px] font-bold text-blue-700'>
      <Icons.Spinner />
    </div>
  );
}
