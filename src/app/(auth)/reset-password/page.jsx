'use client';
import * as Icons from '@/assets/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { apis } from '@/services/apis';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomSelect, Input } from '@/components';

export default function ResetPasswordPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, //to get specfic value of key in form by --> call watch('key')
  } = useForm({
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

  //guard to not enter the page without sending token in url
  if (!token) {
    return router.replace('/not-authorized');
  }
  return (
    <section className='flex w-full items-center justify-center  first-letter:mx-[20px]  '>
      <form onSubmit={handleSubmit(onSubmit)} action='' className='mt-8 flex w-full flex-col gap-3'>
        <h4 className=' text-2xl font-semibold'>{t('general.reset_password_title')}</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.reset_password_hint')}</p>
        <Input
          control={control}
          label={'new_password'}
          name={'password'}
          type={showPassword ? 'text' : 'password'}
          placeholder={'password'}
          rules={VALIDATIONS.password}
          autoComplete={'true'}
          inputIcon={{
            position: 'start',
            icon: (
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 end-3 flex cursor-pointer  items-center pe-3.5 '
              >
                {showPassword ? <Icons.Eye /> : <Icons.EyeDisable />}
              </button>
            ),
          }}
        />
        <Input
          control={control}
          label={'new_confirm_password'}
          name={'confirmPassword'}
          type={showPassword ? 'text' : 'password'}
          placeholder={'confirmPassword'}
          rules={{ ...VALIDATIONS.confirmPassword({ passwordVal: watch('password') }) }}
          autoComplete={'true'}
          inputIcon={{
            position: 'start',
            icon: (
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute inset-y-0 end-3 flex cursor-pointer  items-center pe-3.5 '
              >
                {showConfirmPassword ? <Icons.Eye /> : <Icons.EyeDisable />}
              </button>
            ),
          }}
        />
        <button className='h-14 w-full rounded-lg bg-rose-600 text-center text-white' type='submit'>
          {isProcessing ? t('general.is_processing') : t('general.confirm')}
        </button>
      </form>
    </section>
  );
}
