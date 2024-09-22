'use client';
import React, { useRef } from 'react';

export default function Dialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const closeDialogOnOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Check if the click happened outside the dialog content
    if (e.target === dialogRef.current) {
      // dialogRef.current?.close();
    }
    console.table({ 'e.target': e.target, 'dialogRef.current': dialogRef.current });
  };

  return (
    <>
      <button onClick={showDialog}>Open Dialog</button>

      <dialog ref={dialogRef} className='dialog-with-animation m-auto bg-gray-300 p-0' onClick={closeDialogOnOutsideClick}>
        <div className='p-4'>
          <h1>Hello from dialog</h1>
          <button onClick={closeDialog}>Close</button>
        </div>
      </dialog>
    </>
  );
}
