import instance from "@/app/components/common/configs/axios-config"
import { IUser } from "../model/user"

export const findAllUsersAPI = async (page: number) => {
    try{
        const response = await instance().get('/users/list',{
            params: {page, size:10, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findUserByIdAPI = async (id: number) => {
    try{
        const response = await instance().get('/users/detail',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findUserModifyAPI = async (user: IUser) => {
    try{
        const response = (await instance().put('/users/modify', user))
            
        return response.data.message
    }catch(error){
        console.log(error)
        return error
    }
}
export const findDeleteByIdAPI = async (id: number) => {
    try{
        const response = await instance().delete('/users/delete',{
            params: {id}
        })
        return response.data.message
    }catch(error){
        console.log(error)
        return error
    }
}
export const findCountAPI = async () => {
    try{
        const response = await instance().get('/users/count',)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findLoginAPI = async (user : IUser) => {
    try{
        const response = await instance().post('/auth/login',user)    //토큰 발급 되기 전 : auth - interceptor 통과 
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findLogoutAPI = async () => {
    try{
        const response = await instance().get('/users/logout')
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findUserInfoAPI = async () => {
    try{
        const response = await instance().get('/users/search')
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findUserByUsernameAPI = async (username : string) => {
    try{
        const response = await instance().get('/auth/exists-username',        //토큰 발급 되기 전 : auth - interceptor 통과 
            {params:{username}}
        ) 
        return response.data.message
    }catch(error){
        console.log(error)
        return error
    }
}
