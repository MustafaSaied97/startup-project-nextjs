'use client';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATIONS, notify } from '@/utils';
import { useTranslations } from 'next-intl';
import useRequest from '@/hooks/useRequest';
import useRequestCached from '@/hooks/useRequestCached';
import { apis } from '@/services/apis';
import {
  Button,
  CustomReactSelect,
  Input,
  Modal,
  Select,
  ImgInputWithPreview,
  ColorPickerWithPreview,
  CustomDataPicker,
  DatePicker,
} from '@/components/ui';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { useClient } from '@/hooks';
export default function FormModal() {
  const isClient = useClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locale } = useLocale();
  const t = useTranslations();

  const [isProcessing, setIsProcessing] = useState(false);
  const { resData } = useRequestCached({ queryFn: apis.getCountries, queryKey: 'getCountries' });
  // const { resData } = useRequest({ queryFn: apis.getCountries, queryKey: 'getCountries', isImmediate: false });
  const countryOptions = useMemo(
    () => (resData ? resData.data.map((country) => ({ value: country.id, label: country?.[`name_${locale}`] })) : []),
    [resData]
  );

  const roles = [
    { name: t('general.user'), value: 'user' },
    { name: t('general.reseller'), value: 'reseller' },
  ];

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      roleType: roles?.[0]?.value,
      logo: '',
      identity_color: '',
      fullName: '',
      email: '',
      country: null,
      country2: null,
      start_date: '',
      end_date: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (fromData) => {
    console.log('fromData', fromData);
  };

  useEffect(() => {
    if (isModalOpen) return;
    reset();
  }, [isModalOpen]);

  return (
    <>
      {isClient && (
        <button onClick={() => setIsModalOpen(true)} className='text-red-400'>
          form modal
        </button>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          style={{ maxHeight: '100vh', maxWidth: '700px', backgroundColor: 'var(--pr-bg)', color: 'var(--pr-text)' }}
        >
          <Modal.Header className='-mb-2 flex justify-end' />
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} action='' className='flex w-full flex-col gap-3'>
              <h4 className=' text-2xl font-semibold'>{t('general.create_account_title')}</h4>
              <p className='mb-7 text-base font-normal capitalize leading-none text-slate-500'>{t('general.signup_hint')}</p>
              <div>
                <h4 className='text-base font-medium text-gray-700 dark:text-gray-400' htmlFor='full-name'>
                  {t('general.signup_hint_role')}
                </h4>
                <div className='relative mt-2 flex items-center justify-between gap-2'>
                  {roles.map((role, index) => (
                    <label
                      key={index}
                      className={`flex w-full cursor-pointer justify-start rounded-md border p-3 ps-11 ${watch('roleType') == role.value ? 'border-[var(--primary-clr)] bg-[var(--primary-clr-15)] text-[var(--primary-clr)]' : 'text-gray-400'}`}
                      htmlFor={role.value}
                    >
                      <input
                        className="border-secondary-500 before:shadow-checkbox checked:focus:before:shadow-checkbox relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[var(--primary-clr)] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-[var(--primary-clr)] checked:after:bg-[var(--primary-clr)] checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-[var(--primary-clr)] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-400 dark:checked:border-[var(--primary-clr)] rtl:float-right"
                        type='radio'
                        name='roleType'
                        id={role.value}
                        value={role.value}
                        checked={watch('roleType') == role.value}
                        {...register('roleType')}
                      />
                      <span className={`mt-px inline-block ps-[0.15rem] capitalize`}>{role.name} </span>
                    </label>
                  ))}
                </div>
              </div>
              <ImgInputWithPreview name='logo' label={t('general.upload_store_logo')} rules={VALIDATIONS.required} control={control} />
              <Input name={'fullName'} rules={VALIDATIONS.name} label={t('general.full_name')} type='text' control={control} />
              <Input name={'email'} rules={VALIDATIONS.email} label={t('general.email')} type='text' control={control} />
              <CustomReactSelect
                name={'country'}
                rules={VALIDATIONS.required}
                label={t('general.country')}
                placeholder={`${t('general.country')}...`}
                options={countryOptions}
                control={control}
              />

              <Select
                name={'country2'}
                rules={VALIDATIONS.required}
                label={t('general.country_native')}
                placeholder={`${t('general.country')}...`}
                options={countryOptions}
                control={control}
              />
              <ColorPickerWithPreview
                name='identity_color'
                label={t('general.select_the_store_identity_color')}
                rules={VALIDATIONS.required}
                control={control}
              />
              <div className='relative flex items-center justify-between gap-5'>
                <div className='flex-1'>
                  {/* <CustomDataPicker
                    control={control}
                    name='start_date'
                    maxDate={watch('end_date')}
                    label='Voting start Date'
                    placeholder='Voting start Date'
                    rules={VALIDATIONS.required}
                  /> */}
                  <DatePicker
                    control={control}
                    name='start_date'
                    maxDate={watch('end_date')}
                    label='Voting start Date'
                    placeholder='Voting start Date'
                    rules={VALIDATIONS.required}
                  />
                </div>
                <div className='flex-1'>
                  <CustomDataPicker
                    control={control}
                    name='end_date'
                    minDate={watch('start_date')}
                    label='Voting end Date'
                    placeholder='Voting end Date'
                    rules={VALIDATIONS.required}
                  />
                </div>
              </div>
              <Input name={'password'} rules={VALIDATIONS.password} label={t('general.password')} type='password' control={control} />
              <Input
                name={'confirmPassword'}
                rules={VALIDATIONS.confirmPassword({ passwordVal: watch('password') })}
                label={t('general.confirm_password')}
                type='password'
                control={control}
              />

              <Button text={t('general.create_account')} type='submit' isProcessing={isProcessing} />
              <p className='text-center'>
                <span className='text-base font-normal capitalize  leading-none tracking-tight text-gray-700 dark:text-gray-400'>
                  {t('general.already_have_account')}{' '}
                </span>
                <Link href={'/'} className='text-base font-semibold capitalize  leading-none tracking-tight text-[var(--primary-clr)] underline'>
                  {t('general.login')}
                </Link>
              </p>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className='h-full w-full rounded-md border border-[var(--primary-clr)] p-2 text-sm font-bold text-[var(--primary-clr)] hover:shadow-lg dark:shadow-gray-900'
              type='button'
              onClick={() => setIsModalOpen(false)}
            >
              {'general.cancel'}
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
