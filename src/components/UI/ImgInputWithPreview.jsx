'use client';
import React, { useState } from 'react';
import { CustomImg } from '../generic';
import { useTranslations } from 'next-intl';
import { convertImgFileToUrl, notify } from '@/utils';
import { useController } from 'react-hook-form';
import * as Icons from '@/assets/icons';
import FieldErrorMsg from './FieldErrorMsg';

export default function ImgInputWithPreview({ control, name, rules, label }) {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  const t = useTranslations();
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
  });
  const [logoPreview, setLogoPreview] = useState(convertImgFileToUrl(field?.value));
  const [dragOver, setDragOver] = useState(false);

  const handleLogoChange = async (e, dropedFile) => {
    const file = dropedFile || e?.target?.files?.[0];
    if (!file) return;

    const maxSize = 3 * 1000 * 1000; // 3MB
    if (file.size > maxSize) {
      notify(t('general.validation_msg.maximum_size_of_uploading_image', { size: `${maxSize / 1000 ** 2}MB` }));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      notify('unsupported file type');
      return;
    }

    field.onChange({
      target: {
        name: field.name,
        value: file,
      },
    });
    const url = convertImgFileToUrl(file);
    setLogoPreview(url);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    handleLogoChange(null, file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    field.onChange({ target: { name: field.name, value: '' } });
  };

  return (
    <fieldset>
      {label && (
        <label className='text-base font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className='relative mt-2 flex h-24 rounded-lg border border-dashed'
      >
        {!logoPreview ? (
          <label className='flex w-full cursor-pointer flex-col items-center justify-center gap-1' htmlFor={name}>
            <Icons.Upload className={dragOver ? 'animate-bounce' : ''} />
            <p className='text-xs text-[#7E859B] sm:text-sm'>{t('general.upload_logo_hint')}</p>
            <input
              {...field}
              onChange={handleLogoChange}
              accept={allowedTypes.join(',')}
              id={name}
              type='file'
              name={name}
              multiple={false}
              className='mx-auto hidden'
            />
          </label>
        ) : (
          <figure className='relative mx-auto flex cursor-pointer flex-col items-center justify-center gap-1'>
            <button
              type='button'
              className='absolute -right-1 top-1 z-20 w-fit rounded-full bg-[var(--primary-clr)] p-1 hover:bg-[var(--primary-clr-15)]'
              onClick={handleRemoveLogo}
            >
              <Icons.Close color='#fff' size={14} />
            </button>
            <CustomImg
              className='h-[75px] w-[75px] rounded-md bg-gray-200 object-cover'
              src={logoPreview}
              width={75}
              height={75}
              alt={logoPreview}
            />
          </figure>
        )}
      </div>
      {errors?.[name] && <FieldErrorMsg message={errors?.[name].message} />}
    </fieldset>
  );
}
