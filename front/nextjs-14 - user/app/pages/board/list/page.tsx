'use client'

import CardButton from "@/app/atoms/buttons/CardButton"
import { IBoard } from "@/app/components/board/model/board"
import { findAllBoards } from "@/app/components/board/service/board-service"
import { getBoardArray } from "@/app/components/board/service/board-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function BoardCards() {
    const dispatch = useDispatch()
    const allBoards = useSelector(getBoardArray)

    useEffect(() => {
        dispatch(findAllBoards(1))
    }, [dispatch])

    return (<>
        {allBoards.map((board: IBoard)=>(<CardButton key={board.id} id={board.id||0} title={board.title||""} description={board.description||""}/>))}
    </>
)
}