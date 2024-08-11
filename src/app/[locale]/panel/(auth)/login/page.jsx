
'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import LogoLigth from "@/assets/icons/main-logo-light.png"
import LogoDark from "@/assets/icons/main-logo-dark.png"
import Image from 'next/image';
import { ShowPasswordIcon, NotShowPassword, DangerIcon } from "@/assets/icons/components"
import { useLocale } from 'next-intl';

// validation and APIs
import { VALIDATIONS, notify } from '@/utils';
import { Link, useRouter } from '@/navigation';
import { ROUTES_PATH } from '@/utils/routes';
import { websiteApis } from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuth } from '@/lib/features/authSlice';
import { useForm } from 'react-hook-form';


export default function PanelLoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [showPass, setShowPass] = useState(false);
  //
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const router = useRouter();
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
      type: 'admin',
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
      router.replace(ROUTES_PATH.panel.home);
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const changeShowPass = () => {
    setShowPass(!showPass)
  }


  return (
    <div className="h-[100vh] bg-gray-100/20 dark:bg-[#111827] flex flex-col justify-center items-center ">
      <div>
        <Image
          className=" hidden dark:block "
          src={LogoDark}
          alt="Example Image"
          width={50}  // Set desired width
          height={30} // Set desired height
        />
        <Image
          className=" block dark:hidden "
          src={LogoLigth}
          alt="Example Image"
          width={50}  // Set desired width
          height={30} // Set desired height
        />

      </div>
      <h1 className=' font-bold text-[18px] text-black dark:text-white  sm:text-[22px] xl:text-[26px] '> {t('panel.info.login_message')}</h1>

      <div className='  text-black dark:text-white relative w-full pt-[50px] flex justify-center'>

        <div className='  relative flex w-[90%] flex-col overflow-y-auto rounded-lg bg-[--panel-bg] max-w-[600px] shadow-lg border border-slate-300 outline-none dark:border-none dark:bg-slate-800 focus:outline-none sm:w-[80%] lg:w-[50%]'>
          {/* modal header */}
          <div className=' rounded-t border-b border-solid border-gray-300 dark:border-slate-500 p-5 '>
            <h3 className='font=semibold text-center text-3xl'> {t(`panel.info.login`)}</h3>

          </div>
          {/* modal body */}
          <div className=' relative flex-auto p-6  '>

            <form onSubmit={handleSubmit(onSubmit)} className='  w-full rounded px-1  pb-8 pt-6 md:px-8 '>

              <div>

                <div className='mb-5' >
                  <div className='flex gap-2 items-center mb-1 '>
                    <label className='mb-1 block text-sm font-bold '>  {t('panel.popups.inputs.email')}</label>
                    <span className='text-red-700'>*</span>
                  </div>
                  <input
                    {...register('email', { ...VALIDATIONS.email })}
                    placeholder={t('panel.popups.inputs.email')} className='bg-gray-200/10 w-full appearance-none rounded border px-3 py-2 outline-none text-[18px] border-gray-300 dark:border-slate-500 focus:border-blue-400 dark:focus:border-blue-400 dark:bg-gray-500/10  ' />


                  {/* for errors */}
                  {errors.email && (
                    <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
                      <DangerIcon />
                      {errors.email.message}
                    </p>
                  )}
                </div>




                <div className='mb-5' >
                  <div className='flex gap-2 items-center mb-1 '>
                    <label className='mb-1 block text-sm font-bold '>  {t('panel.popups.inputs.password')}</label>
                    <span className='text-red-700'>*</span>
                  </div>
                  <div className='relative'>
                    <span onClick={changeShowPass} className={` ${locale == 'ar' ? ' left-3 ' : 'right-3 '} ${showPass ? 'hidden' : 'block'} absolute top-3 cursor-pointer `}><ShowPasswordIcon /></span>
                    <span onClick={changeShowPass} className={` ${locale == 'ar' ? ' left-3 ' : 'right-3 '} ${showPass ? 'block' : 'hidden'} absolute top-3 cursor-pointer `}><NotShowPassword /></span>
                    <input
                      {...register('password', { ...VALIDATIONS.password })}
                      type={showPass ? 'text' : 'password'} placeholder={t('panel.popups.inputs.password')} className='bg-gray-200/10 w-full appearance-none rounded border px-3 py-2 outline-none text-[18px] border-gray-300 dark:border-slate-500 focus:border-blue-400 dark:focus:border-blue-400 dark:bg-gray-500/10  ' />
                    {/* for errors */}
                    {errors.password && (
                      <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)]  font-normal text-[--canceled-clr]'>
                        <DangerIcon />
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>



              </div>
              <button
                disabled={isProcessing}
                class=" mt-10 h-12 w-full rounded-lg bg-rose-600 text-center text-white" type="submit">
                {isProcessing ? t('general.is_processing') : t('panel.info.login')}
              </button>
            </form>


          </div>

        </div>
      </div>
    </div>
  );
}

