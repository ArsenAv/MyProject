import { configureStore } from "@reduxjs/toolkit"
import booksReducer from './booksSlice'
import userReducer from './userSlice'
import { userSlice } from "./userSlice"

const store = configureStore({
    reducer: {
        books: booksReducer,
        users: userReducer
    }
})

export default store