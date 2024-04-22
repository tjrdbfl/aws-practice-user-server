import axios from 'axios'
import { parseCookies } from 'nookies'
import { env } from 'process'

// export default function AxiosConfig(){
//     return {
//         headers: {
//             "Cache-Control": "no-cache",     //default 값 
//             "Content-Type": "application/json",
//             Authorization: `Bearer blah ~`,
//             "Access-Control-Allow-Origin": "*",
//         }
//     }
// }


const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL}) 

instance.interceptors.request.use(
    (config)=>{
        const accessToken=parseCookies().accessToken;
        console.log('Axios Interceptor에서 쿠키에서 토큰 추출');
        config.headers['Content-Type']="application/json";
        config.headers['Authorization']=`Bearer ${accessToken}`;
        
        return config
    },
    (error)=>{
        console.log('Axios Interceptor '+ error);
        return Promise.reject(error)    //결과 에러 
    }
)

instance.interceptors.response.use(
    (response)=>{
        if(response.status===404){
            console.log('Axios Interceptor에서 발생한 에러로 토큰이 없어서 404 페이지로 넘어감')

        }
        return response;
    }
)

export default instance;