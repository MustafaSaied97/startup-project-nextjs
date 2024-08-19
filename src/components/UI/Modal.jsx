'use client';
import React, { useState } from 'react';
import * as Icons from '@/assets/icons';

const Modal = ({ isOpen, onClose, maxWidth = 500, backgroundColor = 'var(--tr-bg)', children, ...modalProps }) => {
  if (!isOpen) return null;

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
      {/* backdrop */}
      <div onClick={onClose} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/20 dark:bg-gray-900/30'></div>
      {/* modal structure */}
      <div
        className='relative z-10 flex max-h-[70vh] w-[90%]  flex-col gap-y-2 overflow-y-auto rounded-lg border-0  px-6 py-3 shadow-lg sm:w-[70%]'
        style={{ maxWidth, backgroundColor }}
        {...modalProps}
      >
        {children}
      </div>
    </section>
  );
};

Modal.Header = ({ children, className = 'flex w-full items-start justify-end rounded-t ', onClose, ...headerProps }) => {
  return (
    <header className={`${className}`} {...headerProps}>
      {children || (
        <button className='h-6 w-6 rounded-md text-center text-white hover:bg-gray-300' onClick={onClose}>
          <Icons.Close />
        </button>
      )}
    </header>
  );
};

Modal.Body = ({ children, className = 'relative w-full', ...bodyProps }) => {
  return (
    <main className={`${className}`} {...bodyProps}>
      {children}
    </main>
  );
};

Modal.Footer = ({ children, className = 'flex h-[40px] items-center justify-between gap-4 border-solid', ...footerProps }) => {
  return (
    <footer className={`${className}`} {...footerProps}>
      {children}
    </footer>
  );
};

export default Modal;
