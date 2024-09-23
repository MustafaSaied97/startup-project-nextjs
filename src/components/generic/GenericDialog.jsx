'use client';
import { useState } from 'react';
import { Dialog } from '../ui';

export default function GenericDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsDialogOpen(true)} className='text-red-400'>
        open Dialog
      </button>
      {isDialogOpen && (
        <Dialog onClose={() => setIsDialogOpen(false)}>
          <Dialog.Header />
          <main className=''>
            <h1 className='text-center text-lg font-normal sm:text-xl'>{'general.cancel_order'}</h1>
            <h4 className='text-center text-sm font-normal text-slate-500 sm:text-base'>{'general.cancel_order_hint'}</h4>
            <div className='m-0 h-fit w-full p-0'>body</div>
          </main>
        </Dialog>
      )}
    </>
  );
}
