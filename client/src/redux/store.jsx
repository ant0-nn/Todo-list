import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./fuatures/auth/authSlice";
import taskSlice from "./fuatures/task/taskSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        task: taskSlice,
    }
})