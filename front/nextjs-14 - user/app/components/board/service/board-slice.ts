import { createSlice } from "@reduxjs/toolkit";
import { findAllBoards, findBoardById, findCount, findDeleteById, findModify } from "./board-service";
import { IBoard } from "../model/board";



const boardThunks = [findAllBoards]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const handlePending = (state:any) => {
}


const handleRejected = (state:any) => {
}

interface boardState{
    json?:IBoard,
    array?:Array<IBoard>,
    message?:string,
    count?:number,
}

export const initialState: boardState = {
    json:{} as IBoard,      //자바의 IUser user= new Iuser();
    array:[] as Array<IBoard>,
    message:"",
    count:0,
}

export const boardSlice = createSlice({  
    name: "boards",
    initialState,
    reducers: {
        titleHandler: (state:any, {payload}) => {state.json.title = payload},
        descriptionHandler: (state:any, {payload}) => {state.json.description= payload}
    },
    extraReducers:builder =>{
        const {pending, rejected} = status;

        builder                                                 
        .addCase(findAllBoards.fulfilled, (state:any, {payload}:any)=>{state.array = payload})  
        .addCase(findBoardById.fulfilled, (state:any, {payload}:any)=>{state.json = payload})
        .addCase(findModify.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findDeleteById.fulfilled, (state:any, {payload}:any)=>{state.message = payload}) 
        .addCase(findCount.fulfilled, (state:any, {payload}:any)=>{state.count = payload}) 
    }                                                        
})

export const getBoardArray = (state: any) =>(state.board.array)  
export const getBoardJson = (state: any) => (state.board.json)
export const getBoardCount = (state: any) => (state.board.count)
export const getBoardMessage = (state: any) => (state.board.message)

export const {titleHandler, descriptionHandler} = boardSlice.actions

export default boardSlice.reducer;