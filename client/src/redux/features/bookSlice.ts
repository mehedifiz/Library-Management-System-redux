import { createSlice } from "@reduxjs/toolkit";
import type { IBook } from "@/types/types";


interface initialState  {
    books: IBook[] ,
}

const initialState: initialState = {
    books: [
  {
    id: "507f1f77bcf86cd799439011",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "FICTION",
    isbn: "978-0-06-112008-4",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    copies: 8,
    available: true,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-12-20T14:22:00Z")
  },
  {
    id: "507f1f77bcf86cd799439012",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "SCIENCE",
    isbn: "978-0-553-38016-3",
    description: "An exploration of cosmology and the universe's biggest mysteries explained for general readers.",
    copies: 0,
    available: false,
    createdAt: new Date("2024-02-10T09:15:00Z"),
    updatedAt: new Date("2024-12-18T16:45:00Z")
  },
  {
    id: "507f1f77bcf86cd799439013",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "BIOGRAPHY",
    isbn: "978-1-4516-4853-9",
    description: "The exclusive biography of Apple's co-founder, based on extensive interviews.",
    copies: 3,
    available: true,
    createdAt: new Date("2024-03-05T11:20:00Z"),
    updatedAt: new Date("2024-12-15T13:10:00Z")
  }
]
}



const bookSlice = createSlice({
    name: "book",
    initialState ,
    reducers:{

      addBooks : (state , action)=>{
        
      }

    }

})

export const bookReducer = bookSlice.reducer;