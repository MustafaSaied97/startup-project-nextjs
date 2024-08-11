import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import authReducer from './features/authSlice';
import cachedReducer from './features/cachedSlice';
import cartReducer from './features/cartSlice';
import wishlistReducer from './features/wishlistSlice';
import layoutReducer from './features/layoutSlice';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    cached: cachedReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    layout: layoutReducer,
  },
});
