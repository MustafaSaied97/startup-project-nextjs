import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import authReducer from './features/authSlice';
import cachedReducer from './features/cachedSlice';
import layoutReducer from './features/layoutSlice';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    cached: cachedReducer,
    layout: layoutReducer,
  },
});
