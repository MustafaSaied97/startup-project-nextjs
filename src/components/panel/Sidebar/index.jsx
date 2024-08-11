'use client';

import React, { useState } from 'react';
import { Link, usePathname } from '@/navigation';
import { ROUTES_PATH } from '@/utils';
import {
  MyStoreIcon,
  ManageWebsiteIcon,
  AdminsIcon,
  ResellersIcon,
  InfoIcon,
  CategoriesIcon,
  DashboardIcon,
  LogoutIcon,
  ProductsIcon,
  UserIcons,
  OffersIcon,
  OrdersIcon,
  StorePaneltIcon,
  WithdrawalIcon,
  MessageIcon,
} from '@/assets/icons/components';
import Group from './Group';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { LogoutModal } from '@/components';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { role } = useSelector((state) => state.auth.authData);
  const allAuthData = useSelector((state) => state.auth.authData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();
  const t = useTranslations();
  console.log('allAuthData', allAuthData);
  return (
    <>
      {isModalOpen && <LogoutModal closeModal={() => setIsModalOpen(false)} />}

      <div id='sidebar-backdrop' onClick={() => setSidebarOpen(false)} className={`fixed ${sidebarOpen ? 'block' : 'hidden'} top-0 z-10 h-screen w-screen cursor-pointer bg-black/10 sm:hidden`}></div>
      <aside
        id='panel-aside'
        className={` ${sidebarOpen ? 'left-0 sm:w-64' : 'left-[-100%]  sm:w-[4rem]'} fixed  z-20 h-[--panel-sidebar-height] overflow-y-auto   overflow-x-hidden border-e border-gray-200 bg-[--panel-bg-2] px-4 py-4 transition-all duration-200 dark:border-gray-700  sm:relative  sm:inset-0 sm:px-3`}
        tabIndex={-1}
      >
        <h5 className={`${sidebarOpen ? 'inline' : 'hidden'} text-base font-semibold uppercase text-gray-500 dark:text-gray-400`}>{t('panel.sidebar.menu')}</h5>
        <ul className='space-y-2 overflow-x-hidden py-4 font-medium'>
          <li>
            <Link
              href={ROUTES_PATH.panel.home}
              className={`group ${ROUTES_PATH.panel.home === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              <DashboardIcon />
              <span className='ms-3'>{t('panel.sidebar.dashboard')}</span>
            </Link>
          </li>
          {/* <li>
            <Group
              Button={({ toggle, isOpen }) => (
                <button
                  className='group flex w-full items-center rounded-lg p-2 text-base text-gray-900  transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                  onClick={toggle}
                >
                  <icons.Ecommerce />
                  <span className='ms-3 flex-1 whitespace-nowrap text-left rtl:text-right'>E-commerce</span>
                  <svg className={`${isOpen ? 'rotate-180' : ''} duration-200h-3 w-3 transition-transform `} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m1 1 4 4 4-4' />
                  </svg>
                </button>
              )}
              List={({ isOpen }) => (
                <ul className={`${isOpen ? '' : 'hidden'} space-y-2 py-2`}>
                  <li>
                    <Link href='#' className='group flex w-full items-center gap-3 rounded-lg p-2  text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'>
                      <icons.Cart />
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='group flex w-full items-center gap-3 rounded-lg p-2  text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'>
                      <icons.Billing />
                      Billing
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='group flex w-full items-center gap-3 rounded-lg p-2  text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'>
                      <icons.Invoice />
                      Invoice
                    </Link>
                  </li>
                </ul>
              )}
            />
          </li> */}
          {/* {role == 'admin' ? ( */}
          <li>
            <Link
              href={ROUTES_PATH.panel.products}
              className={`group ${ROUTES_PATH.panel.products === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              <ProductsIcon />
              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.products')}</span>
              {/* <span className='ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300'>Pro</span> */}
            </Link>
          </li>
          {/* ) :""} */}
          {role == 'admin' ? (
            <li>
              <Link
                href={ROUTES_PATH.panel.categories}
                className={`group ${ROUTES_PATH.panel.categories === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
              >
                <CategoriesIcon />

                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.categories')}</span>
                {/* <span className='ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300'>3</span> */}
              </Link>
            </li>
          ) : (
            ''
          )}
          {role == 'admin' ? (
            <li>
              <Link
                href={ROUTES_PATH.panel.admins}
                className={`group ${ROUTES_PATH.panel.admins === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
              >
                <AdminsIcon />
                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.admins')}</span>
              </Link>
            </li>
          ) : (
            ''
          )}
          {role == 'admin' ? (
            <li>
              <Link
                href={ROUTES_PATH.panel.resellers}
                className={`group ${ROUTES_PATH.panel.resellers === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
              >
                <ResellersIcon />
                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.resellers')}</span>
              </Link>
            </li>
          ) : (
            ''
          )}
          <li>
            <Link
              href={ROUTES_PATH.panel.users}
              className={`group ${ROUTES_PATH.panel.users === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}

              // className={`group  ${ROUTES_PATH.panel.users === pathname ? 'bg-gray-200 dark:hover:bg-gray-700' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              <UserIcons />
              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.users')}</span>
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES_PATH.panel.offers}
              className={`group ${ROUTES_PATH.panel.offers === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              {/* <UserIcons/> */}
              <div>
                <OffersIcon />
              </div>

              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.offers')}</span>
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES_PATH.panel.orders}
              className={`group ${ROUTES_PATH.panel.orders === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              {/* <UserIcons/> */}
              <div>
                <OrdersIcon />
              </div>

              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.orders')}</span>
            </Link>
          </li>
          {role == 'admin' ? (
            <li>
              <Link
                href={ROUTES_PATH.panel.store}
                className={`group ${ROUTES_PATH.panel.store === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
              >
                {/* <UserIcons/> */}
                <div>
                  <StorePaneltIcon />
                </div>

                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.store')}</span>
              </Link>
            </li>
          ) : (
            ''
          )}

          {role == 'reseller' ? (
            <li>
              <Link
                href={ROUTES_PATH.panel.myStore}
                className={`group ${ROUTES_PATH.panel.myStore === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
              >
                {/* <UserIcons/> */}
                <div>
                  <StorePaneltIcon />
                </div>

                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.my_store')}</span>
              </Link>
            </li>
          ) : (
            ''
          )}

          <li>
            <Link
              href={ROUTES_PATH.panel.withdrawal}
              className={`group ${ROUTES_PATH.panel.withdrawal === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              {/* <UserIcons/> */}
              <div>
                <WithdrawalIcon />
              </div>

              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.withdrawal')}</span>
            </Link>
          </li>

          {role == 'admin' ? (
            <li>
              <Link
                href={ROUTES_PATH.panel.manageWebsite}
                className={`group ${ROUTES_PATH.panel.manageWebsite === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
              >
                {/* <icons.Products /> */}
                <ManageWebsiteIcon color='text-gray-500' />
                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.website')}</span>
              </Link>
            </li>
          ) : (
            ''
          )}
          <li>
            <Link
              href={ROUTES_PATH.panel.customerSupport}
              className={`group ${ROUTES_PATH.panel.customerSupport === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              <MessageIcon />
              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.customer_support')}</span>
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES_PATH.panel.info}
              className={`group ${ROUTES_PATH.panel.info === pathname ? 'bg-gray-200 dark:bg-gray-700 ' : ''} flex items-center rounded-lg p-2 text-gray-900 dark:text-white  dark:hover:bg-gray-700 `}
            >
              <InfoIcon />
              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.info')}</span>
            </Link>
          </li>
          {role == 'reseller' && allAuthData?.store?.domain ? (
            <li>
              <a
                href={allAuthData?.store?.domain.startsWith('http') ? allAuthData?.store?.domain : `http://${allAuthData?.store?.domain}`}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
              >
                <MyStoreIcon />
                <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.my_store')}</span>
              </a>
            </li>
          ) : (
            ''
          )}
          <li>
            <button onClick={() => setIsModalOpen(true)} className='group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'>
              <LogoutIcon />
              <span className='ms-3 flex-1 whitespace-nowrap'>{t('panel.sidebar.logout')}</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
