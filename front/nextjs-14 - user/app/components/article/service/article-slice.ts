import { createSlice } from "@reduxjs/toolkit";
import { findAllArticles, findArticleById, findCount, findDeleteById, findModify, findMyList, saveArticle } from "./article-service";
import { IArticle } from "../model/article";

const articleThunks = [findAllArticles]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const handlePending = (state:any) => {
}

const handleRejected = (state:any) => {
}

interface articleState{
    json?:IArticle,
    array?:Array<IArticle>,
    message?:string,
    count?:number,
}
export const initialState:articleState={
    json:{} as IArticle,
    array:[] as Array<IArticle>,
    message:"",
    count:0,
}

export const articleSlice = createSlice({   // 슬라이스의 이름 = articles, 슬라이스의 키  = article (리듀서에 있음)
    name: "articles",
    initialState,
    reducers: {
        titleHandler: (state:any, {payload}) => {state.json.title = payload},
        contentHandler: (state:any, {payload}) => {state.json.content= payload},
        boardIdHandler: (state:any, {payload}) => {state.json.boardId= payload}
    }, // reducers 내부 
    extraReducers:builder =>{ // extraReducers 외부
        const {pending, rejected} = status;

        builder                                      // 빌더인데 하나에만 반응한다 = 자바의 switch case와 유사
        .addCase(findAllArticles.fulfilled, (state:any, {payload}:any)=>{state.array = payload}) // 19~23번 생락하고 하나로 합침
        .addCase(findArticleById.fulfilled, (state:any, {payload}:any)=>{state.json = payload})   
        .addCase(findDeleteById.fulfilled, (state:any, {payload}:any)=>{state.message = payload}) 
        .addCase(findCount.fulfilled, (state:any, {payload}:any)=>{state.count = payload})
        .addCase(findModify.fulfilled, (state:any, {payload}:any) => {state.array = payload}) 
        .addCase(findMyList.fulfilled, (state:any, {payload}:any) => {state.array = payload}) 
        .addCase(saveArticle.fulfilled, (state:any, {payload}:any) => {state.message = payload}) 
    }

})

export const getArticleArray = (state: any) =>(state.article.array) 
export const getArticleJson = (state: any) => (state.article.json)
export const getArticleCount = (state: any) => (state.article.count) 
export const getArticleMessage = (state: any) => (state.article.message) 
 
export const {titleHandler, contentHandler,boardIdHandler} = articleSlice.actions

export default articleSlice.reducer; // 여러개의 리듀서를 합치는 문법 (마지막은 리턴값은 단수형)