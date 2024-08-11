'use client';

import React from 'react';

export default function FilledStar({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Star'>
        <path
          id='Vector'
          d='M13.0468 14.9558C12.5136 15.3356 9.09274 12.9284 8.43756 12.9231C7.78238 12.9178 4.32297 15.2697 3.79605 14.8814C3.26912 14.4931 4.5079 10.505 4.31048 9.88208C4.11307 9.25914 0.800897 6.70512 1.00837 6.08541C1.2159 5.46571 5.40239 5.40815 5.93554 5.0284C6.46868 4.6487 7.88109 0.718393 8.53631 0.723638C9.19145 0.728929 10.54 4.68145 11.067 5.06972C11.5939 5.45796 15.779 5.58293 15.9764 6.20587C16.1738 6.82881 12.8208 9.3292 12.6133 9.9489C12.4058 10.5686 13.5799 14.5761 13.0468 14.9558Z'
          fill='url(#paint0_linear_1_1465)'
        />
      </g>
      <defs>
        <linearGradient id='paint0_linear_1_1465' x1='0.999043' y1='7.86005' x2='15.9848' y2='7.86005' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FCD635' />
          <stop offset={1} stopColor='#F7A928' />
        </linearGradient>
      </defs>
    </svg>
  );
}
