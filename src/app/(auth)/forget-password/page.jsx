'use client';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { useTranslations } from 'next-intl';
import useCounter from '@/hooks/useCounter';
import { apis } from '@/services/apis';
import { useState } from 'react';
import { Button, Input } from '@/components/ui';

export default function ForgetPasswordPage() {
  const t = useTranslations();
  const [counter, setCounter] = useCounter(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: { email: '' },
  });
  const onSubmit = async (formData) => {
    const payloadData = {
      email: formData.email,
    };
    setCounter(20);
    setIsProcessing(true);
    try {
      await apis.forgotPassword(payloadData);
      notify(t('general.verfication_msg'), { type: 'success' });
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <section className='flex w-full  items-center  justify-center  '>
      <form onSubmit={handleSubmit(onSubmit)} action='' className='mt-8 flex w-full flex-col gap-3'>
        <h4 className=' text-2xl font-semibold'>{t('general.forget_password_title')}</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.forget_password_hint')}</p>

        <Input control={control} name={'email'} rules={VALIDATIONS.email} type='text' label={t('general.email')} />
        <Button disabled={counter == 0 ? false : true} type='submit' isProcessing={isProcessing} text={t('general.confirm')} />

        <p className='flex items-center justify-center gap-1 text-center'>
          <span className='text-base font-normal capitalize  leading-none tracking-tight text-gray-700 dark:text-gray-400'>
            {t('general.not_receive_code')}
          </span>
          <button
            disabled={counter == 0 ? false : true}
            type='submit'
            className='text-base font-semibold capitalize  leading-none tracking-tight text-[var(--primary-clr)] underline disabled:text-[var(--primary-clr)]'
          >
            {t('general.resend')}
          </button>
          {counter != 0 && <span className='text-base font-normal   text-gray-700 dark:text-gray-400'>{`( ${counter} )`}</span>}
        </p>
      </form>
    </section>
  );
}
