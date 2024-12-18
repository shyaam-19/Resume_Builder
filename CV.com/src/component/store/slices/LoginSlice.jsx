import {createSlice} from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
    name : "userLoginDetails",
    initialState : {
        isLogin : false,
        userName : null
    },
    reducers : {
        loginAction : (state,payload)=>{
            state.isLogin=true;
            state.userName = payload.payload;
        },
        logoutAction : (state)=>{
            state.isLogin=false;
            state.userName=null;
        }
    }
});

export default userLoginSlice.reducer;
export const {loginAction} = userLoginSlice.actions;
export const {logoutAction} = userLoginSlice.actions;

// {
//     firstName : '',
//     lastName : '',
//     email : '',
//     photourl : '',
//     token : ''
// }