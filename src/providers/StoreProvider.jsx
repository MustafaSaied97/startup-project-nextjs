'use client';

import { store } from '@/state-mangement/store';
import { useEffect, useLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { themeInit } from '@/state-mangement/features/themeSlice';
import { initAuth } from '@/state-mangement/features/authSlice';

function StoreInitiatializton({ children }) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(initAuth());
    dispatch(themeInit());
  }, []);
  
  return <>{children}</>;
}

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreInitiatializton>{children}</StoreInitiatializton>
    </Provider>
  );
}
