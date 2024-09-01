'use client';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import * as Icons from '@/assets/icons';

export default function Input({ control, floatingLabel, type = 'text', label, name, rules, className = '', ...inputProps }) {
  const [showPass, setShowPass] = useState(false);

  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
  });
  return (
    <fieldset className='relative h-full w-full'>
      {label && (
        <label className={'text-base font-medium'} htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative mt-2 w-full'>
        <input
          {...field}
          id={name}
          name={name}
          type={showPass ? 'text' : type}
          className={`general-input peer block h-full w-full ${floatingLabel ? 'placeholder-transparent' : ''} ${errors?.[name] ? 'border-[--main-clr]  bg-[#f11237]/5 ' : ''}  ${className}`}
          placeholder={label || '...'}
          {...inputProps}
        />

        {floatingLabel && (
          <label
            className={`${errors?.[name] ? 'peer-focus:text-rose-600' : ''} placeholder-shown data-exist-or-focused-input-label`}
            htmlFor={name}
          >
            {floatingLabel}
          </label>
        )}

        {type == 'password' && (
          <button type='button' onClick={() => setShowPass((prev) => !prev)} className='absolute end-3 top-[50%] translate-y-[-50%]'>
            {showPass ? <Icons.Eye /> : <Icons.EyeDisable />}
          </button>
        )}
      </div>
      {/* for errors */}
      {errors?.[name] && (
        <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
          <Icons.Danger />
          {errors?.[name].message}
        </p>
      )}
    </fieldset>
  );
}
