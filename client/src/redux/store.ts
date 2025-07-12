
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseapi'



export const store = configureStore({
    reducer: {

        [baseApi.reducerPath]: baseApi.reducer,





    } ,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
    
})



// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']