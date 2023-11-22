import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryConfig } from "../../../shared/api/api";
import { getToken } from '../../Admin/admin.models';

const userConfig = {
    ...baseQueryConfig,
    baseUrl: baseQueryConfig.baseUrl+'/user',
    prepareHeaders: (headers: Headers) => {
      const session = getToken();
      headers.set('Authorization', `Bearer ${session.token}`);
      return headers;
    },
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery(userConfig),
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: '/get/all',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    createUser: builder.mutation<any, any>({
      query: (data) => ({
        url: '/add',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/remove`,
        method: 'DELETE',
        params: {id}
      }),
      invalidatesTags: ['User'],
    })
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation } = userApi

