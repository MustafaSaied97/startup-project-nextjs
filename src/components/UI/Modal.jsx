'use client';
import React, { useState } from 'react';
import * as Icons from '@/assets/icons';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
      {/* backdrop */}
      <div onClick={onClose} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/20 dark:bg-gray-900/30'></div>
      {/* modal structure */}
      <div className='relative z-10 flex max-h-[70vh] w-[90%] max-w-[500px] flex-col overflow-y-auto rounded-lg border-0 bg-[--tr-bg] px-6 py-3  shadow-lg outline-none focus:outline-none sm:w-[70%] md:w-[60%] lg:w-[50%]'>
        {children}
      </div>
    </section>
  );
};

Modal.Header = ({ onClose }) => (
  <header className='flex w-full items-start justify-end rounded-t border-gray-300'>
    <button className='h-6 w-6 rounded-md text-center text-white hover:bg-gray-300' onClick={onClose}>
      <Icons.Close />
    </button>
  </header>
);

Modal.Body = ({ children }) => (
  <main className='relative flex w-full flex-auto flex-col items-center justify-between gap-3 rounded pb-8 pt-2'>{children}</main>
);

Modal.Footer = ({ onClose }) => (
  <footer className='flex h-[40px] items-center justify-between gap-4 border-solid'>
    <button
      className='h-full w-full rounded-md border border-[var(--primary-clr)] p-2 text-sm font-bold text-[var(--primary-clr)] hover:shadow-lg dark:shadow-gray-900'
      type='button'
      onClick={onClose}
    >
      {'general.cancel'}
    </button>
    <button
      className='h-full w-full rounded-md border border-[var(--primary-clr)] bg-[var(--primary-clr)] p-2 text-sm font-bold text-white hover:shadow-lg dark:shadow-gray-900'
      type='button'
    >
      {'cancel_order'}
    </button>
  </footer>
);

export default Modal;
