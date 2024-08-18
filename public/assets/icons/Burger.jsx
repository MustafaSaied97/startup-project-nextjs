'use client';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Burger({ color }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const defaultColor = currentTheme === 'light' ? '#969696' : '#CDCDCD';
  color = color || defaultColor;
  return (
    <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke={color}>
      <g id='SVGRepo_bgCarrier' strokeWidth={0} />
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
      <g id='SVGRepo_iconCarrier'>
        <path d='M4 18L20 18' stroke={color} strokeWidth={2} strokeLinecap='round' /> <path d='M4 12L20 12' stroke={color} strokeWidth={2} strokeLinecap='round' />{' '}
        <path d='M4 6L20 6' stroke={color} strokeWidth={2} strokeLinecap='round' />
      </g>
    </svg>
  );
}
