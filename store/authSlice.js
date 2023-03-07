import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    idToken:null,
    expiresIn:null,
    email:null

}

const authSlice = createSlice({
    name: 'cartPage',
    initialState,
    reducers:{
        setAuthDetails:(state, action)=>{
            state.idToken=action.payload.idToken
            state.expiresIn=action.payload.expiresIn
            state.email = action.payload.email
        },
        resetAuthDetails:(state,action)=>{
            state.idToken=null
            state.expiresIn=null
            state.email=null
        }
    }
})
export const {setAuthDetails, resetAuthDetails} = authSlice.actions
export default authSlice.reducer