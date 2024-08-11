'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { notify } from '@/utils';
import { panelApis } from '@/services/apis';

export default function DeleteModal({ closeDeleteModal, id, updateTable }) {
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);

  const closeModal = () => {
    closeDeleteModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await panelApis.deleteWithdrawal(id);
      if (res.status) notify(res?.message, { type: 'success' });
      else notify(res?.message, { type: 'error' });
      updateTable({});
      closeModal();
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className=' fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden text-black outline-none focus:outline-none dark:text-white'>
      {/*backdrop */}
      <div onClick={closeModal} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/30 '></div>
      {/* modal*/}
      <div
        className={` relative z-10  flex max-h-[90vh] w-[95%] flex-col overflow-y-auto rounded-lg border-0 bg-[--panel-bg]  shadow-lg outline-none focus:outline-none dark:bg-slate-800 sm:w-[70%] md:w-[60%] lg:w-[50%]  `}
      >
        {/* modal header */}
        <div className=' flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 dark:border-slate-500 '>
          <h3 className='font=semibold text-center text-3xl'> {t(`panel.popups.title.change_withdrawal`)}</h3>
          <button className=' h-6 w-6 rounded-md bg-blue-600 text-center text-white hover:bg-blue-300 ' onClick={closeModal}>
            x
          </button>
        </div>
        {/* modal body */}
        <div className=' relative flex-auto p-6'>
          <form onSubmit={onSubmit} className='  w-full rounded px-1  pb-1 pt-6 md:px-8 '>
            <div className=' w-full rounded border bg-gray-50 px-8 pb-8 pt-6 text-center text-[18px] font-[500] dark:bg-slate-700  sm:text-[22px]'>
              {t('panel.popups.actions.delete_withdrawal_confirmation')}
            </div>

            <div className=' my-2 flex items-center justify-end gap-4 rounded-b border-t border-solid border-gray-300 p-6 text-[18px] dark:border-slate-500  '>
              <button
                className='  h-full w-fit rounded border border-gray-300 px-6  py-2 font-bold text-blue-500 hover:bg-slate-700/20 hover:shadow-lg dark:border-slate-500 dark:hover:bg-slate-700'
                type='button'
                onClick={closeModal}
              >
                {t('panel.popups.actions.close')}
              </button>
              <button
                className={`${!isProcessing ? 'text-red-700  hover:bg-red-700/20' : 'text-green-700  hover:bg-green-300/20'} font-bol h-full w-fit rounded border border-gray-300 px-6 py-2 hover:shadow-lg dark:border-slate-500 `}
                disabled={isProcessing}
                type='submit'
              >
                {isProcessing ? t('general.is_processing') : t('panel.popups.actions.delete')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
