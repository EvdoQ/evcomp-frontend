import { configureStore } from "@reduxjs/toolkit";
import { computerReducer } from "./computerSlice";
import { computerApi, authApi } from "../../Apis";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
    reducer: {
        computerStore: computerReducer,
        userAuthStore: userAuthReducer,
        [computerApi.reducerPath]: computerApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(computerApi.middleware)
            .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
