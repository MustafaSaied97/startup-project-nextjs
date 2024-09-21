// src/components/ui/Button.d.ts
import * as React from 'react';

export type ButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  text: string;
  disabled?: boolean;
  isProcessing?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

declare const Button: React.FC<ButtonProps>;

export default Button;
