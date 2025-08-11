import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
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
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (credentials) => ({
                url: '/bookings/contact',
                method: 'POST',
                body: credentials,
            }),
        }),
        getAllcontacats:builder.query({
            query:()=>({
                url:'/bookings/contact'
            })
        })
    })
});

export const { useCreateContactMutation,useGetAllcontacatsQuery
} = BookingsAPI;
