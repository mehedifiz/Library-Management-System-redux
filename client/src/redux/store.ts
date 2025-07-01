
import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from './features/bookSlice'



export const store = configureStore({
    reducer: {

        book: bookReducer

        
    }
}) 



// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']