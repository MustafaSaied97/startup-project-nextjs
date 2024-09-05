import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cachedData: {},
};

const cachedSlice = createSlice({
  name: 'cached',
  initialState,
  reducers: {
    updateCachedState(state, action) {
      const { key, value } = action.payload;
      state.cachedData[key] = value;
    },
    clearCache(state) {
      state.cachedData = {};
    },
    removeCacheEntry(state, action) {
      delete state.cachedData[action.payload];
    },
  },
});

export const { updateCachedState, clearCache, removeCacheEntry } = cachedSlice.actions;
export default cachedSlice.reducer;
