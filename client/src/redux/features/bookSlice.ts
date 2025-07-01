import { createSlice } from "@reduxjs/toolkit";
import type { Ibook } from "@/types/types";


interface initialState  {
    books: Ibook[] ,
}

const initialState: initialState = {
    books: [
        {
            id: "1",
            title: "Sample Book",
            description: "This is a sample book description.",
            dueDate: "2023-10-31",
            isCompleted: false,
            priority: "High",
        },
        {
            id: "2",
            title: "Another Book",
            description: "This is another book description.",
            dueDate: "2023-11-15",
            isCompleted: false,
            priority: "Medium",
        },
        {
            id: "3",
            title: "Low Priority Book",
            description: "This book has low priority.",
            dueDate: "2023-12-01",
            isCompleted: false,
            priority: "Low",
        },
    ],
}



const bookSlice = createSlice({
    name: "book",
    initialState ,
    reducers:{

    }

})

export const bookReducer = bookSlice.reducer;