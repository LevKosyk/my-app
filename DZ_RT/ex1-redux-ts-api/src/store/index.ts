import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/post/productsSlice'

export const store  = configureStore({
    reducer: {
        product: productsSlice
    }
})

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch