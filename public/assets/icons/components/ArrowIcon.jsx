import React from 'react';

export default function ArrowIcon({ className = '', height = 20, width = 20, color = '#969696' }) {
  return (
    <svg className={className} width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Arrow' clipPath='url(#clip0_1_1231)'>
        <path id='Vector' d='M5 7.5L10 12.5L15 7.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_1_1231'>
          <rect width={20} height={20} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
