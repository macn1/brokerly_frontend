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

export const ApartmentApi = createApi({
    reducerPath: 'ApartmentApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Apartment'],
    endpoints: (builder) => ({
        getAllAmenity: builder.query({
            query: () => `/apartments/room-amenity`,
        }),
        getAllamenities: builder.query({
            query: () => `/apartments/amenities`,
        }),
        getApartmentById: builder.query({
            query: (id) => `/apartments/apartment/${id}`,
        }),
        getAllApartments: builder.query({
            query: () => `/apartments/apartment`,
            providesTags: ['Apartment'],
        }),
        getAllApartmentAmenity: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/amenity?${params}`;
            },
            invalidatesTags: ['Apartment'],
        }),
        createApartment: builder.mutation({
            query: (newApartment) => ({
                url: `/apartments/apartment`,
                method: 'POST',
                body: newApartment,
            }),
            invalidatesTags: ['Apartment'],
        }),
        getAllApartmentFacilities: builder.query({
            query: () => `/apartments/facility`,
        }),
        deleteApartmentFacilities: builder.mutation({
            query: (id) => ({
                url: `/apartments/facility/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Apartment'],
        }),
        getAllPaginatedApartmentFacilities: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/paginated-facility?${params}`;
            },
            invalidatesTags: ['Apartment'],

        }),

        getAllapartmentsExtraservice: builder.query({
            query: () => `/apartments/extra-service`,
        }),
        getAllPagiantedapartmentsExtraservice: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/paginated-extra-service?${params}`;
            },
            invalidatesTags: ['Apartment'],
        }),
        deleteApartmentExtraervice: builder.mutation({
            query: (id) => ({
                url: `/apartments/extra-service/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Apartment'],
        }),
        deleteApartment: builder.mutation({
            query: (id) => ({
                url: `/apartments/apartment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Apartment'],
        }),
        deleteApartmentAmenity: builder.mutation({
            query: (id) => ({
                url: `/apartments/amenity/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Apartment'],
        }),

        apartmentDetail: builder.query({
            query: (id) => ({
                url: `/apartments/apartment/${id}`,
                method: "GET"
            })
        }),
        uploadApartmentImages: builder.mutation({
            query: (formData) => ({
                url: '/apartments/images',
                method: 'POST',
                body: formData,
            }),
        }),
        createApartmentAmenity: builder.mutation({
            query: (formData) => ({
                url: '/apartments/amenity',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Apartment'],
        }),
        createApartmentFacility: builder.mutation({
            query: (data) => ({
                url: '/apartments/facility',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Apartment'],
        }),
        createExtraservice: builder.mutation({
            query: (formData) => ({
                url: "/apartments/extra-service",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Apartment"],
        }),

    })
});

export const {useGetAllamenitiesQuery, useDeleteApartmentExtraerviceMutation, useDeleteApartmentFacilitiesMutation, useCreateExtraserviceMutation, useGetAllPagiantedapartmentsExtraserviceQuery, useCreateApartmentFacilityMutation, useGetAllPaginatedApartmentFacilitiesQuery, useCreateApartmentAmenityMutation, useDeleteApartmentAmenityMutation, useUploadApartmentImagesMutation, useApartmentDetailQuery, useDeleteApartmentMutation, useGetAllAmenityQuery, useGetAllapartmentAmenityQuery, useGetApartmentByIdQuery, useGetAllApartmentsQuery, useGetAllApartmentAmenityQuery, useCreateApartmentMutation, useGetAllApartmentFacilitiesQuery, useGetAllapartmentsExtraserviceQuery
} = ApartmentApi;
