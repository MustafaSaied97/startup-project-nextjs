'use client';
import React from 'react';
import { useController } from 'react-hook-form';
import * as Icons from '@/assets/icons';
import FieldErrorMsg from './FieldErrorMsg';

export default function ColorPickerWithPreview({ label, control, name = 'color', rules = {} }) {
  const {
    field,
    formState: { errors },
  } = useController({ control, name, rules });
  console.log('errors', errors);
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
      {errors?.[name] && <FieldErrorMsg message={errors?.[name].message} />}
    </fieldset>
  );
}
