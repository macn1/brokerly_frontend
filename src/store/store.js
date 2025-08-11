// store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ApartmentApi } from './api/apartment';
import { AccountsAPI } from './api/accounts';
import { BookingsAPI } from './api/bookings'
import userReducer from './userSlice';

const rootReducer = combineReducers({
  [ApartmentApi.reducerPath]: ApartmentApi.reducer,
  [AccountsAPI.reducerPath]: AccountsAPI.reducer,
  [BookingsAPI.reducerPath]: BookingsAPI.reducer,

  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ApartmentApi.middleware, AccountsAPI.middleware,BookingsAPI.middleware),
});

export const persistor = persistStore(store);
