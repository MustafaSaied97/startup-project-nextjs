'use client';
import React from 'react';
import { useSelector } from 'react-redux';

export default function BurgerCloseIcon({ color }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const defaultColor = currentTheme === 'light' ? '#969696' : '#CDCDCD';
  color = color || defaultColor;
  return (
    <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke={color}>
      <g id='SVGRepo_bgCarrier' strokeWidth={0} />
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
      <g id='SVGRepo_iconCarrier'>
        {'{'}' '{'}'}
        <path d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /> <path d='M9.16998 14.83L14.83 9.17004' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        {'{'}' '{'}'}
        <path d='M14.83 14.83L9.16998 9.17004' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        {'{'}' '{'}'}
      </g>
    </svg>
  );
}
