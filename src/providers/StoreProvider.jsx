'use client';

import { store } from '@/state-mangement/store';
import { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import { themeInit } from '@/state-mangement/features/themeSlice';

function StoreInitiatializton({ children }) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
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
