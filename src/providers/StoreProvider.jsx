'use client';

import { store } from '@/lib/store';
import { useEffect, useLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { themeInit } from '@/lib/features/themeSlice';
import { initAuth } from '@/lib/features/authSlice';

function StoreInitiatializton({ children }) {
  //initialize all store state the came from localstorage and cookies {client side}

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
