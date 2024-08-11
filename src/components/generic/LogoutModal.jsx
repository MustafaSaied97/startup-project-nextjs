'use client';
import { CloseIcon, ChatDotsIcon } from '@/assets/icons/components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import { notify } from '@/utils';
import { useRouter , usePathname } from '@/navigation';
import { ROUTES_PATH } from '@/utils/routes';
import { websiteApis } from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from '@/lib/features/authSlice';
export default function LogoutModal({ closeModal = () => {} }) {
  const t = useTranslations();
  const router = useRouter();
  const pathName = usePathname()
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsProcessing(true);
    try {
      //remove from server
      const res = await websiteApis.logout();
      //remove auth from state-mangement and cookies
      dispatch(removeAuth());
      notify(res?.message, { type: 'success' });
      //redirect to login page
      if(pathName.startsWith('/panel')) {
        router.push(ROUTES_PATH.website.home);
      }else{
        router.push(ROUTES_PATH.website.login);
      }
      
    } catch (err) {
      console.log('err', err);
      notify(err?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className='fixed inset-0  z-[100]  flex items-center justify-center overflow-y-auto overflow-x-hidden overscroll-none outline-none focus:outline-none'>
      {/* backdrop */}
      <div onClick={closeModal} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/20 '></div>
      {/* modal */}
      <div className='relative z-10 flex max-h-[70vh] w-[90%] max-w-[600px] flex-col overflow-y-auto rounded-lg border-0 bg-[var(--modal-bg)] px-6 py-2 shadow-lg outline-none focus:outline-none sm:w-[70%] md:w-[60%] '>
        {/* modal header */}
        <div className='relative z-10 -mb-4 flex items-start justify-end rounded-t    pt-2 '>
          <button className=' h-6 w-6 rounded-md  text-center  text-white    hover:bg-gray-200 ' onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        {/* modal body */}
        <section className='relative flex flex-col items-center gap-8 py-3   '>
          <Image priority src={`/assets/icons/logout.png`} className=' h-full  max-w-[100px]' width={900} height={65} alt='test' />
          <h1 className=' text-center text-base font-bold  text-[#686d6d] sm:text-xl'>{t('general.logout_msg')}</h1>
        </section>
        {/* modal footer */}
        <section className=' my-1 flex items-center  justify-end gap-4 rounded-b border-t border-solid py-2 dark:border-[#686d6d] '>
          <button className='  h-full w-fit rounded p-2 text-sm font-bold  text-red-500 shadow  hover:shadow-lg ' type='button' onClick={closeModal}>
            {t('general.cancel')}
          </button>
          <button className='  h-full w-fit rounded p-2 text-sm font-bold  text-blue-500 shadow  hover:shadow-lg ' type='button' onClick={handleLogout}>
            {isProcessing ? t('general.is_processing') : t('general.confirm')}
          </button>
        </section>
      </div>
    </div>
  );
}
