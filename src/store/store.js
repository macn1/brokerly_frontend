import { configureStore } from '@reduxjs/toolkit';
import { ApartmentApi } from '../store/api/apartment';
import {AccountsAPI} from '../store/api/accounts'


export const store = configureStore({
  reducer: {
    [ApartmentApi.reducerPath]: ApartmentApi.reducer,
    [AccountsAPI.reducerPath]: AccountsAPI.reducer,

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApartmentApi.middleware,
      AccountsAPI.middleware
   
    ),
});
