'use client';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Shape2Icon({ className = '', height = 20, width = 20, color = '' }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <svg className={className} width='auto' height='auto' viewBox='0 0 38 338' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1.21883 198C-6.8182 127.338 27.1155 82 38 0V338C38 338 6.84892 247.5 1.21883 198Z' fill={color || currentTheme == 'light' ? 'white' : '#1c1917'} fillOpacity='1' />
    </svg>
  );
}
