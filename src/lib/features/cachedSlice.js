import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cachedData: {}, // Initial cached data state
};

const cachedSlice = createSlice({
  name: 'cached',
  initialState,
  reducers: {
    updateCachedState(state, action) {
      const { key, value } = action.payload;
      state.cachedData[key] = value;
    },
    // Add more reducer functions as needed
  },
});

export const { updateCachedState } = cachedSlice.actions;
export default cachedSlice.reducer;
