'use client';
import { useSelector } from 'react-redux';

import React from 'react';

export default function LoginIcon({ color }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const defaultColor = currentTheme === 'light' ? '#969696' : '#CDCDCD';
  color = color || defaultColor;
  return (
    <svg width={24} height={24} viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 1L14 1V14H7V13H13V2L7 2V1ZM7.85355 4.14645L11.1932 7.48614L7.8674 11.0891L7.13259 10.4109L9.358 8L0.999996 8V7L9.29289 7L7.14644 4.85355L7.85355 4.14645Z'
        fill={color}
      />
    </svg>
  );
}

