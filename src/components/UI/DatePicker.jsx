import React from 'react';
import * as Icons from '@/assets/icons';
import { useController } from 'react-hook-form';

const DatePicker = ({ control, name = 'date', floatingLabel, rules, label, minDate, maxDate, placeholder, dateFormat = 'DD/MM/YYYY' }) => {
  const {
    field,
    formState: { errors },
  } = useController({ control, name, rules });
  return (
    <div className='relative flex flex-col'>
      {label && (
        <label className='mb-2 text-base font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <input
          type='date'
          id={name}
          {...field}
          className={`general-input ${errors?.[name] ? 'border-red-500' : ''}`}
          placeholder={placeholder}
        />
        {floatingLabel && (
          <label
            className={`${field?.value ? '' : 'peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-90 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400'} -translate-x-1/6 absolute -top-2.5 start-2 translate-y-0 scale-75 bg-white font-medium text-[var(--main-blue-color)] transition-all peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-[var(--main-blue-color)]`}
            htmlFor={name}
          >
            {floatingLabel}
          </label>
        )}
      </div>

      {/* for errors */}
      {errors?.[name] && (
        <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
          <Icons.Danger />
          {errors?.[name].message}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
