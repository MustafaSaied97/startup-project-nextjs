'use client';
import * as Icons from '@/assets/icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import { notify } from '@/utils';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES_PATH } from '@/utils/routes';
import { apis } from '@/services/apis';
import { useDispatch } from 'react-redux';
import { removeAuth } from '@/state-mangement/features/authSlice';
export default function Logout() {
  const t = useTranslations();
  const router = useRouter();
  const pathName = usePathname();
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleLogout = async () => {
    setIsProcessing(true);
    try {
      //remove from server
      const res = await apis.logout();
      //remove auth from state-mangement and cookies
      dispatch(removeAuth());
      notify(res?.message, { type: 'success' });
      router.push(ROUTES_PATH.auth.login);
    } catch (err) {
      console.log('err', err);
      notify(err?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <>
      <button onClick={() => setOpenModal((prev) => !prev)}>logout</button>
      {openModal && (
        <div className='fixed inset-0  z-[100]  flex items-center justify-center overflow-y-auto overflow-x-hidden overscroll-none outline-none focus:outline-none'>
          {/* backdrop */}
          <div onClick={() => setOpenModal(false)} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/20 '></div>
          {/* modal */}
          <div className='relative z-10 flex max-h-[70vh] w-[90%] max-w-[600px] flex-col overflow-y-auto rounded-lg border-0 bg-[var(--modal-bg)] px-6 py-2 shadow-lg outline-none focus:outline-none sm:w-[70%] md:w-[60%] '>
            {/* modal header */}
            <div className='relative z-10 -mb-4 flex items-start justify-end rounded-t    pt-2 '>
              <button className=' h-6 w-6 rounded-md  text-center  text-white    hover:bg-gray-200 ' onClick={() => setOpenModal(false)}>
                <Icons.Close />
              </button>
            </div>
            {/* modal body */}
            <section className='relative flex flex-col items-center gap-8 py-3   '>
              <Image priority src={`/assets/images/logout.png`} className=' h-full  max-w-[100px]' width={900} height={65} alt='test' />
              <h1 className=' text-center text-base font-bold  text-[#686d6d] sm:text-xl'>{t('general.logout_msg')}</h1>
            </section>
            {/* modal footer */}
            <section className=' my-1 flex items-center  justify-end gap-4 rounded-b border-t border-solid py-2 dark:border-[#686d6d] '>
              <button className='  h-full w-fit rounded p-2 text-sm font-bold  text-red-500 shadow  hover:shadow-lg ' type='button' onClick={() => setOpenModal(false)}>
                {t('general.cancel')}
              </button>
              <button className='  h-full w-fit rounded p-2 text-sm font-bold  text-blue-500 shadow  hover:shadow-lg ' type='button' onClick={handleLogout}>
                {isProcessing ? t('general.is_processing') : t('general.confirm')}
              </button>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
