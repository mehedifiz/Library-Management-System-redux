import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';


const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://librarymanagement-mu.vercel.app/api" }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",



        }),
        CreateBooks: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData,
            })
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",

            })



        }),
        updateBook: builder.mutation({
            query: (bookData) => ({
                url: `/books/${bookData._id}`,
                method: "PUT",
                body: bookData

            })



        }),
        borrowBook: builder.mutation({
            query: (borrowData) => ({
                url: `/borrow`,
                method: "POST",
                body: borrowData

            })



        }),

        GetborrowBook: builder.query({
            query: () => "/borrow",







        }),

    })
})

export const { useGetBooksQuery, useCreateBooksMutation, useDeleteBookMutation, useUpdateBookMutation, useBorrowBookMutation , useGetborrowBookQuery} = baseApi;
export { baseApi }; 