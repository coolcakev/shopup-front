import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryConfig } from "../../../shared/api/api";
import { getToken } from '../../Admin/admin.models';

interface CreateOrderRequest {
  orderId: number;
  orderPlacer: string;
  deliveryAddress: string; 
  product: string;
}

const orderConfig = {
    ...baseQueryConfig,
    baseUrl: baseQueryConfig.baseUrl+'/order',
    prepareHeaders: (headers: Headers) => {
      const session = getToken();
      headers.set('Authorization', `Bearer ${session.token}`);
      return headers;
    },
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery(orderConfig),
  endpoints: (builder) => ({
    getOrders: builder.query<any, void>({
      query: () => ({
        url: '/get/all',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<any, string>({
      query: (id) => ({
        url: `/get/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    addOrder: builder.mutation<any, CreateOrderRequest>({
      query: (data) => ({
        url: '/add',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/remove/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useDeleteOrderMutation } = orderApi