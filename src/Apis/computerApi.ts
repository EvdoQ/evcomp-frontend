import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const computerApi = createApi({
    reducerPath: "computerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7081/api/" }),
    tagTypes: ["Computers"],
    endpoints: (builder) => ({
        getComputers: builder.query({
            query: () => ({
                url: "computer",
            }),
            providesTags: ["Computers"],
        }),
        getComputerById: builder.query({
            query: (id) => ({
                url: `computer/${id}`,
            }),
            providesTags: ["Computers"],
        }),
        createComputer: builder.mutation({
            query: (data) => ({
                url: "computer",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Computers"],
        }),
        updateComputer: builder.mutation({
            query: ({ data, id }) => ({
                url: "computer/" + id,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Computers"],
        }),
        deleteComputer: builder.mutation({
            query: (id) => ({
                url: "computer/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Computers"],
        }),
    }),
});

export const {
    useGetComputersQuery,
    useGetComputerByIdQuery,
    useCreateComputerMutation,
    useUpdateComputerMutation,
    useDeleteComputerMutation,
} = computerApi;
export default computerApi;
