'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import DeleteModal from './DeleteModal';
import DetailsModal from "./DetailsModal"
import WithdrawalRequest from './WithdrawalRequest';
import ChangeStatus from './ChangeStatus';
import { ChangeIcon, DeleteIcon , FeedbackIcon } from '@/assets/icons/components';
import { PanelTable } from '@/components';
import { useTranslations } from 'next-intl';
import { panelApis } from '@/services/apis';
import { notify } from '@/utils';
import { useSelector } from 'react-redux';
import { useLocale } from 'next-intl';

export default function Withdrawal() {
  const locale = useLocale();
  const { role } = useSelector((state) => state.auth.authData);

  const t = useTranslations();
  const [rowsData, setRowsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ state: false, id: null });
  const [addRequestModal, setAddrequestModal] = useState(false);
  const [detailsPopup, setDetailsModal] = useState({ state: false, item: null });
  const [changeStatusModal, setChangeStatusModal] = useState({ state: false, id: null });
  const [resData, setResData] = useState([]);

  const queries = useRef({
    pagination: {},
    search: '',
  });

  const openDetailsModal = ( item ) => {
    setDetailsModal((prev) => ({ state: true, item }))
    
  }
  const closeDetailsModal = ( ) => {
    setDetailsModal((prev) => ({ state: false, item: null }))
  }


  const onAddItem = () => {
    setAddrequestModal(true);
  };
  const closeRequestModal = () => {
    setAddrequestModal(false);
  };
  const onChangeItem = (id) => {
    setChangeStatusModal((prev) => ({ state: true, id }));
  };
  const closeChangeStatusModal = () => {
    setChangeStatusModal((prev) => ({ state: false, id: null }));
  };

  const onDeleteItem = (id) => {
    setDeleteModal((prev) => ({ state: true, id: id }));
  };
  const closeDeleteModal = () => {
    setDeleteModal((prev) => ({ state: false, id: null }));
  };

  const updateTable = async ({ search = queries.current.search, pagination = queries.current.pagination } = {}) => {
    setIsLoading(true);
    queries.current.search = search;
    queries.current.pagination = pagination;

    const queryObj = {
      ...(queries.current.search && { search: queries.current.search }),
      ...(queries.current.pagination.page && { page: queries.current.pagination.page }),
      ...(queries.current.pagination.size && { per_page: queries.current.pagination.size }),
    };

    setIsLoading(true);
    try {
      const res = await panelApis.getWithdrawals(queryObj);
      setRowsData(res?.data || []);
      const preparePagination = res;
      const { data, status, message, ...paginationData } = preparePagination;
      setResData(paginationData);
    } catch (err) {
      notify(t('general.err_msg'), { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateTable();
  }, []);

  const columnsData = useMemo(() => {
    const columns = [
      {
        label: role === 'admin' ? t('panel.table.name') : t('panel.table.id'),
        renderCell: (item) => (
          <div className='relative'>
            <div className='overflow-hidden'>{role === 'admin' ? item.user?.name : item.id}</div>
          </div>
        ),
      },
      {
        label: t('panel.table.amount'),
        renderCell: (item) => (
          <div className='relative'>
            <div className='overflow-hidden'>{item.amount}</div>
          </div>
        ),
      },
      {
        label: t('panel.table.payment_method'),
        renderCell: (item) => (
          <div className='relative'>
            <div className='overflow-hidden'>{item.payment_method}</div>
          </div>
        ),
      },
      {
        label: t('panel.table.date'),
        renderCell: (item) => (
          <div className='relative'>
            <div className='overflow-hidden'>{item.date}</div>
          </div>
        ),
      },
      {
        label: t('panel.table.status'),
        renderCell: (item) => (
          <div className='relative'>
            <div className='overflow-hidden'>{locale == 'ar' ? item.status_ar : item.status_en}</div>
          </div>
        ),
      },
    ];

    if (role === 'admin') {
      columns.push(
        
        {
        label: t('panel.table.action'),
        renderCell: (item) => (
          <ul className='flex w-full justify-center gap-2'>
                 <li
              onMouseDown={() => openDetailsModal(item)}
              className='flex cursor-pointer gap-2 rounded-[5px] bg-gray-100 px-4 py-2 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <FeedbackIcon />
              {t('panel.table.actions.details')}
            </li>
            <li
              onMouseDown={() => onChangeItem(item?.id)}
              className='flex cursor-pointer gap-2 rounded-[5px] bg-gray-100 px-4 py-2 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <ChangeIcon />
              {t('panel.table.actions.change_status')}
            </li>
            <li
              onMouseDown={() => onDeleteItem(item?.id)}
              className='flex cursor-pointer gap-2 rounded-[5px] bg-gray-100 px-4 py-2 hover:bg-red-100 dark:bg-gray-800 dark:hover:bg-red-600/20 dark:hover:text-white'
            >
              <DeleteIcon />
              {t('panel.table.actions.delete')}
            </li>
          </ul>
        ),
      });
    }

    return columns;
  }, [role, rowsData, t, onChangeItem, onDeleteItem]);

  return (
    <div className='flex  flex-col gap-6 bg-gray-200/30 p-3 shadow-md dark:bg-gray-200/10 dark:shadow-[#0000004f]'>
      {detailsPopup.state && <DetailsModal closeDetailsModal={closeDetailsModal} item={detailsPopup.item}  />}
      {addRequestModal && <WithdrawalRequest closeRequestModal={closeRequestModal} updateTable={updateTable} />}
      
      {changeStatusModal.state && <ChangeStatus id={changeStatusModal.id} closeChangeStatusModal={closeChangeStatusModal} updateTable={updateTable} />}

      {deleteModal.state && <DeleteModal id={deleteModal.id} closeDeleteModal={closeDeleteModal} updateTable={updateTable} />}
      <section className=' flex flex-col items-center justify-between gap-4 sm:flex-row'>
        <h1 className=' border-b pb-2  text-center text-3xl font-medium text-gray-400'> {t('panel.page_title.withdrawal')}</h1>
        {role == 'reseller' ? (
          <button onClick={onAddItem} className='flex items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-700 dark:bg-blue-600/40 dark:hover:bg-blue-700 '>
            {t('panel.popups.title.add_withdrawal')}
          </button>
        ) : (
          ''
        )}
      </section>
      <PanelTable id='withdrawal-table' isLoading={isLoading} updateTable={updateTable} columnsData={columnsData} rowsData={rowsData} resData={resData} isSearchable={true} isPagination={true} />
    </div>
  );
}
