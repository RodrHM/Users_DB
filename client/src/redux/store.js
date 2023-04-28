import { configureStore } from '@reduxjs/toolkit'
import user from './features/users/usersSlice'

export const store = configureStore({
    reducer:{
        user: user
    }
})
