import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery"; // Base API configuration for Axios

export const AUTH_API = "authApi";

export const authApi = createApi({
  reducerPath: AUTH_API,
  baseQuery: apiBaseQuery,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    // **1. Register User**
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "users/register",
        method: "POST",
        body: userData, // userData includes name, email, password
      }),
      invalidatesTags: ["auth"],
    }),

    // **2. Login User**
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials, // credentials includes email and password
      }),
      invalidatesTags: ["auth"],
    }),

     
    googleLogin: builder.mutation({
      query: (tokenId) => ({
        url: "user/google-login",
        method: "POST",
        body: { tokenId }, // tokenId is received from the frontend via Google OAuth
      }),
      invalidatesTags: ["auth"],
    }),

    // **4. Google Register**
    googleRegister: builder.mutation({
      query: (tokenId) => ({
        url: "user/google-register",
        method: "POST",
        body: { tokenId }, 
        withCredentials: true // tokenId is received from the frontend via Google OAuth
      }),
      invalidatesTags: ["auth"],
    }),

    // **5. Logout User**
    logoutUser: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    // **6. Forgot Password**
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "user/forgot-password",
        method: "POST",
        body: { email }, // email to send reset link
      }),
      invalidatesTags: ["auth"],
    }),

    // **7. Reset Password**
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `user/reset-password/${token}`,
        method: "POST",
        body: { newPassword }, // newPassword entered by the user
      }),
      invalidatesTags: ["auth"],
    }),

    // **8. Get User Profile**
    getUserProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // **9. Get All Users (Admin Only)**
    getAllUsers: builder.query({
      query: () => ({
        url: "user/get-all-users",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // **10. Get User Details By ID (Admin)**
    getUserDetailsById: builder.query({
      query: (id) => ({
        url: `user/${id}`, // API endpoint expects user ID as URL parameter
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // **11. Update User Details**
    updateUserDetails: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `user/update-user/${id}`,
        method: "PUT",
        body: updatedData, // updatedData includes fields to update
      }),
      invalidatesTags: ["auth"],
    }),
   

    // **4. Google Auth Callback**
    googleAuthCallback: builder.mutation({
      query: (code) => ({
        url: "auth/google/callback",
        method: "GET",  
        headers: {
          Authorization: `Bearer ${code}`,  
        },
        withCredentials:true
      }),
  
    }),
  }),
});

// **Exporting Hooks**
export const {
  useLazyGetUserProfileQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleRegisterMutation,  
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  // useGoogleLoginQuery,
  useGoogleAuthCallbackMutation,
  useGetAllUsersQuery,
  useGetUserDetailsByIdQuery,
  useUpdateUserDetailsMutation,
  useGoogleLoginMutation
} = authApi;
