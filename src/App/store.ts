import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import employeeSlice from "../features/employeeSlice";


export const store=configureStore({
    reducer:{
        auth:authSlice,
        employees:employeeSlice
    }
})
// Complete Redux state type
export type RootState = ReturnType<typeof store.getState>;

// Redux dispatch type
export type AppDispatch = typeof store.dispatch;


