import { createSlice } from "@reduxjs/toolkit";
import { findAllUsers, findCount, findDeleteById, findLogin, findModify, findUserById, findUserByPassword, findUserByUsername } from "./user-service";
import { IUser } from "../model/user";


const userThunks = [findAllUsers]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected' 
}

interface IAuth{
    message?:string,
    token?:string,
}

interface userState{
    json?:IUser,
    array?:Array<IUser>,
    auth?:IAuth,
    message?:string,
    count?:number,
}

export const initialState: userState = {
    json:{} as IUser,      //자바의 IUser user= new Iuser();
    array:[] as Array<IUser>,
    auth:{} as IAuth,
    message:"",
    count:0,
}
const handlePending = (state:any) => {}

const handleRejected = (state:any) => {}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        passwordHandler: (state:any, {payload}) => {state.json.password = payload},
        phoneHandler: (state:any, {payload}) => {state.json.phone = payload},
        jobHandler: (state:any, {payload}) => {state.json.job = payload},
        // setUsername : (state:any, {payload}) => {state.json.username = payload},
        // setPassword : (state:any, {payload}) => {state.json.password = payload}
       
    },
    extraReducers:builder =>{
        const {pending, rejected} = status;

        builder
        .addCase(findAllUsers.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findUserById.fulfilled, (state:any, {payload}:any) => {state.json = payload})
        .addCase(findModify.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findDeleteById.fulfilled, (state:any, {payload}:any) => {state.message = payload})
        .addCase(findCount.fulfilled, (state:any, {payload}:any) => {state.count = payload})
        .addCase(findUserByUsername.fulfilled, (state:any, {payload}:any) => {state.message = payload})
        .addCase(findLogin.fulfilled, (state:any, {payload}:any) => {state.auth = payload})
        .addCase(findUserByPassword.fulfilled, (state:any, {payload}:any) => {state.message = payload})
 }
})

export const getUserArray = (state:any) =>(state.user.array)
export const getUserJson = (state: any) => (state.user.json)
export const getUserCount = (state: any) => (state.user.count)
export const getUserMessage = (state: any) => (state.user.message)
export const getAuth = (state: any) => (state.user.auth)

export const {passwordHandler, phoneHandler, jobHandler } = userSlice.actions

export default userSlice.reducer;