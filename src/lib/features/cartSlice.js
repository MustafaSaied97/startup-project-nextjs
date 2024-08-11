import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notify } from '@/utils';
import { websiteApis } from '@/services/apis';

export const getAllProductCartIds = createAsyncThunk('getAllProductCartIds', async () => {
  try {
    const res = await websiteApis.getCart();
    return res.data;
  } catch (err) {
    notify(err?.message || err?.data?.message, { type: 'error' });
  }
});

const initialState = {
  productCartIds: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(state) {
      state = { ...initialState };
    },
    addToCart(state, action) {
      const newId = action.payload;
      const isExist = state.productCartIds.includes(newId);
      if (!isExist) {
        state.productCartIds = [...state.productCartIds, newId];
      }
    },
    removeFromCart(state, action) {
      const newId = action.payload;
      state.productCartIds = state.productCartIds.filter((productId) => productId != newId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductCartIds.fulfilled, (state, action) => {
      const resData = action?.payload || {};
      const items = resData.items || [];
      state.productCartIds = items.map((item) => item?.product?.id);
    });
  },
});

export const { resetCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
