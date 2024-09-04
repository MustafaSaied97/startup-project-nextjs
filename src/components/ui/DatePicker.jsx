'use client';
import React, { useEffect, useRef } from 'react';
import * as Icons from '@/assets/icons';
import { useController } from 'react-hook-form';
import moment from 'moment';
import FieldErrorMsg from './FieldErrorMsg';

const originalDateFormat = 'YYYY-MM-DD'; // date format of date input

const DatePicker = ({
  control,
  name = 'date',
  floatingLabel,
  rules,
  label,
  minDate,
  maxDate,
  placeholder,
  returnedDateFormat = 'DD/MM/YYYY',
  displayedDateFormat = 'DD/MM/YYYY',
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ control, name, rules });
  
  const dateInputRef = useRef();

  function convertDate(date, inputFormat, outputFormat) {
    const parsedDate = moment(date, inputFormat).format(outputFormat);
    return parsedDate == 'Invalid date' ? null : parsedDate;
  }

  useEffect(() => {
    console.log(name, field.value);
  }, [field?.value]);

  return (
    <fieldset className='relative flex flex-col'>
      {label && (
        <label className='mb-2 text-base font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <button
          id='date-calendar'
          onBlur={field.onBlur}
          type='button'
          onClick={() => dateInputRef.current.showPicker()}
          className={`general-input  relative  w-full text-start ${errors?.[name] ? 'border-[var(--error-clr)] bg-[var(--bg-error-clr)]' : ''}`}
        >
          {floatingLabel && (
            <label className={` ${field.value ? 'data-exist-or-focused' : 'no-data'} `} htmlFor={name}>
              {floatingLabel}
            </label>
          )}
          {placeholder && !field?.value && <span className=' h-full w-full text-gray-500'>{placeholder}</span>}
          {field?.value && convertDate(field?.value, returnedDateFormat, displayedDateFormat)}
        </button>
        <input
          type='date'
          id={name}
          {...field}
          ref={dateInputRef}
          value={field?.value && convertDate(field?.value, returnedDateFormat, originalDateFormat)}
          onChange={(e) => {
            const selectedDate = e.target.value;
            field.onChange(convertDate(selectedDate, originalDateFormat, returnedDateFormat));
          }}
          min={convertDate(minDate, returnedDateFormat, originalDateFormat)} // Set the minimum selectable date
          max={convertDate(maxDate, returnedDateFormat, originalDateFormat)}
          className={`collapse absolute bottom-0 start-0 -z-10 appearance-none `}
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

      {errors?.[name] && <FieldErrorMsg message={errors?.[name].message} />}
    </fieldset>
  );
};

export default DatePicker;
