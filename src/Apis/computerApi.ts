import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const computerApi = createApi({
    reducerPath: "computerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7081/api/" }),
    tagTypes: ["Computers"],
    endpoints: (buidler) => ({
        getComputers: buidler.query({
            query: () => ({
                url: "computer",
            }),
            providesTags: ["Computers"],
        }),
        getComputerById: buidler.query({
            query: (id) => ({
                url: `computer/${id}`,
            }),
            providesTags: ["Computers"],
        }),
    }),
});

export const { useGetComputersQuery, useGetComputerByIdQuery } = computerApi;
export default computerApi;
