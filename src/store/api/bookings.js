import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('authtoken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        localStorage.removeItem('authtoken');
    }

    return result;
};

export const BookingsAPI = createApi({
    reducerPath: 'BookingsAPI',
    baseQuery: baseQueryWithReauth,

    // ⭐ Ordered Tag Types
    tagTypes: ['Contacts', 'Leads'],

    endpoints: (builder) => ({
        // ---------------------- CONTACT ----------------------
        createContact: builder.mutation({
            query: (credentials) => ({
                url: '/bookings/contact',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Contacts'],
        }),

        getAllcontacats: builder.query({
            query: () => '/bookings/contact',
            providesTags: ['Contacts'],
        }),

        // ---------------------- LEAD GENERATION ----------------------
        createLead: builder.mutation({
            query: (credentials) => ({
                url: '/bookings/lead-generation',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Leads'],
        }),

        getAllcustomerLeads: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({
                    page,
                    page_size,
                    ...filters,
                }).toString();

                return `/bookings/all-leads?${params}`;
            },
            providesTags: ['Leads'],
        }),
        getAllcustomerVendorLeads: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({
                    page,
                    page_size,
                    ...filters,
                }).toString();

                return `/bookings/vendor-all-leads?${params}`;
            },
            providesTags: ['Leads'],
        }),
        getleadsDetail: builder.query({
            query: (id) => ({
                url: `/bookings/all-leads/${id}`,
                method: 'get',
            }),
            providesTags: ['Leads'],
        }),

        deleteApartmentLeads: builder.mutation({
            query: (id) => ({
                url: `/bookings/all-leads/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Leads'],
        }),

        createLeadVisit: builder.mutation({
            query: (credentials) => ({
                url: '/bookings/lead-visit',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Leads'],
        }),


        // getAllAdmin
    }),
});

export const {
    useGetleadsDetailQuery,
    useCreateLeadVisitMutation,
    useDeleteApartmentLeadsMutation,
    useGetAllcustomerVendorLeadsQuery,
    useCreateLeadMutation,
    useCreateContactMutation,
    useGetAllcontacatsQuery,
    useGetAllcustomerLeadsQuery
} = BookingsAPI;
