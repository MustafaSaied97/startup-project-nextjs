'use client';
import { EyeDisableIcon, EyeIcon, DangerIcon } from '@/assets/icons/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { websiteApis } from '@/services/apis';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const {
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
      const res = await websiteApis.resetPassword(payloadData);
      notify(res?.message, { type: 'success' });
      // reset();
      router.replace(ROUTES_PATH.website.login);
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
        {/* newPassword */}
        <div>
          <label className='text-base font-medium ' htmlFor='password'>
            {t('general.new_password')}
          </label>
          <div className='relative mt-2'>
            <input
              {...register('password', { ...VALIDATIONS.password })}
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              className={`block w-full rounded-[5px]  border  ${errors.password ? 'border-[--main-clr]  bg-[#f11237]/5 ' : 'border-[#E6E6E6]  bg-transparent '}   p-2.5  pe-10 text-[0.9rem]  outline-none focus:border-blue-500  sm:text-[.8rem]`}
              placeholder={t('general.new_password')}
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
        {/* newConfirmPassword  */}
        <div>
          <label className='text-base font-medium ' htmlFor='confirm-password'>
            {t('general.new_confirm_password')}
          </label>
          <div className='relative mt-2'>
            <input
              {...register('confirmPassword', { ...VALIDATIONS.confirmPassword({ passwordVal: watch('password') }) })}
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirm-password'
              name='confirmPassword'
              className={`block w-full rounded-[5px]  border  ${errors.confirmPassword ? 'border-[--main-clr]  bg-[#f11237]/5 ' : 'border-[#E6E6E6]  bg-transparent '}   p-2.5  pe-10 text-[0.9rem]  outline-none focus:border-blue-500  sm:text-[.8rem]`}
              placeholder={t('general.new_confirm_password')}
              autoComplete={'true'}
            />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute inset-y-0 left-0 flex cursor-pointer  items-center pe-3.5 ltr:left-auto  ltr:right-0 '>
              {showConfirmPassword ? <EyeIcon /> : <EyeDisableIcon />}
            </div>
          </div>
          {/* for errors */}
          {errors.confirmPassword && (
            <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
              <DangerIcon />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button className='h-14 w-full rounded-lg bg-rose-600 text-center text-white' type='submit'>
          {isProcessing ? t('general.is_processing') : t('general.confirm')}
        </button>
      </form>
    </section>
  );
}
