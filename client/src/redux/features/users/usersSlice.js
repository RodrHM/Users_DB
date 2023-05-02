import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isAuthenticated:!!localStorage.getItem('token')?.length,
        user:{},
        token:"",
        role:"",
        errors:{}
    },
    reducers:{
        confirmUser: (state, action)=>{ // Cambiar por 'confirmUser' u otra cosa
            console.log('Esto es confirmUser')
            console.log(!!action.payload.length)
            state.isAuthenticated = !!action.payload.length
        },
        newTokenValue: (state, action)=>{
            // console.log('Esto es newTokenValue')
            state.token = action.payload
        },
        SendUser: (state, action)=>{ // Cambiar por 'confirmUser' u otra cosa
            // console.log('Esto es SendUser')
            state.user = action.payload
        },
        // clearToken: (state, action)=>{
        //     state.token = ''
        //     state.isAuthenticated = false
        // },
    }
})


export const {
    confirmUser,
    newTokenValue,
    SendUser
} = userSlice.actions

export default userSlice.reducer