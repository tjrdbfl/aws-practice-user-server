import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllUsersAPI, findCountAPI, findDeleteByIdAPI, findLoginAPI, findModifyAPI, findUserByIdAPI, findUserByPasswordAPI, findUserByUsernameAPI } from "./user-api";
import { IUser } from "../model/user";


export const findAllUsers: any = createAsyncThunk(
    'users/findAllUsers',
    async (page: number) =>(await findAllUsersAPI(page))
)
export const findUserById: any = createAsyncThunk( 
    'users/findUserById',                      
    async (id: number) => (await findUserByIdAPI(id))
)
export const findModify: any = createAsyncThunk( 
    'users/findModify',                      
    async (user: IUser) =>(await findModifyAPI(user))
)
export const findDeleteById: any = createAsyncThunk( 
    'users/findDeleteById',                      
    async (id: number) => (await findDeleteByIdAPI(id))
)
export const findCount: any = createAsyncThunk( 
    'users/findCount',                      
    async () => (await findCountAPI())
)
export const findLogin: any = createAsyncThunk( 
    'users/findLogin',                      
    async (user:IUser) => await findLoginAPI(user) 
)
export const findUserByUsername: any = createAsyncThunk( 
    'users/findUserByUsername',                      
    async (username:string) => (await findUserByUsernameAPI(username))
)
export const findUserByPassword: any = createAsyncThunk( 
    'users/findUserByPassword',                      
    async (user:IUser) => (await findUserByPasswordAPI(user))
)