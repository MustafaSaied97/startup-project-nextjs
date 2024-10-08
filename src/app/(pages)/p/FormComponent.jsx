'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS } from '@/utils';
import { Button, Input } from '@/components/ui';
import useVaildations from '@/hooks/useVaildations';
export default function FormComponent() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });
  const vaildaions = useVaildations(trigger, errors);


  const onSubmit = async (fromData) => {
    console.table(fromData);
  };
  return (
    <section className='flex w-full  items-center  justify-center  '>
      <form onSubmit={handleSubmit(onSubmit)} action='' className='mt-8 flex w-full flex-col gap-3'>
        <h4 className='text-2xl font-semibold'>{'welcome_back'} 👋</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{'login_title'}</p>
        <Input
          control={control}
          label={'email'}
          name={'email'}
          type='text'
          placeholder={'email'}
          rules={vaildaions.email}
          autoComplete={'false'}
        />
        <Input
          control={control}
          label={'password'}
          name={'password'}
          type={'password'}
          placeholder={'password'}
          rules={vaildaions.password}
          autoComplete={'false'}
        />
        <Button text='login' type='submit' />
      </form>
    </section>
  );
}
