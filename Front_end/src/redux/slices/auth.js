import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token:"",
    isLoading: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn(state, action){
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logOut(state,action){
            state.isLoggedIn = false;
            state.token = "";
        },
    },
})

export default slice.reducer;

export function LoginUser(formValues){
    
}