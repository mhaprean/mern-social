import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authSlice from './authSlice';
import backendApi from './apiSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedAuth = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([backendApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;