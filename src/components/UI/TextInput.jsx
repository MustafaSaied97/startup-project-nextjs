'use client';
import React from 'react';
import * as Icons from '@/assets/icons';
import { useController } from 'react-hook-form';

export default function TextInput({ control, label, name, rules, inputIcon, ...inputProps }) {
  const {
    formState: { errors },
  } = useController({ control, name });
  return (
    <fieldset>
      {label && (
        <label className='text-base font-medium ' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative mt-2'>
        <input
          {...control.register(name, rules)}
          id={name}
          name={name}
          className={`block w-full rounded-[5px]  border ${errors?.[name] ? 'border-[--main-clr]  bg-[#f11237]/5 ' : 'border-[#E6E6E6]  bg-transparent '}   p-2.5   text-[0.9rem]  outline-none focus:border-blue-500  sm:text-[.8rem]`}
          {...inputProps}
        />
        {inputIcon?.icon}
      </div>
      {/* for errors */}
      {errors?.[name] && (
        <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
          <Icons.Danger />
          {errors?.[name].message}
        </p>
      )}
    </fieldset>
  );
}
