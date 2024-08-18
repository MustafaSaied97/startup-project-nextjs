import { createSlice } from '@reduxjs/toolkit';
import { setCookies, getCookies } from '@/utils/cookies-action';
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
      //action={type:'theme/toggleTheme',payload:data that path throught toogleTheme func as args}
      state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
      setCookies({ name: 'theme', value: state.currentTheme });
    },
  },
});

export const {themeInit, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
