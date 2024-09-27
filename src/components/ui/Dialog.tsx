'use client';
import loading from '@/app/(pages)/loading';
import * as Icons from '@/assets/icons';
import React, { useEffect, createContext, useContext, useRef, ReactNode, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface DialogContextProps {
  onClose: () => void;
}

interface DialogProps extends HTMLAttributes<HTMLElement> {
  onClose: () => void;
  isScrollBlocked?: boolean;
  children: ReactNode;
  className?: string;
}
interface DialogHeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}
interface DialogComponent extends React.FC<DialogProps> {
  Header: React.FC<DialogHeaderProps>;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const Dialog: DialogComponent = ({ onClose, isScrollBlocked = false, children, className, ...props }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const showDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
    // for animation
    setTimeout(() => {
      onClose();
    }, 500);
  };
  useEffect(() => {
    if (!isScrollBlocked) return;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isScrollBlocked]);

  useEffect(() => {
    if (dialogRef.current) {
      showDialog();
    }
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeDialog();
    }
  };

  const status = { loading: 'Loading', error: 'Error', success: 'Success' } as const;
  type Status = (keyof typeof status)[number];

  return (
    <DialogContext.Provider value={{ onClose: closeDialog }}>
      <dialog
        ref={dialogRef}
        className={twMerge(
          'backdrop:bg-slate-600/10 backdrop:backdrop-blur-[1px] backdrop:backdrop-filter',
          'dialog-animation',
          ' m-auto bg-transparent  p-0'
        )}
        onClick={onBackdropClick}
        onClose={() => closeDialog()}
        {...props}
      >
        <div className={twMerge('max-h-[70vh] w-[90vw] max-w-[500px]  overflow-y-auto rounded-md bg-white p-2 sm:w-[70vw]', className)}>
          {children}
        </div>
      </dialog>
    </DialogContext.Provider>
  );
};

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className, ...headerProps }) => {
  const context = useContext(DialogContext);
  const { onClose } = context!; // Non-null assertion
  return (
    <header className={twMerge('flex w-full items-start justify-end rounded-t', className)} {...headerProps}>
      {children || (
        <button type='button' title='close button' className='h-6 w-6 rounded-md text-center text-white hover:bg-gray-300' onClick={onClose}>
          <Icons.Close />
        </button>
      )}
    </header>
  );
};

Dialog.Header = DialogHeader;

export default Dialog;
