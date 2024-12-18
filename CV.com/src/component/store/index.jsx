import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer  from "./slices/LoginSlice.jsx";


export const store = configureStore({
    reducer : {
        userLoginDetails : userLoginReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

