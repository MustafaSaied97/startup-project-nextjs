'use client';
import { useState } from 'react';
import { Modal } from '../UI';

export default function FormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className='text-red-400'>
        modal
      </button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Modal.Header />
          <Modal.Body>
            <h1 className='text-center text-lg font-normal sm:text-xl'>{'general.cancel_order'}</h1>
            <h4 className='text-center text-sm font-normal text-slate-500 sm:text-base'>{'general.cancel_order_hint'}</h4>
            <div className='m-0 h-fit w-full p-0'>body</div>
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
