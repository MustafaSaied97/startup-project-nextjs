'use client';

import React from 'react';
import { useController } from 'react-hook-form';
import ReactSelect from './ReactSelect';
import * as Icons from '@/assets/icons';
import FieldErrorMsg from './FieldErrorMsg';

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
      {errors?.[name] && <FieldErrorMsg message={errors?.[name].message} />}
    </fieldset>
  );
}
