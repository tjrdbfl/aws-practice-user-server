import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllArticlesAPI, findArticleByIdAPI, findCountAPI, findDeleteByIdAPI, findModifyAPI, findMyListAPI, saveArticleAPI } from "./article-api";
import { IArticle } from "../model/article";


export const findAllArticles: any = createAsyncThunk( // 데이터를 비동기로 만들어 자바와 주고 받으려고,
    'articles/findAllArticles',                        // createAsyncThunk가 없으면 동기로 보내는 것
    async (page: number) => (await findAllArticlesAPI(page)) // axios = 자바와 연결해주는 것
)
export const findArticleById: any = createAsyncThunk( 
    'articles/findArticleById',                      
    async (id: number) => (await findArticleByIdAPI(id))
)

export const findModify: any = createAsyncThunk( 
    'articles/findModify',                      
    async (article: IArticle) =>(await findModifyAPI(article))
)

export const findDeleteById: any = createAsyncThunk( 
    'articles/findDeleteById',                      
    async (id: number) => (await findDeleteByIdAPI(id))
   
)
export const findCount: any = createAsyncThunk( 
    'articles/findCount',                      
    async () => (await findCountAPI())
)
export const findMyList: any = createAsyncThunk( 
    'articles/findMyList',                      
    async (id:number) => (await findMyListAPI(id))
)
export const saveArticle: any = createAsyncThunk( 
    'articles/saveArticle',                      
    async (article:IArticle) => {
        console.log(JSON.stringify(article))
        return await saveArticleAPI(article)}
)


