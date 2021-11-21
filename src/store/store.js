import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from '../slices/phoneBookSlice'

export default configureStore({
    reducer: {
        contacts: phoneBookReducer
    }
})