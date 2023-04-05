import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './authSlice';
import { RootState } from './store';

export interface IPost {
  _id: string;
  content: string;
  image?: string;
  user: {
    _id: string;
    name: string;
    image: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
  likes: string[];
  comments: string[];
}

export interface IPostLikes extends Omit<IPost, 'likes'> {
  likes: {
    _id: string;
    name: string;
    image: string;
    email: string;
  }[];
}

export interface IComment {
  content: string;
  image?: string;
  user: Partial<IUser>;
  createdAt?: string;
  updatedAt?: string;
  likes: string[];
  replies: string[];
}

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

interface IAddPostResponse {
  message: string;
  post: any;
}

interface IGetPostsResponse {
  posts: IPost[];
}

interface IUploadImageResponse {
  message: string;
  uploadedImage: {
    secure_url: string;
    resource_type: string;
  };
}

interface ILikePostResponse {
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
  tagTypes: ['Post', 'Comment', 'Likes'],

  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, {}>({
      query: () => 'auth/profile',
    }),

    getUser: builder.query<IUser, { id: string }>({
      query: ({ id }) => `users/${id}`,
    }),

    getPosts: builder.query<IGetPostsResponse, {}>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),

    getSinglePost: builder.query<IPost, { postId: string }>({
      query: ({ postId }) => `posts/${postId}`,
      providesTags: ['Post'],
    }),

    getPostLikes: builder.query<IPostLikes, { postId: string }>({
      query: ({ postId }) => `posts/${postId}/likes`,
      providesTags: ['Post'],
    }),

    addPost: builder.mutation<IAddPostResponse, { content: string; image?: string }>({
      query: (data) => ({
        url: 'posts/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),

    getPostComments: builder.query<IComment[], { postId: string }>({
      query: ({ postId }) => `comments/post/${postId}`,
      providesTags: ['Comment'],
    }),

    addComment: builder.mutation<{}, { content: string; postId: string; image?: string }>({
      query: (data) => ({
        url: 'comments/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comment', 'Post'],
    }),

    likePost: builder.mutation<ILikePostResponse, string>({
      query(postId) {
        return {
          url: `posts/like/${postId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Post'],
    }),

    uploadImage: builder.mutation<IUploadImageResponse, FormData>({
      query: (data) => ({
        url: 'upload',
        method: 'POST',
        body: data,
      }),
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
  useAddPostMutation,
  useGetPostsQuery,
  useUploadImageMutation,
  useLikePostMutation,
  useGetUserQuery,
  useGetSinglePostQuery,
  useGetPostLikesQuery,
  useGetPostCommentsQuery,
  useAddCommentMutation,
} = backendApi;

export default backendApi;
