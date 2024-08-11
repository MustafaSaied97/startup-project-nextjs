import React from 'react';

export default function ThreeDotsIcon({ color = '#000000', width=32, height=32, className }) {
  return (
    <svg className={className} width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.75 12C6.75 12.9665 5.9665 13.75 5 13.75C4.0335 13.75 3.25 12.9665 3.25 12C3.25 11.0335 4.0335 10.25 5 10.25C5.9665 10.25 6.75 11.0335 6.75 12ZM20.75 12C20.75 12.9665 19.9665 13.75 19 13.75C18.0335 13.75 17.25 12.9665 17.25 12C17.25 11.0335 18.0335 10.25 19 10.25C19.9665 10.25 20.75 11.0335 20.75 12ZM12 13.75C12.9665 13.75 13.75 12.9665 13.75 12C13.75 11.0335 12.9665 10.25 12 10.25C11.0335 10.25 10.25 11.0335 10.25 12C10.25 12.9665 11.0335 13.75 12 13.75Z'
        fill={color}
      />
    </svg>
  );
}
