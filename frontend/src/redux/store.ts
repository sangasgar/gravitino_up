import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/userSlice";





export const store = configureStore({
    reducer:{
        auth:authReducer,
    },
    
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch