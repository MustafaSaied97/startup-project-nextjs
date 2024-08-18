import React from 'react';

export default function Search({ size = 24, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='search Icon' clipPath='url(#clip0_1_1220)'>
        <path
          id='Vector'
          d='M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path id='Vector_2' d='M21 21L15 15' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_1_1220'>
          <rect width={24} height={24} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
