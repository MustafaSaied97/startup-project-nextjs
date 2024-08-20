'use client';
import * as Icons from '@/assets/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { Link, useRouter } from '@/navigation';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { apis } from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuth } from '@/state-mangement/features/authSlice';
import { TextInput } from '@/components/UI';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: { email: '', passowrd: '' },
  });

  const onSubmit = async (fromData) => {
    const payloadData = {
      email: fromData.email,
      password: fromData.password,
      type: 'user',
    };
    console.log('payloadData', payloadData);
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
      // reset();
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
        <h4 className='text-2xl font-semibold'>{'welcome_back'} 👋</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{'login_title'}</p>
        <TextInput
          control={control}
          label={'email'}
          name={'email'}
          type='text'
          placeholder={'email'}
          rules={VALIDATIONS.email}
          autoComplete={'true'}
        />
        <TextInput
          control={control}
          label={'password'}
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
        <Link
          href={ROUTES_PATH.auth.forgetPassword}
          className='text-right text-base font-normal capitalize leading-none tracking-tight text-gray-700 underline dark:text-gray-400'
        >
          {'forget_password'}
        </Link>
        <button disabled={isProcessing} className='h-14 w-full rounded-lg bg-rose-600 text-center text-white' type='submit'>
          {isProcessing ? 'is_processing' : 'login'}
        </button>
        <p className='text-center'>
          <span className='text-base font-normal capitalize  leading-none tracking-tight text-gray-700 dark:text-gray-400'>
            {'not_have_account '}
          </span>
          <Link
            href={ROUTES_PATH.auth.signUp}
            className='text-base font-semibold capitalize  leading-none tracking-tight text-rose-600 underline'
          >
            {'signup'}
          </Link>
        </p>
      </form>
    </section>
  );
}
