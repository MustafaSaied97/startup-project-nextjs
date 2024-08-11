'use client';
import React from 'react';

export default function CopyIcon({ color = '#969696', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Copy' clipPath='url(#clip0_608_3390)'>
        <path
          id='Vector'
          d='M16 1H4C2.895 1 2 1.895 2 3V17H4V3H16V1ZM19 5H8C6.895 5 6 5.895 6 7V21C6 22.105 6.895 23 8 23H19C20.105 23 21 22.105 21 21V7C21 5.895 20.105 5 19 5ZM19 21H8V7H19V21Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_608_3390'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
