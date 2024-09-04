'use client';
import * as Icons from '@/assets/icons';
import React, { useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = createContext();

const Modal = ({ onClose, isScrollBlocked = true, children, ...props }) => {
  useEffect(() => {
    if (!isScrollBlocked) return;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <section className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none '>
        <div onClick={onClose} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/20'></div>
        <div
          className='relative z-10 flex max-h-[70vh] w-[90%] max-w-[500px] flex-col gap-y-2 py-4 overflow-y-auto rounded-lg border-0 px-6   shadow-lg sm:w-[70%]'
          {...props}
        >
          {children}
        </div>
      </section>
    </ModalContext.Provider>,
    document.body
  );
};

const Header = ({ children, className = 'flex w-full items-start justify-end rounded-t ', ...headerProps }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <header className={`${className}`} {...headerProps}>
      {children || (
        <button type='button' className='h-6 w-6 rounded-md text-center text-white hover:bg-gray-300' onClick={onClose}>
          <Icons.Close />
        </button>
      )}
    </header>
  );
};

const Body = ({ children, className = 'relative w-full', ...bodyProps }) => {
  return (
    <main className={`${className}`} {...bodyProps}>
      {children}
    </main>
  );
};

const Footer = ({ children, className = 'flex h-[40px] items-center justify-between gap-4 border-solid', ...footerProps }) => {
  return (
    <footer className={`${className}`} {...footerProps}>
      {children}
    </footer>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
