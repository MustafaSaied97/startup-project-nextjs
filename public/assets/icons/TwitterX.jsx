import React from 'react';

export default function TwitterX({ color = 'white', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='TwitterX'>
        <path id='Vector' d='M2.86719 3L9.73633 12.8184L2.73438 21H5.38086L10.9199 14.5098L15.4609 21H21.3711L14.1738 10.6973L20.7441 3H18.1387L12.9961 9.00977L8.79883 3H2.86719Z' fill={color} />
      </g>
    </svg>
  );
}
