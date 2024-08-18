import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layoutData: {},
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayoutData(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setLayoutData } = layoutSlice.actions;
export default layoutSlice.reducer;
