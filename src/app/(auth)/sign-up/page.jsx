'use client';
import * as Icons from '@/assets/icons';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { CustomSelect, Input } from '@/components';
import Link from 'next/link';
import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import useRequest from '@/hooks/useRequest';
import { apis } from '@/services/apis';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function SignUpPage() {
  const locale = useLocale();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { resData } = useRequest({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  const countryOptions = useMemo(
    () => (resData ? resData.data.map((country) => ({ value: country.id, label: country?.[`name_${locale}`] })) : []),
    [resData]
  );

  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors },
    control,
    reset,
    watch, //to get specfic value of key in form by --> call watch('key')
    getValues, //to get all form values by --> call getValues()
    setValue, //to set value of key in form by --> setValue('key',newValue)
  } = useForm({
    defaultValues: {
      roleType: 'user', //user - reseller
      fullName: '',
      email: '',
      country: null,
      passowrd: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (fromData) => {
    const payloadData = {
      role: fromData.roleType,
      name: fromData.fullName,
      email: fromData.email,
      country_id: fromData.country.value,
      password: fromData.password,
      password_confirmation: fromData.confirmPassword,
      ...(searchParams.get('referral_code') && { referral_code: searchParams.get('referral_code') }),
    };

    setIsProcessing(true);
    try {
      const res = await apis.signUp(payloadData);
      notify(t('general.verfication_msg'), { type: 'success', autoClose: 10000 });
      reset();
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className='flex w-full items-center justify-center  first-letter:mx-[20px]  '>
      <form onSubmit={handleSubmit(onSubmit)} action='' className='mt-8 flex w-full flex-col gap-3'>
        <h4 className=' text-2xl font-semibold'>{t('general.create_account_title')}</h4>
        <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.signup_hint')}</p>
        <div>
          <h4 className='text-base font-medium text-gray-700 dark:text-gray-400' htmlFor='full-name'>
            {t('general.signup_hint_role')}
          </h4>
          <div className='relative mt-2 flex items-center justify-between gap-2'>
            <label
              className={`flex w-full  cursor-pointer justify-start rounded-md border p-3 ps-11 ${watch('roleType') == 'user' ? 'border-red-500 bg-red-300/20 text-primary' : 'text-gray-400'}`}
              htmlFor='user'
            >
              <input
                className="border-secondary-500 before:shadow-checkbox checked:focus:before:shadow-checkbox relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-400 dark:checked:border-primary rtl:float-right"
                type='radio'
                name='roleType'
                id='user'
                value='user'
                checked={watch('roleType') == 'user'}
                {...register('roleType')}
              />
              <span className={`mt-px inline-block ps-[0.15rem] capitalize`}>{t('general.user')} </span>
            </label>
            <label
              className={`flex w-full  cursor-pointer justify-start rounded-md border p-3 ps-11 ${watch('roleType') == 'reseller' ? 'border-red-500 bg-red-300/20 text-primary' : 'text-gray-400'} `}
              htmlFor='reseller'
            >
              <input
                className="border-secondary-500  before:shadow-checkbox checked:focus:before:shadow-checkbox relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-400 dark:checked:border-primary rtl:float-right"
                type='radio'
                name='roleType'
                value='reseller'
                id='reseller'
                checked={watch('roleType') == 'reseller'}
                {...register('roleType')}
              />
              <span className={`mt-px inline-block ps-[0.15rem] capitalize`}>{t('general.reseller')}</span>
            </label>
          </div>
        </div>
        <Input
          control={control}
          label={'fullName'}
          name={'emfullNameail'}
          type='text'
          placeholder={'fullName'}
          rules={VALIDATIONS.name}
          autoComplete={'true'}
        />
        <Input
          control={control}
          label={'email'}
          name={'email'}
          type='text'
          placeholder={'email'}
          rules={VALIDATIONS.email}
          autoComplete={'true'}
        />
        <div>
          <label className='text-base font-medium ' htmlFor='email'>
            {t('general.country')}
          </label>
          <CustomSelect
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: errors.country ? 'red' : '',
                backgroundColor: errors.country ? '#f112370d' : '',
                padding: '3px 0px',
              }),
            }}
            placeholder={`${t('general.country')}...`}
            options={countryOptions}
            {...register('country', { ...VALIDATIONS.required })}
            onChange={(opt) =>
              register('country').onChange({
                target: {
                  name: register('country').name,
                  value: opt || null,
                },
              })
            }
            value={watch('country')}
          />
          {/* for errors */}
          {errors.country && (
            <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
              <Icons.Danger />
              {errors.country.message}
            </p>
          )}
        </div>
        <Input
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
        <Input
          control={control}
          label={'confirmPassword'}
          name={'confirmPassword'}
          type={showPassword ? 'text' : 'password'}
          placeholder={'confirm_password'}
          rules={VALIDATIONS.confirmPassword({ passwordVal: watch('password') })}
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
        <button disabled={isProcessing} className='h-14 w-full rounded-lg bg-rose-600 text-center text-white' type='submit'>
          {isProcessing ? t('general.is_processing') : t('general.create_account')}
        </button>
        <p className='text-center'>
          <span className='text-base font-normal capitalize  leading-none tracking-tight text-gray-700 dark:text-gray-400'>
            {t('general.already_have_account')}{' '}
          </span>
          <Link
            href={ROUTES_PATH.auth.login}
            className='text-base font-semibold capitalize  leading-none tracking-tight text-rose-600 underline'
          >
            {t('general.login')}
          </Link>
        </p>
      </form>
    </section>
  );
}
