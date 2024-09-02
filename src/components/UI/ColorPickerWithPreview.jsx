'use client';
import React from 'react';
import { useController } from 'react-hook-form';
import * as Icons from '@/assets/icons';

export default function ColorPickerWithPreview({ label, control, name = 'color', rules = {} }) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  return (
    <fieldset>
      {label && (
        <label className='text-base font-medium ' htmlFor={field.name}>
          {label}
        </label>
      )}
      <div className='relative mt-2 flex items-center justify-between gap-2'>
        <label className='relative cursor-pointer' htmlFor={field.name}>
          <Icons.ColorPalette />
          <input {...field} type='color' id={field.name} name={field.name} className={`invisible absolute bg-transparent`} />
        </label>
        {field?.value && <input type='color' value={field?.value} disabled className={`block h-9 w-9 `} />}
      </div>
      {/* for errors */}
      {error && (
        <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
          <Icons.Danger />
          {error?.message}
        </p>
      )}
    </fieldset>
  );
}
