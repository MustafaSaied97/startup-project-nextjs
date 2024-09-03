'use client';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import { ar } from 'date-fns/locale';
import { Modal } from '@/components/UI';
import { useController } from 'react-hook-form';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import FieldErrorMsg from './FieldErrorMsg';

const originalDateFormat = 'ddd MMM DD YYYY HH:mm:ss [GMT]Z'; // date format of Calendar
const CustomDataPicker = ({
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
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    field,
    formState: { errors },
  } = useController({ control, name, rules });

  function convertDate(date, inputFormat, outputFormat) {
    const parsedDate = moment(date, inputFormat).format(outputFormat);
    return parsedDate == 'Invalid date' ? null : parsedDate;
  }

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
        {errors?.[name] && <FieldErrorMsg message={errors?.[name].message} />}
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
              date={field?.value && convertDate(field?.value, returnedDateFormat, originalDateFormat)}
              onChange={(e) => {
                field.onChange(convertDate(e, originalDateFormat, returnedDateFormat));
                setShowCalendar(false);
              }}
              locale={ar}
              color='#26C0FF'
              backgroundColor='#26C0FF'
              disabledDay={(day) => {
                const dayWithReturnedDateFormat = convertDate(day, originalDateFormat, returnedDateFormat);
                return (minDate && dayWithReturnedDateFormat < minDate) || (maxDate && dayWithReturnedDateFormat > maxDate);
              }}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default CustomDataPicker;
