import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "../entities/Admin/api/adminApi";
import { productApi } from "../entities/Product/api/productApi";
import { orderApi } from "../entities/Order/api/orderApi";
import { userApi } from "../entities/User/api/userApi";
import { userAuthSlice } from "../entities/Admin/admin.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [userAuthSlice.name]: userAuthSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
        .concat(adminApi.middleware)
        .concat(userApi.middleware)
        .concat(productApi.middleware)
        .concat(orderApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
