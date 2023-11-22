import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryConfig } from "../../../shared/api/api";
import { getToken } from '../../Admin/admin.models';

const productConfig = {
    ...baseQueryConfig,
    baseUrl: baseQueryConfig.baseUrl+'/product',
    prepareHeaders: (headers: Headers) => {
      const session = getToken();
      headers.set('Authorization', `Bearer ${session.token}`);
      return headers;
    },
}

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Product'],
  baseQuery: fetchBaseQuery(productConfig),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => ({
        url: '/get/all',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query<any, string>({
      query: (id) => ({
        url: `/get/${id}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<any, FormData>({
      query: (data) => ({
        url: '/add',
        method: 'PATCH',
        headers: {},
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/remove`,
        method: 'DELETE',
        params: {id}
      }),
      invalidatesTags: ['Product'],
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation } = productApi