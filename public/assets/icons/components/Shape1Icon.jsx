'use client'
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Shape1Icon({ className = '', height = 20, width = 20, color = 'black' }) {
  return (
    <svg className={className} width='auto' height='auto' viewBox='0 0 38 338' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1.21883 198C-6.8182 127.338 27.1155 82 38 0V338C38 338 6.84892 247.5 1.21883 198Z' fill='gray' fillOpacity='0.4' />
    </svg>
  );
}
