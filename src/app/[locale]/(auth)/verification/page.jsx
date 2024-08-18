'use client';
import * as Icon from '@/assets/icons';

import { ROUTES_PATH } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apis } from '@/services/apis';
import { useRouter } from '@/navigation';
import { useDispatch } from 'react-redux';
import { storeAuth } from '@/lib/features/authSlice';
import { notify } from '@/utils';

export default function VerificationPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  //guard to not enter the page if the token not be sent in url
  if (!token) {
    return router.replace('/not-authorized');
  }

  const handleVerification = async () => {
    const payloadData = {
      token,
    };
    setIsProcessing(true);
    try {
      const res = await apis.verify(payloadData);
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
      <div className='mt-8 flex w-full flex-col items-center gap-20'>
        <Icon.Security size={150} />
        <h4 className=' text-2xl font-semibold text-gray-700'>{t('general.continue_verification')}</h4>
        <button disabled={isProcessing} onClick={handleVerification} className='h-14 w-full rounded-lg bg-rose-600 text-center text-white' type='submit'>
          {isProcessing ? t('general.is_processing') : t('general.next')}
        </button>
      </div>
    </section>
  );
}
