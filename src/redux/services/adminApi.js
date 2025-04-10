import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery";  

export const ADMIN_API = "adminApi";

export const adminApi = createApi({
  reducerPath: ADMIN_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    // **1. Login Admin**
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials, 
      }),
      invalidatesTags: ["Admin"],
    }),

    // **2. Logout Admin**
    logoutAdmin: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    // **3. Forgot Password (Admin)**
    forgotPasswordAdmin: builder.mutation({
      query: (email) => ({
        url: "admin/forgot-password",
        method: "POST",
        body: { email }, // Email to send reset link
      }),
      invalidatesTags: ["Admin"],
    }),

    // **4. Reset Password (Admin)**
    resetPasswordAdmin: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `admin/reset-password/${token}`,
        method: "POST",
        body: { newPassword }, // New password entered by the admin
      }),
      invalidatesTags: ["Admin"],
    }),

    // **5. Get Admin Profile**
    getAdminProfile: builder.query({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // **6. Get All Admins (Superadmin Only)**
    getAllAdmins: builder.query({
      query: () => ({
        url: "admin/all",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // **7. Get Admin Details By ID**
    getAdminDetailsById: builder.query({
      query: (id) => ({
        url: `admin/${id}`, // Admin ID as URL parameter
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // **8. Create New Admin (Superadmin Only)**
    createAdmin: builder.mutation({
      query: (newAdmin) => ({
        url: "admin/create",
        method: "POST",
        body: newAdmin, // New admin details
      }),
      invalidatesTags: ["Admin"],
    }),

    // **9. Update Admin Details**
    updateAdminDetails: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `admin/update/${id}`,
        method: "PUT",
        body: updatedData, // Fields to update
      }),
      invalidatesTags: ["Admin"],
    }),

    // **10. Delete Admin (Superadmin Only)**
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

// **Exporting Hooks**
export const {
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useForgotPasswordAdminMutation,
  useResetPasswordAdminMutation,
  useGetAdminProfileQuery,
  useGetAllAdminsQuery,
  useGetAdminDetailsByIdQuery,
  useCreateAdminMutation,
  useUpdateAdminDetailsMutation,
  useDeleteAdminMutation,
} = adminApi;
