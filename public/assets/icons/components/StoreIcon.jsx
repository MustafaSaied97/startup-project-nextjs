'use client';

import React from 'react';
import { useSelector } from 'react-redux';

export default function StoreIcon({ color }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const defaultColor = currentTheme === 'light' ? '#969696' : '#CDCDCD';
  color = color || defaultColor;
  return (
    <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Store Icon'>
        <path id='Vector' d='M4.5 13.0874V19.4999C4.5 19.6988 4.57902 19.8896 4.71967 20.0302C4.86032 20.1709 5.05109 20.2499 5.25 20.2499H18.75C18.9489 20.2499 19.1397 20.1709 19.2803 20.0302C19.421 19.8896 19.5 19.6988 19.5 19.4999V13.0874' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_2' d='M5.0625 3.75H18.9375C19.1002 3.75134 19.2582 3.8049 19.3881 3.9028C19.5181 4.00069 19.6132 4.13774 19.6594 4.29375L21 9H3L4.34062 4.29375C4.38682 4.13774 4.4819 4.00069 4.61187 3.9028C4.74183 3.8049 4.8998 3.75134 5.0625 3.75V3.75Z' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_3' d='M9 9V10.5C9 11.2956 8.68393 12.0587 8.12132 12.6213C7.55871 13.1839 6.79565 13.5 6 13.5C5.20435 13.5 4.44129 13.1839 3.87868 12.6213C3.31607 12.0587 3 11.2956 3 10.5V9' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_4' d='M15 9V10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5V9' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_5' d='M21 9V10.5C21 11.2956 20.6839 12.0587 20.1213 12.6213C19.5587 13.1839 18.7956 13.5 18 13.5C17.2044 13.5 16.4413 13.1839 15.8787 12.6213C15.3161 12.0587 15 11.2956 15 10.5V9' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </g>
    </svg>
  );
}
