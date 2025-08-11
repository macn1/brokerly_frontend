import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:null,
    userName:'',
    role:'',
    email:'',
    token:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.role = action.payload.role;
            state.email = action.payload.email
            state.token = action.payload.token
        },
        clearUser : (state) =>{
            state.id = null;
            state.userName = '';
            state.role = '';
            state.email = ''
        }
    }
})
export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer

