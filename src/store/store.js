import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorSlice";
import customerReducer from "./customerSlice";

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    customer: customerReducer,
  },
});

export default store;
