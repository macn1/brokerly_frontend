import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token; 

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

export const AccountsAPI = createApi({
    reducerPath: 'AccountsAPI',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    })
});

export const { useLoginUserMutation
} = AccountsAPI;
