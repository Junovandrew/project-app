import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer";
import taskReducer from "./reducers/taskReducer";
import productReducer from "./reducers/productReducer";


export default configureStore({
    reducer:{
        users:userReducer,
        tasks:taskReducer,
        products:productReducer,
    }
})