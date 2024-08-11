'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { ChavIcon, DangerIcon } from '@/assets/icons/components';
import { useLocale } from 'next-intl';
import { panelApis } from '@/services/apis';

export default function ChangeStatus({ closeChangeStatusModal, id, updateTable }) {
  const locale = useLocale();
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const [chosenStatus, setChosenStatus] = useState('');
  const allStatus = [
    { val: 'accepted', name_ar: 'مقبول', name_en: 'Accepted' },
    { val: 'rejected', name_ar: 'مرفوض', name_en: 'Rejected' },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeStatus = (e) => {
    setChosenStatus(e.target?.value);
  };

  const closeModal = () => {
    closeChangeStatusModal();
  };

  const onSubmit = async (fromData) => {
    setIsProcessing(true);

    const payload = {
      status: fromData.status,
    };
    try {
      const res = await panelApis.updateWithdrawal(payload, id);
      if (res.status) notify(res?.message, { type: 'success' });
      else notify(res?.message, { type: 'error' });
      updateTable({});
      closeModal();
    } catch (err) {
      notify(err?.message || err?.data?.message, { type: 'error' });
    } finally {
      setIsProcessing(false);
    }

    setIsProcessing(false);

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
          <form onSubmit={handleSubmit(onSubmit)} className='  w-full rounded px-1  pb-1 pt-6 md:px-8 '>
            <div>
              <div className='mb-1 flex items-center gap-2 '>
                <label className='mb-1 block text-sm font-bold '> {t('panel.popups.inputs.change_status')}</label>
                <span className='text-red-700'>*</span>
              </div>
              <div className='relative mb-8'>
                <span className={`  ${locale == 'en' ? 'right-2' : 'left-2 '}  absolute top-3 z-10 block cursor-pointer `}>
                  <ChavIcon />
                </span>

                <select
                  {...register('status', { ...VALIDATIONS.conditionalRequiredInput({ allowToValidate: true }) })}
                  value={chosenStatus.val}
                  onChange={(e) => changeStatus(e)}
                  className='w-full appearance-none rounded border border-gray-300 bg-gray-200/10 bg-white px-3 py-2 text-[18px] outline-none focus:border-blue-400 dark:border-slate-500 dark:bg-gray-500/10 dark:focus:border-blue-400  '
                >
                  <option className='' selected hidden value=''>
                    {t('panel.popups.inputs.change_status')}
                  </option>

                  {allStatus.map((status, idx) => (
                    <option key={idx} className='dark:bg-gray-500 ' value={status.val}>
                      {locale == 'ar' ? status?.name_ar : status?.name_en}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
                    <DangerIcon />
                    {errors.status.message}
                  </p>
                )}
              </div>
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
                disabled={isProcessing}
                className={`font-bol  h-full w-fit rounded border border-gray-300 px-6 py-2 text-green-700 hover:bg-green-300/20 hover:shadow-lg dark:border-slate-500 `}
                type='submit'
              >
                {isProcessing ? t('general.is_processing') : t('panel.popups.actions.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
