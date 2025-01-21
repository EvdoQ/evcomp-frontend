import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    computer: [],
    search: "",
};

export const computerSlice = createSlice({
    name: "Computer",
    initialState: initialState,
    reducers: {
        setComputer: (state, action) => {
            state.computer = action.payload;
        },
    },
});

export const { setComputer } = computerSlice.actions;
export const computerReducer = computerSlice.reducer;
