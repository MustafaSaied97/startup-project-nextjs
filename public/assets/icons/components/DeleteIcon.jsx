import React from 'react';

export default function DeleteIcon({ width = 19, height = 19, color = 'white', className = 'text-red-500' }) {
  return (
    <svg className={className} xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <path fill='currentColor' d='M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z' />
    </svg>
  );
}
