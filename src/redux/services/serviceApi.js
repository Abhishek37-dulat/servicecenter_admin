import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery"; // Axios base query configuration

export const SERVICE_API = "serviceApi";

export const serviceApi = createApi({
  reducerPath: SERVICE_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["Service"],
  endpoints: (builder) => ({
    // **1. Create a Service**
    createService: builder.mutation({
      query: (serviceData) => ({
        url: "services",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["Service"],
    }),

    // **2. Get All Services**
    getAllServices: builder.query({
      query: ({ search = "", page = 1, limit = 10 }) => ({
        url: `services?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getAllServices1: builder.query({
      query: () => ({
        url: `services?page=1&limit=50`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    // **3. Get Service By ID**
    getServiceById: builder.query({
      query: (id) => ({
        url: `services/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    // **4. Update a Service**
    updateService: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `services/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Service"],
    }),

    // **5. Delete a Service**
    deleteService: builder.mutation({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

// **Exporting Hooks**
export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServices1Query,
} = serviceApi;
