import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState, extra }) => {
        // If skipAuth enabled → DON'T attach token
        if (extra?.skipAuth) {
            return headers;
        }

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

        // --------------------
        // AMENITIES
        // --------------------

        getAllAmenitiesapt: builder.query({
            query: () => `/apartments/amenity-all`,
            providesTags: ['Apartment'],
        }),

        getAllamenities: builder.query({
            query: () => `/apartments/amenities`,
            providesTags: ['Apartment'],
        }),

        getAmenitybyId: builder.query({
            query: (id) => `/apartments/amenity/${id}`,
            providesTags: ['Apartment'],
        }),

        getAllApartmentAmenity: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/amenity?${params}`;
            },
            providesTags: ['Apartment'],
        }),

        createApartmentAmenity: builder.mutation({
            query: (formData) => ({
                url: '/apartments/amenity',
                method: 'POST',
                body: formData,
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

        updateAmenity: builder.mutation({
            query: ({ id, data }) => ({
                url: `/apartments/amenity/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Apartment'],
        }),

        // --------------------
        // APARTMENTS
        // --------------------

        getAllApartmentpaginated: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/apartment-data?${params}`;
            },
            providesTags: ['Apartment'],
        }),
        getAllApartmentpaginatedClients: builder.query({
            query: ({ page = 1, page_size = 10, ...filters } = {}) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/apartment-clients-data?${params}`;
            },
            // Add skipAuth as an option in the query call, not in the returned object
            providesTags: ['Apartment'],
        }),

        getAllApartmentpaginatedVendor: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/apartment-vendor-data?${params}`;
            },
            providesTags: ['Apartment'],
        }),
        getAllaprtmentsName: builder.query({
            query: () => `/apartments/apartment-name`,
            providesTags: ['Apartment'],
        }),

        getApartmentById: builder.query({
            query: (id) => `/apartments/apartment/${id}`,
            providesTags: ['Apartment'],
        }),

        getAllApartments: builder.query({
            query: () => `/apartments/apartment`,
            providesTags: ['Apartment'],
        }),

        apartmentDetail: builder.query({
            query: (id) => ({
                url: `/apartments/apartment/${id}`,
                method: "GET",
            }),
            providesTags: ['Apartment'],
        }),

        createApartment: builder.mutation({
            query: (newApartment) => ({
                url: `/apartments/apartment`,
                method: 'POST',
                body: newApartment,
            }),
            invalidatesTags: ['Apartment'],
        }),

        updateApartment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/apartments/apartment/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Apartment'],
        }),
        updateApartmentStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/apartments/apartment-status/${id}`,
                method: 'PUT',
                body: data,
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

        uploadApartmentImages: builder.mutation({
            query: (formData) => ({
                url: '/apartments/images',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Apartment'],
        }),

        // --------------------
        // FACILITIES
        // --------------------

        getAllApartmentFacilities: builder.query({
            query: () => `/apartments/facility`,
            providesTags: ['Apartment'],
        }),

        getFacilityById: builder.query({
            query: (id) => `/apartments/facility/${id}`,
            providesTags: ['Apartment'],
        }),

        getAllPaginatedApartmentFacilities: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/paginated-facility?${params}`;
            },
            providesTags: ['Apartment'],
        }),


        createApartmentFacility: builder.mutation({
            query: (data) => ({
                url: '/apartments/facility',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Apartment'],
        }),

        updateFacility: builder.mutation({
            query: ({ id, data }) => ({
                url: `/apartments/facility/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Apartment'],
        }),

        deleteApartmentFacilities: builder.mutation({
            query: (id) => ({
                url: `/apartments/facility/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Apartment'],
        }),

        // --------------------
        // EXTRA SERVICES
        // --------------------

        getAllapartmentsExtraservice: builder.query({
            query: () => `/apartments/extra-service`,
            providesTags: ['Apartment'],
        }),

        getAllPagiantedapartmentsExtraservice: builder.query({
            query: ({ page = 1, page_size = 10, ...filters }) => {
                const params = new URLSearchParams({ page, page_size, ...filters }).toString();
                return `/apartments/paginated-extra-service?${params}`;
            },
            providesTags: ['Apartment'],
        }),

        createExtraservice: builder.mutation({
            query: (formData) => ({
                url: "/apartments/extra-service",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Apartment"],
        }),

        deleteApartmentExtraervice: builder.mutation({
            query: (id) => ({
                url: `/apartments/extra-service/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Apartment'],
        }),

    })
});

export const {
    useUpdateApartmentStatusMutation,
    useGetAllaprtmentsNameQuery,
    useGetAllApartmentpaginatedClientsQuery,
    useGetAllApartmentpaginatedVendorQuery,
    useGetAllApartmentpaginatedQuery,
    useGetAllAmenitiesaptQuery,
    useGetFacilityByIdQuery,
    useUpdateFacilityMutation,
    useUpdateApartmentMutation,
    useUpdateAmenityMutation,
    useGetAmenitybyIdQuery,
    useGetAllamenitiesQuery,
    useDeleteApartmentExtraerviceMutation,
    useDeleteApartmentFacilitiesMutation,
    useCreateExtraserviceMutation,
    useGetAllPagiantedapartmentsExtraserviceQuery,
    useCreateApartmentFacilityMutation,
    useGetAllPaginatedApartmentFacilitiesQuery,
    useCreateApartmentAmenityMutation,
    useDeleteApartmentAmenityMutation,
    useUploadApartmentImagesMutation,
    useApartmentDetailQuery,
    useDeleteApartmentMutation,
    useGetAllAmenityQuery,
    useGetAllApartmentAmenityQuery,
    useGetApartmentByIdQuery,
    useGetAllApartmentsQuery,
    useCreateApartmentMutation,
    useGetAllApartmentFacilitiesQuery,
    useGetAllapartmentsExtraserviceQuery
} = ApartmentApi;
