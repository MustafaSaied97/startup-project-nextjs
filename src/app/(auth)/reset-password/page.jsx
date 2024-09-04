'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { apis } from '@/services/apis';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';

export default function ResetPasswordPage() {
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (fromData) => {
    const payloadData = {
      token,
      password: fromData.password,
      password_confirmation: fromData.confirmPassword,
    };
    setIsProcessing(true);
    try {
      const res = await apis.resetPassword(payloadData);
      notify(res?.message, { type: 'success' });
      // reset();
      router.replace(ROUTES_PATH.auth.login);
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  // guard to not enter the page without sending token in url
  if (!token) {
    return router.replace('/not-authorized');
  }
  return (
    <section className='flex w-full items-center justify-center  first-letter:mx-[20px]  '>
      <form onSubmit={handleSubmit(onSubmit)} action='' className='mt-8 flex w-full flex-col gap-3'>
        <h4 className=' text-2xl font-semibold'>{t('general.reset_password_title')}</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.reset_password_hint')}</p>
        <Input name={'password'} rules={VALIDATIONS.password} label={t('general.new_password')} type='password' control={control} />
        <Input
          name={'confirmPassword'}
          rules={VALIDATIONS.confirmPassword({ passwordVal: watch('password') })}
          label={t('general.new_confirm_password')}
          type='password'
          control={control}
        />
        <Button text={t('general.confirm')} type='submit' isProcessing={isProcessing} />
      </form>
    </section>
  );
}
