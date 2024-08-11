'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { ChavIcon, DangerIcon } from '@/assets/icons/components';
import { useLocale } from 'next-intl';
import { panelApis } from '@/services/apis';

export default function WithdrawalRequest({ closeRequestModal, updateTable }) {
  const locale = useLocale();
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [chosenPymentMethod, setChosenPymentMethod] = useState('');
  const [minimumWithdrawal, setMinimumWithdrawal] = useState('');
  const allPaymentMethods = [
    'Bitcoin',
    'Ethereum',
    'XRP',
    'Bitcoin Cash',
    'Litecoin',
    'Dash',
    'Litecoin Testnet',
    'ERC-20 Tether',
    'ERC-20 USD Coin',
    'ERC-20 DAI',
    'TRON',
    'TRC-20 Tether',
    'Stellar',
    ' Polkadot',
    'Dogecoin',
    'Cosmos',
    'Binance Smart Chain',
  ];
  const {
    register,
    handleSubmit,

    formState: { errors },
    setValue,
  } = useForm();

  const changeChosenMethod = (e) => {
    setChosenPymentMethod(e.target?.value);
  };

  const closeModal = () => {
    closeRequestModal();
  };

  const changePaymentType = (bool) => {
    setIsCrypto(bool);
    if (bool) setValue('paypal_email', '');
    else {
      setValue('crypto_address', '');
      setValue('crypto_type', '');
    }
  };

  const onSubmit = async (fromData) => {
    setIsProcessing(true);

    const payload = {};
    payload.payment_method = isCrypto ? 'crypto' : 'paypal';
    fromData.amount && (payload.amount = fromData.amount);
    fromData.crypto_address && isCrypto && (payload.crypto_address = fromData.crypto_address);
    fromData.crypto_type && isCrypto && (payload.crypto_type = fromData.crypto_type);
    fromData.paypal_email && !isCrypto && (payload.paypal_email = fromData.paypal_email);

    try {
      const res = await panelApis.addWithdrawal(payload);

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

  const getWithdrawalsInfo = async () => {
    try {
      const res = await panelApis.withdrawalsInfo();
      setMinimumWithdrawal(res.data?.minimum_amount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWithdrawalsInfo();
  }, []);

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
          <h3 className='font=semibold text-center text-3xl'> {t(`panel.popups.title.add_withdrawal`)}</h3>
          <button className=' h-6 w-6 rounded-md bg-blue-600 text-center text-white hover:bg-blue-300 ' onClick={closeModal}>
            x
          </button>
        </div>
        {/* modal body */}
        <div className=' relative flex-auto p-6'>
          {minimumWithdrawal ? <h5 className='font=semibold text-center text-xl'> {t(`panel.popups.inputs.minimum_request`, { num: minimumWithdrawal })}</h5> : ''}

          <form onSubmit={handleSubmit(onSubmit)} className='  w-full rounded px-1  pb-1 pt-6 md:px-8 '>
            <div className='mb-4 mt-2 flex flex-col justify-evenly gap-4 md:flex-row'>
              <div className='flex flex-col items-center gap-2'>
                <label for='paypal'>{t('panel.popups.actions.paypal')}</label>
                <input className='h-7 w-7 cursor-pointer' type='radio' id='paypal' value='paypal' name='add-type' onChange={() => changePaymentType(false)} checked={!isCrypto} />
              </div>
              <div className='flex flex-col items-center gap-2'>
                <label for='crypto'>{t('panel.popups.actions.crypto')}</label>
                <input className='h-7 w-7 cursor-pointer' type='radio' id='crypto' value='crypto' name='add-type' onChange={() => changePaymentType(true)} checked={isCrypto} />
              </div>
            </div>
            <div className='mb-5'>
              <div className='mb-1 flex items-center gap-2 '>
                <label className='mb-1 block text-sm font-bold '> {t('panel.popups.inputs.amount')}</label>
                <span className='text-red-700'>*</span>
              </div>
              <input
                {...register('amount', { ...VALIDATIONS.positive_number_request({ dollars: minimumWithdrawal }) })}
                placeholder={t('panel.popups.inputs.amount')}
                className='w-full  appearance-none rounded border border-gray-300 bg-gray-200/10 px-3 py-2 text-[18px] outline-none focus:border-blue-400 dark:border-slate-500 dark:bg-gray-500/10 dark:focus:border-blue-400  '
              />
              {/* for errors */}
              {errors.amount && (
                <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
                  <DangerIcon />
                  {errors.amount.message}
                </p>
              )}
            </div>

            {!isCrypto ? (
              <>
                <div className='mb-5'>
                  <div className='mb-1 flex items-center gap-2 '>
                    <label className='mb-1 block text-sm font-bold '> {t('panel.popups.inputs.paypal_email')}</label>
                    <span className='text-red-700'>*</span>
                  </div>
                  <input
                    {...register('paypal_email', { ...VALIDATIONS.withdrawalEmail({ allowToValidate: !isCrypto }) })}
                    placeholder={t('panel.popups.inputs.paypal_email')}
                    className='w-full  appearance-none rounded border border-gray-300 bg-gray-200/10 px-3 py-2 text-[18px] outline-none focus:border-blue-400 dark:border-slate-500 dark:bg-gray-500/10 dark:focus:border-blue-400  '
                  />
                  {/* for errors */}
                  {errors.paypal_email && (
                    <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
                      <DangerIcon />
                      {errors.paypal_email.message}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className='mb-5'>
                  <div className='mb-1 flex items-center gap-2 '>
                    <label className='mb-1 block text-sm font-bold '> {t('panel.popups.inputs.crypto_address')}</label>
                    <span className='text-red-700'>*</span>
                  </div>
                  <input
                    {...register('crypto_address', { ...VALIDATIONS.conditionalRequiredInput({ allowToValidate: isCrypto }) })}
                    placeholder={t('panel.popups.inputs.crypto_address')}
                    className='w-full  appearance-none rounded border border-gray-300 bg-gray-200/10 px-3 py-2 text-[18px] outline-none focus:border-blue-400 dark:border-slate-500 dark:bg-gray-500/10 dark:focus:border-blue-400  '
                  />
                  {/* for errors */}
                  {errors.crypto_address && (
                    <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
                      <DangerIcon />
                      {errors.crypto_address.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className='mb-1 flex items-center gap-2 '>
                    <label className='mb-1 block text-sm font-bold '> {t('panel.popups.inputs.crypto_type')}</label>
                    <span className='text-red-700'>*</span>
                  </div>
                  <div className='relative'>
                    <span className={`  ${locale == 'en' ? 'right-2' : 'left-2 '}  absolute top-3 z-10 block cursor-pointer `}>
                      <ChavIcon />
                    </span>

                    <select
                      {...register('crypto_type', { ...VALIDATIONS.conditionalRequiredInput({ allowToValidate: isCrypto }) })}
                      value={chosenPymentMethod}
                      onChange={(e) => changeChosenMethod(e)}
                      className='w-full appearance-none rounded border border-gray-300 bg-gray-200/10 bg-white px-3 py-2 text-[18px] outline-none focus:border-blue-400 dark:border-slate-500 dark:bg-gray-500/10 dark:focus:border-blue-400  '
                    >
                      <option className='' selected hidden value=''>
                        {t('panel.popups.inputs.choose_pyment_method')}
                      </option>

                      {allPaymentMethods.map((method, idx) => (
                        <option key={idx} className='dark:bg-gray-500 ' value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                    {errors.crypto_type && (
                      <p className=' flex items-center gap-1 text-[clamp(.5rem,_100%,_0.875rem)] font-normal text-[--canceled-clr]'>
                        <DangerIcon />
                        {errors.crypto_type.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

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
