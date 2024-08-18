import React from 'react';

export default function Facebook({ color = 'white', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Facebook F'>
        <path
          id='Vector'
          d='M17.525 8.99994H14V6.99994C14 5.96794 14.084 5.31794 15.563 5.31794H17.431V2.13794C16.522 2.04394 15.608 1.99794 14.693 1.99994C11.98 1.99994 10 3.65694 10 6.69894V8.99994H7V12.9999L10 12.9989V21.9999H14V12.9969L17.066 12.9959L17.525 8.99994Z'
          fill={color}
        />
      </g>
    </svg>
  );
}
