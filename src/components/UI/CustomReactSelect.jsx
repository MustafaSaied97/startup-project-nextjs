'use client';

import React from 'react';
import { useController } from 'react-hook-form';
import ReactSelect from './ReactSelect';
import * as Icons from '@/assets/icons';

export default function CustomReactSelect({ control, label, name, options, rules, ...inputProps }) {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
  });
  return (
    <fieldset>
      {label && (
        <label className='mb-4 text-base font-medium ' htmlFor={name}>
          {label}
        </label>
      )}
      <ReactSelect
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: errors?.[name] ? 'red' : '',
            backgroundColor: errors?.[name] ? '#f112370d' : '',
            padding: '3px 0px',
          }),
        }}
        placeholder={label || '...'}
        options={options}
        {...field}
        onChange={(opt) =>
          field.onChange({
            target: { name: field.name, value: opt || null },
          })
        }
        value={field.value}
        {...inputProps}
      />
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
