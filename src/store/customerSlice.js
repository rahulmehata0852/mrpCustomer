import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {},
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomerDetail: (state, action) => {
      state.customer = action.payload;
    },
    deleteCustomerDetail: (state, action) => {
      state.customer = {};
    },
  },
});

export const { addCustomerDetail, deleteCustomerDetail } = customerSlice.actions;

export default customerSlice.reducer;