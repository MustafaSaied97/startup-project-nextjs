import { createSlice } from '@reduxjs/toolkit';
import { setCookies } from '@/utils/cookies-action';
import { getCookie } from 'cookies-next';

const initialState = {
  currentTheme: 'light',
};
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeInit: (state) => {
      state.currentTheme = getCookie('theme') || 'light';
    },
    toggleTheme: (state, action) => {
      state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
      setCookies({ name: 'theme', value: state.currentTheme });
    },
  },
});

export const { themeInit, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
