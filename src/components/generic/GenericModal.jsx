'use client';

import React, { useState } from 'react';
import { Modal } from '../UI';

export default function GenericModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => setIsOpenModal(false);

  return (
    <>
      <button onClick={() => setIsOpenModal((prev) => !prev)} className='text-red-400'>
        modal
      </button>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <Modal.Header onClose={closeModal} />
        <Modal.Body>
          <h1 className='text-center text-lg font-normal sm:text-xl'>{'general.cancel_order'}</h1>
          <h4 className='text-center text-sm font-normal text-slate-500 sm:text-base'>{'general.cancel_order_hint'}</h4>
          <div className='m-0 h-fit w-full p-0'>body</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='h-full w-full rounded-md border border-[var(--primary-clr)] p-2 text-sm font-bold text-[var(--primary-clr)] hover:shadow-lg dark:shadow-gray-900'
            type='button'
            onClick={closeModal}
          >
            {'general.cancel'}
          </button>
          <button
            className='h-full w-full rounded-md border border-[var(--primary-clr)] bg-[var(--primary-clr)] p-2 text-sm font-bold text-white hover:shadow-lg dark:shadow-gray-900'
            type='button'
          >
            {'cancel_order'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
