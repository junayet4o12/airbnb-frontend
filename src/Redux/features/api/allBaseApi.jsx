import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { backendUrl } from "../../../backendUrl";

const baseQuery = async (args) => {
    try {
        const response = await axios({
            method: args.method,
            url: `${backendUrl}${args.url}`,
            data: args.body || undefined,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Network response was not ok');
    }
};

const allBaseApi = createApi({
    reducerPath: 'allBaseApi',
    baseQuery,
    endpoints: (builder) => ({
        getAllProperties: builder.query({
            query: () => ({
                url: `/properties`,
                method: 'GET',
            }),
            providesTags: ['Properties'],
        }),
        queryProperties: builder.mutation({
            query: (body) => ({
                url: '/queryProperties',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Properties'],
        }),
        filterProperty: builder.mutation({
            query: (body) => ({
                url: '/properties/filter',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Properties'],
        }),
        getSingleProperty: builder.query({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'GET',
            }),
        }),
        addProperty: builder.mutation({
            query: (property) => ({
                url: '/properties',
                method: 'POST',
                body: property,
            }),
            invalidatesTags: ['Properties'],
        }),
        updateProperty: builder.mutation({
            query: ({ data, id }) => ({
                url: `/properties/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Properties'],
        }),
        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Properties'],
        }),
    })
});

export const {
    useGetAllPropertiesQuery,
    useQueryPropertiesMutation,
    useGetSinglePropertyQuery,
    useAddPropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
    useFilterPropertyMutation
} = allBaseApi;

export default allBaseApi;
