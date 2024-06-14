import { createSlice } from "@reduxjs/toolkit";

const initialState = {isLoggedIn: false, token: '', userID: ''};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setUserID(state, action) {
            state.userID = action.payload;
        }

    }
});
export const authAction = authSlice.actions;

export default authSlice;