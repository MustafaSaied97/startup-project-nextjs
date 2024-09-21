import * as React from 'react';
import Button from '@/components/ui/Button';

declare module '@/components/ui' {
  export type ButtonProps = {
    type?: 'button' | 'reset' | 'submit';
    text: string;
    disabled?: boolean;
    isProcessing?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;

  // Declare Button with its props
  // for named export
  export const Button: React.FC<ButtonProps>;
  // for default export
  // const Button: React.FC<ButtonProps>
  //   export default Button;
}
