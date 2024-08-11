'use client';
import React from 'react';
import { useSelector } from 'react-redux';

export default function BurgerIcon({ color,size=20 }) {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const defaultColor = currentTheme === 'light' ? '#969696' : '#CDCDCD';
  color = color || defaultColor;
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <title>Filter</title>
      <g id='Page-1' stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
        <g id='Filter'>
          <rect id='Rectangle' fillRule='nonzero' x={0} y={0} width={24} height={24}></rect>
          <line x1={4} y1={5} x2={16} y2={5} id='Path' stroke={color} strokeWidth={2} strokeLinecap='round'></line>
          <line x1={4} y1={12} x2={10} y2={12} id='Path' stroke={color} strokeWidth={2} strokeLinecap='round'></line>
          <line x1={14} y1={12} x2={20} y2={12} id='Path' stroke={color} strokeWidth={2} strokeLinecap='round'></line>
          <line x1={8} y1={19} x2={20} y2={19} id='Path' stroke={color} strokeWidth={2} strokeLinecap='round'></line>
          <circle id='Oval' stroke={color} strokeWidth={2} strokeLinecap='round' cx={18} cy={5} r={2}></circle>
          <circle id='Oval' stroke={color} strokeWidth={2} strokeLinecap='round' cx={12} cy={12} r={2}></circle>
          <circle id='Oval' stroke={color} strokeWidth={2} strokeLinecap='round' cx={6} cy={19} r={2}></circle>
        </g>
      </g>
    </svg>
  );
}
