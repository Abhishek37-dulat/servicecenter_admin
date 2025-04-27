import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery"; // Base API configuration for Axios

export const CATEGORY_API = "categoryApi";

export const categoryApi = createApi({
  reducerPath: CATEGORY_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // **1. Create a Category**
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "categories",
        method: "POST",
        body: categoryData, // categoryData includes name, description, parentCategory, etc.
      }),
      invalidatesTags: ["Category"],
    }),

    // **2. Get All Categories**
    getAllCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // **3. Get Category By ID**
    getCategoryById: builder.query({
      query: (id) => ({
        url: `categories/${id}`, // API endpoint expects category ID as URL parameter
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // **4. Update a Category**
    updateCategory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: updatedData, // updatedData includes fields to update
      }),
      invalidatesTags: ["Category"],
    }),

    // **5. Delete a Category**
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // **6. Get Hierarchical Categories**
    getHierarchicalCategories: builder.query({
      query: () => ({
        url: "categories/hierarchy",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

// **Exporting Hooks**
export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetHierarchicalCategoriesQuery,
} = categoryApi;
