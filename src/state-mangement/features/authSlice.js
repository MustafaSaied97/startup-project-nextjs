import { createSlice } from '@reduxjs/toolkit';
import { storageManager } from '@/utils';
import { setCookies, deleteCookies } from '@/utils/cookies-action';
import { getCookie } from 'cookies-next';

const storeAuthDataInCookies = (data) => {
  // const maxAgeValue = 25 * 365 * 24 * 60 * 60; // 25 years in seconds
  const yearsPeriod = 3 * 12 * 30 * 24 * 60 * 60 * 1000; // 1 years in mile seconds
  const expireDate = Date.now() + yearsPeriod; //Set expiration to 50 years from now
  setCookies({
    name: 'authData',
    value: JSON.stringify(data),
    //   maxAge: maxAgeValue,
    expires: expireDate,
  });
};

const initialState = {
  authData: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth(state) {
      state.authData = {
        ...JSON.parse(getCookie('authData') || '{}'),
      };
    },
    storeAuth(state, action) {
      const role = action?.payload?.role;
      const storedAuthData = {
        ...action.payload,
        isMemberInWebsite: role == 'user' || role == 'reseller',
      };
      state.authData = { ...storedAuthData };

      storeAuthDataInCookies(storedAuthData);
    },
    removeAuth(state, action) {
      //1- remove auth from state-mangement
      state.authData = {};
      //2- remove auth from cookies
      deleteCookies({ name: 'authData' });
    },
    updateAuth(state, action) {
      const updatedProperties = action?.payload || {};
      // let isExist = true;
      // Object.keys(updatedProperties).forEach((key) => {
      //   if (Object.keys(state.authData).includes(key))return;
      //   isExist = false;
      // });
      // if (!isExist) return;
      const updatedAuthData = { ...state.authData, ...updatedProperties };
      state.authData = updatedAuthData;
      storeAuthDataInCookies(updatedAuthData);
    },
  },
});

export const { initAuth, storeAuth, updateAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
