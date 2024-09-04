'use client';

import React from 'react';
import * as Icons from '@/assets/icons';

export default function FieldErrorMsg({ message }) {
  return (
    <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
      <Icons.Danger />
      {message}
    </p>
  );
}
