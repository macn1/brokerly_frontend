import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with token
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token; // <-- Make sure your slice name is "user"
    console.log("TOKEN FROM REDUX:", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Re-auth handler
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage.removeItem("authtoken");
  }
  return result;
};

export const VendorApi = createApi({
  reducerPath: "VendorApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["Vendor"],

  endpoints: (builder) => ({
    // LOGIN
    loginVendor: builder.mutation({
      query: (credentials) => ({
        url: "/api/vendor/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // REGISTER
    registerVendor: builder.mutation({
      query: (credentials) => ({
        url: "/api/register/vendor",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Vendor"],
    }),
    registerMember: builder.mutation({
      query: (credentials) => ({
        url: "/api/register/member",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Vendor"],
    }),


    // LIST ALL VENDORS
    getAllVendorList: builder.query({
      query: ({ page = 1, page_size = 10, ...filters }) => {
        const params = new URLSearchParams({
          page,
          page_size,
          ...filters,
        }).toString();

        return `/api/vendor/listall-vendors?${params}`;
      },
      providesTags: ["Vendor"],
    }),
    getAllMemberList: builder.query({
      query: ({ page = 1, page_size = 10, ...filters }) => {
        const params = new URLSearchParams({
          page,
          page_size,
          ...filters,
        }).toString();

        return `/api/vendor/listall-members?${params}`;
      },
      providesTags: ["Vendor"],
    }),

    // DELETE VENDOR
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `/api/vendor/listall-vendors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendor"],
    }),
      deleteMember: builder.mutation({
      query: (id) => ({
        url: `/api/vendor/listall-members/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendor"],
    }),

    // GET VENDOR BY ID
    getVendorByid: builder.query({
      query: (id) => `/api/vendor/listall-vendors/${id}`,
      providesTags: ["Vendor"],
    }),
    getMemberbyId: builder.query({
      query: (id) => `/api/vendor/listall-members/${id}`,
      providesTags: ["Vendor"],
    }),
  }),
});

export const {
  useGetMemberbyIdQuery,
  useDeleteMemberMutation,
  useGetAllMemberListQuery,
  useRegisterMemberMutation,
  useLoginVendorMutation,
  useRegisterVendorMutation,
  useGetAllVendorListQuery,
  useDeleteVendorMutation,
  useGetVendorByidQuery,
} = VendorApi;
