import { configureStore, createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',
  initialState: { isEligibleForDiscount: false },
  reducers: {
    updateDiscountEligibility: (state, action) => {
      state.isEligibleForDiscount = action.payload;
    },
  },
});

export const { updateDiscountEligibility } = discountSlice.actions;

const store = configureStore({
  reducer: discountSlice.reducer,
});

export default store;