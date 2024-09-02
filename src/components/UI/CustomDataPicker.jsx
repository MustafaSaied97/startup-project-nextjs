'use client';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import { ar } from 'date-fns/locale';
import { Modal } from '@/components/UI';
import { useController } from 'react-hook-form';
import * as Icons from '@/assets/icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const CustomDataPicker = ({ control, name = 'date', floatingLabel, rules, label, minDate, maxDate, placeholder, dateFormat = 'DD/MM/YYYY' }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    field,
    formState: { errors },
  } = useController({ control, name, rules });
  return (
    <>
      <fieldset className='h relative w-full'>
        {label && (
          <label className='mb-2 block text-base font-medium' htmlFor={name}>
            {label}
          </label>
        )}
        <button
          id='date-calendar'
          onBlur={field.onBlur}
          type='button'
          onClick={() => setShowCalendar((prev) => !prev)}
          className={`general-input  relative h-14 w-full text-start ${errors?.[name] ? 'border-[var(--error-color)]' : ''}`}
        >
          {floatingLabel && (
            <label className={` ${field.value ? 'data-exist-or-focused' : 'no-data'} `} htmlFor={name}>
              {floatingLabel}
            </label>
          )}
          {placeholder && !field?.value && <span className='responsive-text h-full w-full text-gray-500'>{placeholder}</span>}
          {field?.value && field?.value}
        </button>
        {/* for errors */}
        {errors?.[name] && (
          <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
            <Icons.Danger />
            {errors?.[name].message}
          </p>
        )}
      </fieldset>

      {showCalendar && (
        <Modal
          onClose={() => setShowCalendar(false)}
          style={{ width: 'fit-content', backgroundColor: 'transparent', padding: '0px' }}
          isScrollBlocked={false}
        >
          <Modal.Body>
            <Calendar
              onBlur={field.onBlur}
              date={field?.value || new Date()}
              onChange={(e) => {
                field.onChange(moment(e).format(dateFormat));
                setShowCalendar(false);
              }}
              locale={ar}
              color='#26C0FF'
              backgroundColor='#26C0FF'
              disabledDay={(day) => {
                return (minDate && day < minDate) || (maxDate && day > maxDate);
              }}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default CustomDataPicker;
