import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productSlice/productSlice'
import userSlice from './authSlice/authSlice'

export const store = configureStore({
  reducer: {
    productsSlice,
    userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch