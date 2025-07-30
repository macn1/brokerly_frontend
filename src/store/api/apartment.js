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
console.log('Base URL:', process.env.REACT_APP_API_URL);

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        localStorage.removeItem('authtoken');
    }

    return result;
};

export const ApartmentApi = createApi({
    reducerPath: 'ApartmentApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllAmenity: builder.query({
            query: () => `/apartments/room-amenity`,
        }),
        getAllapartmentAmenity: builder.query({
            query: () => `/apartments/amenity`,
        }),
        getApartmentById: builder.query({
            query: (id) => `/apartments/apartment/${id}`,
        }),
         getAllApartments: builder.query({
            query: (id) => `/apartments/apartment`,
        }),
         getAllApartmentAmenity: builder.query({
            query: (id) => `/apartments/amenity`,
        }),
            createApartment: builder.mutation({
            query: (newApartment) => ({
                url: `/apartments/apartment`,
                method: 'POST',
                body: newApartment,
            }),
        }),
        
    })
});

export const { useGetAllAmenityQuery, useGetAllapartmentAmenityQuery,useGetApartmentByIdQuery,useGetAllApartmentsQuery,useGetAllApartmentAmenityQuery,useCreateApartmentMutation
} = ApartmentApi;
