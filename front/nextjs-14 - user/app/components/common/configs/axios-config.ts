import axios, { AxiosInstance } from 'axios'
import { error } from 'console'
import { response } from 'express'
import { parseCookies } from 'nookies'
import { env } from 'process'


export default function instance(){
    const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL}) 
    setInterceptor(instance)
    return instance;
}

export const setInterceptor = (inputInstance:AxiosInstance) => {
    inputInstance.interceptors.request.use(
        (config)=>{
            config.headers["Content-Type"]="application/json";
            config.headers["Authorization"]=`Bearer ${parseCookies().accessToken}`
            return config;
        }
        ,
    (error)=>{
        console.log('Axios Interceptor error: '+error)
        return Promise.reject(error)
    }
    )
    inputInstance.interceptors.response.use(
        (response)=>{
            if(response.status===404)
                console.log('Axios Interceptor catches 404')
            return response
        }
    )
    return inputInstance
}