import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notify } from '@/utils';
import { websiteApis } from '@/services/apis';

export const getAllWishlistIds = createAsyncThunk('getAllWishlistIds', async () => {
  try {
    const res = await websiteApis.getAllWishlistIds();
    return res.data;
  } catch (err) {
    notify(err?.message || err?.data?.message, { type: 'error' });
  }
});

export const getWishlistProducts = createAsyncThunk('getWishlistProducts', async () => {
  try {
    const res = await websiteApis.getWishlist();
    return res.data;
  } catch (err) {
    notify(err?.message || err?.data?.message, { type: 'error' });
  }
});

const initialState = {
  wishlistIds: [],

  isLoading: true,
  wishlistProducts: null,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWishlist(state) {
      state = { ...initialState };
    },
    toggleWishlistId(state, action) {
      const productId = action.payload;
      const isExist = state.wishlistIds.includes(productId);
      if (isExist) {
        state.wishlistIds = state.wishlistIds.filter((id) => id !== productId);
      } else {
        state.wishlistIds = [...state.wishlistIds, productId];
      }
    },
    toggleWishlistProduct(state, action) {
      if (!state.wishlistProducts) return;
      const productData = action.payload;
      const isExist = state.wishlistProducts.map((wishlistProduct) => wishlistProduct?.id).includes(productData?.id);
      if (isExist) {
        state.wishlistProducts = state.wishlistProducts.filter((wishlistProduct) => wishlistProduct.id !== productData?.id);
      } else {
        state.wishlistProducts = [...state.wishlistProducts, productData];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWishlistIds.fulfilled, (state, action) => {
      const resData = action?.payload || [];
      state.wishlistIds = [...resData];
    });
    builder.addCase(getWishlistProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlistProducts.fulfilled, (state, action) => {
      const wishlistProductsData = action?.payload || [];
      console.log('wishlistProductsData in addCase', wishlistProductsData);
      state.wishlistProducts = [...wishlistProductsData];
      state.isLoading = false;
    });
    builder.addCase(getWishlistProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { resetWishlist, toggleWishlistId, toggleWishlistProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;
