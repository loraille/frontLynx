import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // value: { token: null, firstname: null, email: null },
    value: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // state.value.token = action.payload.token;
            // state.value.firstname = action.payload.firstname;
            // state.value.email = action.payload.email
            state.value = action.payload;
        },
        logout: (state) => {
            // state.value.token = null;
            // state.value.username = null;
            // state.value.email = null
            state.value = {}
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
