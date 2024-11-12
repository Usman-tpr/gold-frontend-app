import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import frontendReducer from "./frontendSlice";



const store = configureStore({
    reducer: {
        user: userReducer,
        frontend:frontendReducer
    }
});

export default store;