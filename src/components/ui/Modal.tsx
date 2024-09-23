'use client';
import * as Icons from '@/assets/icons';
import React, { useEffect, createContext, useContext, HTMLAttributes, ReactNode, HtmlHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';
interface ModalContextProps {
  onClose: () => void;
}
interface ModalProps extends HTMLAttributes<HTMLElement> {
  onClose: () => void;
  isScrollBlocked?: boolean;
  children: ReactNode;
  className?: string;
}
interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}
interface ModalBodyProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}
interface ModalFooterProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

interface ModalComponent extends React.FC<ModalProps> {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
}

const ModalContext = createContext<ModalContextProps>({ onClose: () => {} });

const Modal: ModalComponent = ({ onClose, isScrollBlocked = false, children, className, ...props }) => {
  useEffect(() => {
    if (!isScrollBlocked) return;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);
  const closeModal = () => {
    // for animation
    setTimeout(() => {
      onClose();
    }, 500);
  };
  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ onClose: closeModal }}>
      <section className=' starting-style:opacity-0 transition-allow-discrete fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden opacity-100 outline-none transition-all duration-500 focus:outline-none'>
        <div
          onClick={closeModal}
          className='starting-style:opacity-0 transition-allow-discrete  fixed z-0 h-screen w-screen bg-gray-500/20 opacity-100 backdrop-blur-[1px] backdrop-filter transition-all duration-500'
        ></div>
        <div
          className={twMerge(
            'relative z-10 flex max-h-[70vh] w-[90%] max-w-[500px] flex-col gap-y-2 overflow-y-auto rounded-lg border-0 px-6 py-4 shadow-lg sm:w-[70%]',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </section>
    </ModalContext.Provider>,
    document.body
  );
};

const Header: React.FC<ModalHeaderProps> = ({ children, className, ...headerProps }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <header className={twMerge('flex w-full items-start justify-end rounded-t ', className)} {...headerProps}>
      {children || (
        <button type='button' className='h-6 w-6 rounded-md text-center text-white hover:bg-gray-300' onClick={onClose}>
          <Icons.Close />
        </button>
      )}
    </header>
  );
};

const Body: React.FC<ModalBodyProps> = ({ children, className, ...bodyProps }) => {
  return (
    <main className={twMerge('relative w-full', className)} {...bodyProps}>
      {children}
    </main>
  );
};

const Footer: React.FC<ModalFooterProps> = ({ children, className, ...footerProps }) => {
  return (
    <footer className={twMerge('flex h-[40px] items-center justify-between gap-4 border-solid', className)} {...footerProps}>
      {children}
    </footer>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
