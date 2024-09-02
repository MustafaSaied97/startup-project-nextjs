import React from 'react';
import { useController } from 'react-hook-form';
import * as Icons from '@/assets/icons';

const Select = ({ control, name, rules, floatingLabel, label, placeholder, options, valueType = 'string' }) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
  });
  return (
    <fieldset className='relative flex flex-col'>
      {label && (
        <label className='mb-2 text-base font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <select
          onChange={(e) => {
            const value = valueType === 'number' ? Number(e.target.value) : e.target.value;
            field.onChange({
              target: { name: field.name, value: value },
            });
          }}
          id={name}
          value={field.value || ''} // Ensure the placeholder is shown for undefined, '' or null
          className={`general-input w-full appearance-none  ${!field?.value ? 'text-[var(--gray-text-color)]' : ''} ${errors?.[name] ? 'border-red-500' : ''}`}
        >
          <option className='hidden text-[var(--gray-text-color)]' value='' disabled>
            {!floatingLabel && placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} className='text-black' value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom Arrow */}
        <div className='pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-[var(--gray-text-color)]'>
          <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
          </svg>
        </div>
        {/* float label */}
        {floatingLabel && (
          <label
            className={` ${field.value ? '' : 'top-[50%] translate-y-[-50%] scale-100 text-base text-gray-400'} -translate-x-1/6' absolute -top-2.5 start-2 translate-y-0 scale-75 bg-white font-medium text-[var(--main-blue-color)] transition-all peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-[var(--main-blue-color)]`}
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
    </fieldset>
  );
};

export default Select;
