// import React from 'react'

// function OffersIcon() {
//   return (
// <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <g id="SVGRepo_bgCarrier" strokeWidth={0} />
//   <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
//   <g id="SVGRepo_iconCarrier"> <path d="M7 14H12.5M7 10H17M10 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V8.5M14 20L16.025 19.595C16.2015 19.5597 16.2898 19.542 16.3721 19.5097C16.4452 19.4811 16.5147 19.4439 16.579 19.399C16.6516 19.3484 16.7152 19.2848 16.8426 19.1574L21 15C21.5523 14.4477 21.5523 13.5523 21 13C20.4477 12.4477 19.5523 12.4477 19 13L14.8426 17.1574C14.7152 17.2848 14.6516 17.3484 14.601 17.421C14.5561 17.4853 14.5189 17.5548 14.4903 17.6279C14.458 17.7102 14.4403 17.7985 14.405 17.975L14 20Z" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g>
// </svg>

//   )
// }

// export default OffersIcon

'use client';

import React from 'react';
import { useSelector } from 'react-redux';

export default function OffersIcon({ color }) {

  return (



<svg fill="currentColor"
    className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'

width="{24}" height="{24}" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    <path d="M16.4,10h3.2a.77.77,0,0,0,.8-.7V6.8H31.6V9.2a.77.77,0,0,0,.7.8h3.3a.77.77,0,0,0,.8-.7V6.8A4.87,4.87,0,0,0,31.6,2H20.4a4.87,4.87,0,0,0-4.8,4.8V9.2a.79.79,0,0,0,.8.8Z" />
    <path d="M45.2,14.8H6.8A4.87,4.87,0,0,0,2,19.6V45.2A4.87,4.87,0,0,0,6.8,50H45.2A4.87,4.87,0,0,0,50,45.2V19.6A4.87,4.87,0,0,0,45.2,14.8ZM23.4,32.9l-6.1,6.3a1.08,1.08,0,0,1-1.1,0L10,32.9c-.5-.4-.1-1.1.7-1.1h3.8A12,12,0,0,1,26.3,19.6h.4v4.6A8.19,8.19,0,0,0,19,31.8h3.6C23.4,31.8,23.8,32.5,23.4,32.9Zm19.4,0H39A12.16,12.16,0,0,1,26.9,45.1h-.3V40.5c4.6,0,7.8-3,7.8-7.6H30.7c-.8,0-1.1-.6-.7-1.1l6.2-6.3a1.08,1.08,0,0,1,1.1,0l6.2,6.3c.4.4,0,1.1-.7,1.1Z" />
  </g>
</svg>

  );
}
