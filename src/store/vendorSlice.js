import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor: {},
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    addVendorDetail: (state, action) => {
      state.vendor = action.payload;
    },
  },
});

export const { addVendorDetail } = vendorSlice.actions;

export default vendorSlice.reducer;