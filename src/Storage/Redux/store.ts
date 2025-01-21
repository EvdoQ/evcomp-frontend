import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { computerReducer } from "./computerSlice";
import { computerApi } from "../../Apis";

const store = configureStore({
    reducer: {
        computerStore: computerReducer,
        [computerApi.reducerPath]: computerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(computerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
