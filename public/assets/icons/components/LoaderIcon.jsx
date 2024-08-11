import React from 'react';

export default function LoaderIcon({ className='', width = 24, height = 24, size = 24, color = '#FFFFFF', duration = 1 }) {
  return (
    <svg className={className} width={width} height={height} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <linearGradient id='a2'>
        <stop offset={0} stopColor={color} stopOpacity={0} />
        <stop offset={1} stopColor={color} />
      </linearGradient>
      <circle fill='none' stroke='url(#a2)' strokeWidth={size} strokeLinecap='round' strokeDasharray='0 44 0 44 0 44 0 44 0 360' cx={100} cy={100} r={70} transformOrigin='center'>
        <animateTransform type='rotate' attributeName='transform' calcMode='discrete' dur={duration} values='360;324;288;252;216;180;144;108;72;36' repeatCount='indefinite' />
      </circle>
    </svg>
  );
}
