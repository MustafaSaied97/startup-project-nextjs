'use client';
import React, { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setLayoutData } from '@/lib/features/layoutSlice';
let isSet = false;
export default function WebsiteLayoutProvider({ children, layoutData = {} }) {
  !isSet && setCookie('layoutData', JSON.stringify(layoutData));
  isSet = true;
  const dispatch = useDispatch();
  useEffect(() => {
    Object.keys(layoutData)?.length && dispatch(setLayoutData({ layoutData }));
  }, []);

  return <>{children}</>;
}
