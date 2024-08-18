'use client'
import React from 'react';

export default function DeleteCart({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Delete/Variant2'>
        <path
          id='Vector'
          d='M10 1.25C5.175 1.25 1.25 5.175 1.25 10C1.25 14.825 5.175 18.75 10 18.75C14.825 18.75 18.75 14.825 18.75 10C18.75 5.175 14.825 1.25 10 1.25ZM10 2.5C14.15 2.5 17.5 5.85 17.5 10C17.5 14.15 14.15 17.5 10 17.5C5.85 17.5 2.5 14.15 2.5 10C2.5 5.85 5.85 2.5 10 2.5ZM6.90625 6.0225L6.0225 6.90625L9.11625 10L6.0225 13.0963L6.90625 13.98L10 10.8837L13.0963 13.98L13.98 13.0963L10.8837 10L13.98 6.90625L13.0963 6.0225L10 9.11625L6.90625 6.0225Z'
          fill='#F44336'
        />
      </g>
    </svg>
  );
}
