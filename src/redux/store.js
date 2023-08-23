import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer";
import taskReducer from "./reducers/taskReducer";


export default configureStore({
    reducer:{
        users:userReducer,
        tasks:taskReducer,
    }
})