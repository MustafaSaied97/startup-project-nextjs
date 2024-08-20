import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import cachedReducer from './features/cachedSlice';
import layoutReducer from './features/layoutSlice';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cached: cachedReducer,
    layout: layoutReducer,
  },
});
