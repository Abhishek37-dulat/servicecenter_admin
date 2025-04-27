import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import sidebarSlice from "./slices/sidebarSlice";
 import  loaderSlice  from "./slices/loadingSlice";
 
import studentSlice from "./slices/studentSlice";
 
import { adminApi } from "./services/adminApi";
 
import { businessApi } from "./services/businessApi";
import { serviceApi } from "./services/serviceApi";
import { amenityApi } from "./services/amenityApi";
 
const setUpStore = () => {
  const store = configureStore({
    reducer: {
 
      [adminApi.reducerPath]: adminApi.reducer,
      [businessApi.reducerPath]: businessApi.reducer,
      [serviceApi.reducerPath]: serviceApi.reducer,
      [amenityApi.reducerPath]: amenityApi.reducer,
      
      
      auth: authReducer,
      loader: loaderSlice,
      sidebar: sidebarSlice,
      student: studentSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        adminApi.middleware,
        businessApi.middleware,
        serviceApi.middleware,
        amenityApi.middleware,
      
      ),
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = setUpStore();
