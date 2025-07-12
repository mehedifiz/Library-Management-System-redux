import { createSlice } from "@reduxjs/toolkit";
import type { IBook } from "@/types/types";


interface initialState  {
    books: IBook[] ,
}

const initialState: initialState = {
    books: []
}



const bookSlice = createSlice({
    name: "book",
    initialState ,
    reducers:{

      
    }

})

export const bookReducer = bookSlice.reducer;