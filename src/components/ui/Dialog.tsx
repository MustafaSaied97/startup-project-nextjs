'use client';
import React, { useRef, useEffect } from 'react';

export default function Dialog() {
  // const [isOpenDialog,setIsOpenDialog]=us;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showDialog = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const closeDialogOnOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Check if the click happened outside the dialog content
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };
  // useEffect(() => {
  //   // if (!isScrollBlocked) return;
  //   document.documentElement.style.overflow = 'hidden';
  //   return () => {
  //     document.documentElement.style.overflow = '';
  //   };
  // }, []);
  const onCloseDialog = (e: React.ToggleEvent<HTMLDialogElement>) => {
    console.log('dialog is closed');
  };

  return (
    <>
      <button onClick={showDialog}>Open Dialog</button>

      <dialog
        ref={dialogRef}
        className='dialog-animation m-auto bg-transparent p-0 backdrop:bg-slate-600/10 backdrop:backdrop-blur-[1px] backdrop:backdrop-filter'
        onClick={closeDialogOnOutsideClick}
        onClose={onCloseDialog}
      >
        <div className='rounded-md bg-gray-300 p-4'>
          <h1>Hello from dialog</h1>
          <button onClick={closeDialog}>Close</button>
        </div>
        <main></main>
      </dialog>
    </>
  );
}
