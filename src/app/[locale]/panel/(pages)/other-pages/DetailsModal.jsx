'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';


export default function DeleteModal({ closeDetailsModal, item }) {
  const t = useTranslations();
  const locale = useLocale();

  const closeModal = () => {
    closeDetailsModal();
  };


  return (
    <div className=' fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden text-black outline-none focus:outline-none dark:text-white'>
      {/*backdrop */}
      <div onClick={closeModal} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/30 '></div>
      {/* modal*/}
      <div
        className={` relative z-10  flex max-h-[90vh] w-[95%] flex-col overflow-y-auto rounded-lg border-0 bg-[--panel-bg]  shadow-lg outline-none focus:outline-none dark:bg-slate-800 sm:w-[70%]   `}
      >
        {/* modal header */}
        <div className=' flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 dark:border-slate-500 '>
          <h3 className='font=semibold text-center text-3xl'> {t(`panel.popups.title.withdrawal_details`)}</h3>
          <button className=' h-6 w-6 rounded-md bg-blue-600 text-center text-white hover:bg-blue-300 ' onClick={closeModal}>
            x
          </button>
        </div>
        {/* modal body */}
        <div className=' relative flex-auto p-6'>
          <section  className='  w-full rounded px-1  pb-1 pt-6 md:px-8 '>
            <div className=''>
             

              <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                <span>  {t('panel.popups.inputs.name')} </span>
                <span>  {item?.user?.name} </span>
              </div>

              <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                <span>  {t('panel.popups.inputs.email')} </span>
                <span>  {item?.user?.email} </span>
              </div>

              <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                <span>  {t('panel.popups.inputs.withdrawal_status')} </span>
                <span>  {locale == 'ar' ? item.status_ar : item.status_en} </span>
              </div>

              <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                <span>  {t('panel.popups.inputs.amount')} </span>
                <span>  {item?.amount} </span>
              </div>
              <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                <span>  {t('panel.popups.inputs.date')} </span>
                <span>  {item?.date} </span>
              </div>
              
              <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                <span>  {t('panel.popups.inputs.payment_method')} </span>
                <span>  {item.payment_method} </span>
              </div>
              {item.paypal_email ? (
                        <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                        <span>  {t('panel.popups.inputs.paypal_email')} </span>
                        <span>  {item.paypal_email} </span>
                      </div>
              ):""}
               {item.crypto_address ? (
                        <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                        <span>  {t('panel.popups.inputs.crypto_address')} </span>
                        <span>  {item.crypto_address} </span>
                      </div>
              ):""}
               {item.crypto_type ? (
                        <div className=' w-full rounded border bg-gray-50 p-2 font-[500] dark:bg-slate-700 flex justify-between text-[14px] mb-2 lg:text-[18px]'>
                        <span>  {t('panel.popups.inputs.crypto_type')} </span>
                        <span>  {item.crypto_type} </span>
                      </div>
              ):""}
              
            </div>

            <div className=' my-2 flex items-center justify-end gap-4 rounded-b border-t border-solid border-gray-300 p-6 text-[18px] dark:border-slate-500  '>
              <button
                className='  h-full w-fit rounded border border-gray-300 px-6  py-2 font-bold text-blue-500 hover:bg-slate-700/20 hover:shadow-lg dark:border-slate-500 dark:hover:bg-slate-700'
                type='button'
                onClick={closeModal}
              >
                {t('panel.popups.actions.close')}
              </button>
     
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
