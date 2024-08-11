'use client';
import { EyeDisableIcon, EyeIcon, DangerIcon } from '@/assets/icons/components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { Link, useRouter } from '@/navigation';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { websiteApis } from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuth } from '@/lib/features/authSlice';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
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
    setIsProcessing(true);
    try {
      const res = await websiteApis.login(payloadData);
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
        <h4 className='text-2xl font-semibold'>{t('general.welcome_back')} 👋</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.login_title')}</p>
        {/* email */}
        <div>
          <label className='text-base font-medium ' htmlFor='email'>
            {t('general.email')}
          </label>
          <div className='relative mt-2'>
            <input
              {...register('email', { ...VALIDATIONS.email })}
              type='text'
              id='email'
              name='email'
              className={`block w-full rounded-[5px]  border ${errors.email ? 'border-[--main-clr]  bg-[#f11237]/5 ' : 'border-[#E6E6E6]  bg-transparent '}   p-2.5  pe-10 text-[0.9rem]  outline-none focus:border-blue-500  sm:text-[.8rem]`}
              placeholder={t('general.email')}
              autoComplete={'true'}
            />
          </div>
          {/* for errors */}
          {errors.email && (
            <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
              <DangerIcon />
              {errors.email.message}
            </p>
          )}
        </div>
        {/* password */}
        <div>
          <label className='text-base font-medium ' htmlFor='password'>
            {t('general.password')}
          </label>
          <div className='relative mt-2'>
            <input
              {...register('password', { ...VALIDATIONS.password })}
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              className={`block w-full rounded-[5px]  border  ${errors.password ? 'border-[--main-clr]  bg-[#f11237]/5 ' : 'border-[#E6E6E6]  bg-transparent '}   p-2.5  pe-10 text-[0.9rem]  outline-none focus:border-blue-500  sm:text-[.8rem]`}
              placeholder={t('general.password')}
              autoComplete={'true'}
            />
            <div onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 left-0 flex cursor-pointer  items-center pe-3.5 ltr:left-auto  ltr:right-0 '>
              {showPassword ? <EyeIcon /> : <EyeDisableIcon />}
            </div>
          </div>
          {/* for errors */}
          {errors.password && (
            <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
              <DangerIcon />
              {errors.password.message}
            </p>
          )}
        </div>
        <Link href={ROUTES_PATH.website.forgetPassword} className='text-right text-base font-normal capitalize leading-none tracking-tight text-gray-700 underline dark:text-gray-400'>
          {t('general.forget_password')}
        </Link>
        <button disabled={isProcessing} className='h-14 w-full rounded-lg bg-rose-600 text-center text-white' type='submit'>
          {isProcessing ? t('general.is_processing') : t('general.login')}
        </button>
        <p className='text-center'>
          <span className='text-base font-normal capitalize  leading-none tracking-tight text-gray-700 dark:text-gray-400'>{t('general.not_have_account')} </span>
          <Link href={ROUTES_PATH.website.signUp} className='text-base font-semibold capitalize  leading-none tracking-tight text-rose-600 underline'>
            {t('general.signup')}
          </Link>
        </p>
      </form>
    </section>
  );
}
