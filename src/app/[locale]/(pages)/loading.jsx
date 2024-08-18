import React from 'react';
import * as Icon from '@/assets/icons';

export default function loading() {
  return (
    <div className='text  py-9 text-[10px] font-bold text-blue-700'>
      <Icon.Spinner />
    </div>
  );
}
