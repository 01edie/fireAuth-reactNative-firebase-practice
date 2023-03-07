import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const store = configureStore({
    name: 'store',
    reducer:{
        auth:authSlice
    }
})

export default store