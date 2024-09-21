'use client';
import { useState } from 'react';
import { Control, useController, RegisterOptions } from 'react-hook-form';
import * as Icons from '@/assets/icons';
import FieldErrorMsg from './FieldErrorMsg';
type InputProps = {
  control: Control<any>; // Adjust the type parameter to match your form data type
  floatingLabel?: boolean | string;
  type?: string;
  label?: string;
  name: string;
  rules?: RegisterOptions;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ control, floatingLabel, type = 'text', label, name, rules, className = '', ...inputProps }: InputProps) {
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
          className={`general-input peer block h-full w-full ${floatingLabel ? 'placeholder-transparent' : ''} ${errors?.[name] ? 'border-[var(--error-clr)] bg-[var(--bg-error-clr)]' : ''}  ${className}`}
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
      {errors?.[name] && <FieldErrorMsg message={errors?.[name].message} />}
    </fieldset>
  );
}
