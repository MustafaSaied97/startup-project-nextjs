import React from 'react';

export default function CheckIcon({ color = '#2DB224', size = 18 }) {
  return (
    <svg width={18} height={18} viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Check'>
        <path id='Vector' d='M12 6L6.53033 11.4697C6.23744 11.7626 5.76257 11.7626 5.46967 11.4697L3 9' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
        <path id='Vector_2' d='M16.5 6L11.0303 11.4697C10.7375 11.7626 10.2626 11.7626 9.96968 11.4697L8.25 9.75' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
      </g>
    </svg>
  );
}
