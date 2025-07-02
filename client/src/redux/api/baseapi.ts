import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';


const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
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



        })

    })
})

export const { useGetBooksQuery, useCreateBooksMutation } = baseApi;
export { baseApi }; 