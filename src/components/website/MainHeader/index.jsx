'use client';
import React, { useEffect } from 'react';
import NavBar from './NavBar';

export default function MainHeader() {
  return (
    <header className='h-min-[--main-header-height] relative z-50 shadow-md  '>
      <NavBar />
    </header>
  );
}
