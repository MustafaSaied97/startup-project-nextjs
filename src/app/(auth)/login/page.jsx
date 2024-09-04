'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { useRouter } from 'next/navigation';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { apis } from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuth } from '@/state-mangement/features/authSlice';
import { Button, Input } from '@/components/ui';
import Link from 'next/link';


export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: { email: '', passowrd: '' },
  });

  const onSubmit = async (fromData) => {
    const payloadData = {
      email: fromData.email,
      password: fromData.password,
      type: 'user',
    };
    setIsProcessing(true);
    try {
      const res = await apis.login(payloadData);
      dispatch(
        storeAuth({
          token: res.data.access_token,
          ...res.data.user,
        })
      );
      notify(res?.message, { type: 'success' });
      router.replace(ROUTES_PATH.website.home);
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className='flex w-full  items-center  justify-center  '>
      <form onSubmit={handleSubmit(onSubmit)} action='' className='mt-8 flex w-full flex-col gap-3'>
        <h4 className='text-2xl font-semibold'>{t('general.welcome_back')} 👋</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.login_title')}</p>
        <Input control={control} name={'email'} rules={VALIDATIONS.email} type='text' label={t('general.email')} />
        <Input control={control} name={'password'} rules={VALIDATIONS.password} type='password' label={t('general.password')} />
        <Link
          href={ROUTES_PATH.auth.forgetPassword}
          className='text-right text-base font-normal capitalize leading-none tracking-tight text-gray-700 underline dark:text-gray-400'
        >
          {t('general.forget_password')}
        </Link>
        <Button type='submit' isProcessing={isProcessing} text={t('general.login')} />
        <p className='text-center'>
          <span className='text-base font-normal capitalize  leading-none tracking-tight text-gray-700 dark:text-gray-400'>
            {t('general.not_have_account')}{' '}
          </span>
          <Link
            href={ROUTES_PATH.auth.signUp}
            className='text-base font-semibold capitalize  leading-none tracking-tight text-[var(--primary-clr)] underline'
          >
            {t('general.signup')}
          </Link>
        </p>
      </form>
    </section>
  );
}
