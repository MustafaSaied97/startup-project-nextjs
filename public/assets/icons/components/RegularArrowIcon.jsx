'use client';
import React from 'react';

export default function RegularArrowIcon({ className = '', size = 24, color = '#F11237' }) {
  return (
    <svg className={className} width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Regular/ArrowLeft'>
        <path id='Vector' d='M20.25 12H3.75' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_2' d='M10.5 5.25L3.75 12L10.5 18.75' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </g>
    </svg>
  );
}
