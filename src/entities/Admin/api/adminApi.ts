import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryConfig } from "../../../shared/api/api";
import { CreateAdminResponse, getToken } from '../admin.models';

interface CreateAdminRequest {
    email: string;
    password: string;
}

const adminConfig = {
    ...baseQueryConfig,
    baseUrl: baseQueryConfig.baseUrl+'/admin',
    prepareHeaders: (headers: Headers) => {
      const session = getToken();
      headers.set('Authorization', `Bearer ${session.token}`);
      return headers;
    },
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['Admin'],
  baseQuery: fetchBaseQuery(adminConfig),
  endpoints: (builder) => ({
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminRequest>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
    changeEmail: builder.mutation<any, any>({
      query: (data) => ({
        url: '/change/email',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
    changePassword: builder.mutation<any, string>({
      query: (data) => ({
        url: '/change/password',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateAdminMutation,
  useChangeEmailMutation,
  useChangePasswordMutation } = adminApi
