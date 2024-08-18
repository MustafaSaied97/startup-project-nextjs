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
      <Modal isOpen={true} onClose={closeModal}>
        <Modal.Header onClose={closeModal} />
        <Modal.Body>
          <h1 className='text-center text-lg font-normal sm:text-xl'>{'general.cancel_order'}</h1>
          <h4 className='text-center text-sm font-normal text-slate-500 sm:text-base'>{'general.cancel_order_hint'}</h4>
          <div className='m-0 h-fit w-full p-0'>body</div>
        </Modal.Body>
        <Modal.Footer onClose={closeModal} />
      </Modal>
    </>
  );
}
