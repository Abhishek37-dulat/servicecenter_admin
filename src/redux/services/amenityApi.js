import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery"; // Axios base query configuration

export const AMENITY_API = "amenityApi";

export const amenityApi = createApi({
  reducerPath: AMENITY_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["Amenity"],
  endpoints: (builder) => ({
    // **1. Create an Amenity**
    createAmenity: builder.mutation({
      query: (amenityData) => ({
        url: "amenities",
        method: "POST",
        body: amenityData,
      }),
      invalidatesTags: ["Amenity"],
    }),

    // **2. Get All Amenities**
    getAllAmenities: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `amenities?search=${search}&page=${page}&limit=${limit}`,
          method: "GET",
        }),
        providesTags: ["Amenity"],
      }),
      getAllAmenities1: builder.query({
        query: () => ({
          url: `amenities?page=1&limit=50`,
          method: "GET",
        }),
        providesTags: ["Amenity"],
      }),
    // **3. Get Amenity By ID**
    getAmenityById: builder.query({
      query: (id) => ({
        url: `amenities/${id}`,
        method: "GET",
      }),
      providesTags: ["Amenity"],
    }),

    // **4. Update an Amenity**
    updateAmenity: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `amenities/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Amenity"],
    }),

    // **5. Delete an Amenity**
    deleteAmenity: builder.mutation({
      query: (id) => ({
        url: `amenities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Amenity"],
    }),
  }),
});

// **Exporting Hooks**
export const {
  useCreateAmenityMutation,
  useGetAllAmenitiesQuery,
  useGetAmenityByIdQuery,
  useUpdateAmenityMutation,
  useDeleteAmenityMutation,
  useGetAllAmenities1Query
} = amenityApi;
