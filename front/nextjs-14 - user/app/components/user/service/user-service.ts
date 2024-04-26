import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllUsersAPI, findCountAPI, findDeleteByIdAPI, findLoginAPI, findLogoutAPI, findUserModifyAPI, findUserByIdAPI, findUserByUsernameAPI, findUserInfoAPI } from "./user-api";
import { IUser } from "../model/user";


export const findAllUsers: any = createAsyncThunk(
    'users/findAllUsers',
    async (page: number) =>(await findAllUsersAPI(page))
)
export const findUserById: any = createAsyncThunk( 
    'users/findUserById',                      
    async (id: number) => (await findUserByIdAPI(id))
)
export const findUserModify: any = createAsyncThunk( 
    'users/findUserModify',                      
    async (user: IUser) =>(await findUserModifyAPI(user))
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
export const findLogout: any = createAsyncThunk( 
    'users/findLogout',                      
    async () => await findLogoutAPI() 
)
export const findUserInfo: any = createAsyncThunk( 
    'users/findUserInfo',                      
    async () => await findUserInfoAPI() 
)
export const findUserByUsername: any = createAsyncThunk( 
    'users/findUserByUsername',                      
    async (username:string) => (await findUserByUsernameAPI(username))
)
