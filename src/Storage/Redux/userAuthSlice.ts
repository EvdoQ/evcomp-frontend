import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

export const emptyUserState: userModel = {
    id: "",
    userName: "",
    fullName: "",
    role: "",
};

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.fullName = action.payload.fullName;
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.role = action.payload.role;
        },
    },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
