import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllBoardsAPI, findBoardByIdAPI, findCountAPI, findDeleteByIdAPI, findModifyAPI } from "./board-api";
import { IBoard } from "../model/board";

export const findAllBoards: any = createAsyncThunk( // 데이터를 비동기로 만들어 자바와 주고 받으려고,
    'boards/findAllBoards',                        // createAsyncThunk가 없으면 동기로 보내는 것
    async (page: number) => (await findAllBoardsAPI(page))
)
export const findBoardById: any = createAsyncThunk( 
    'boards/findBoardById',                      
    async (id: number) =>(await findBoardByIdAPI(id))
)

export const findModify: any = createAsyncThunk( 
    'boards/findModify',                      
    async (board: IBoard) => (await findModifyAPI(board))
)
export const findDeleteById: any = createAsyncThunk( 
    'boards/findDeleteById',                      
    async (id: number) => (await findDeleteByIdAPI(id))
)
export const findCount: any = createAsyncThunk( 
    'boards/findCount',                      
    async () => (await findCountAPI())
)