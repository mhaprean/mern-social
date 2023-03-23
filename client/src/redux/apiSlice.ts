import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './authSlice';
import { RootState } from './store';


interface ILoginResponse {
  user: IUser;
  access_token: string;
}

interface IRegisterResponse {
  user: IUser;
  access_token: string;
}

interface IConfirmAccountResponse {
  message: string;
}

interface IForgotPasswordResponse {
  message: string;
}

interface IResetPasswordResponse {
  message: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export const backendApi = createApi({
  reducerPath: 'backendapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Quiz', 'Game', 'Result', 'Tournament'],

  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, {}>({
      query: () => 'auth/profile',
    }),

    loginUser: builder.mutation<ILoginResponse, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation<IRegisterResponse, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    confirmAccount: builder.mutation<IConfirmAccountResponse, { userId: string; token: string }>({
      query: (data) => ({
        url: 'auth/confirm',
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<IForgotPasswordResponse, { email: string }>({
      query: (data) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<IResetPasswordResponse, { userId: string; token: string; password: string }>({
      query: (data) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useConfirmAccountMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = backendApi;

export default backendApi;
