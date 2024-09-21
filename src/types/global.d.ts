// src/types/global.d.ts
import React from 'react';

// Global declaration of common React events
declare global {
  type MousEvent = React.MouseEvent<HTMLButtonElement>;
  type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type FormEvent = React.FormEvent<HTMLFormElement>;
  type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;
  // You can add more as needed
}
