import instance from "@/app/components/common/configs/axios-config"
import { IUser } from "../model/user"

export const findAllUsersAPI = async (page: number) => {
    try{
        const response = await instance.get('/users/list',{
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
        const response = await instance.get('/users/detail',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findModifyAPI = async (user: IUser) => {
    try{
        const response = (await instance.put('/users/modify', user))
            
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findDeleteByIdAPI = async (id: number) => {
    try{
        const response = await instance.delete('/users/delete',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findCountAPI = async () => {
    try{
        const response = await instance.get('/users/count',)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findLoginAPI = async (user : IUser) => {
    try{
        const response = await instance.post('/users/login',user)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findLogoutAPI = async (user : IUser) => {
    try{
        const response = await instance.post('/users/logout',user)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findUserByUsernameAPI = async (username : string) => {
    try{
        const response = await instance.get('/users/exists-username',
            {params:{username}}
        )
        return response.data.message
    }catch(error){
        console.log(error)
        return error
    }
}
export const findUserByPasswordAPI = async (user : IUser) => {
    try{
        const response = await instance.post('/users/exists-password',user)
        return response.data.message
    }catch(error){
        console.log(error)
        return error
    }
}