'use client'
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Typography } from "@mui/material"
import { findCount } from "@/app/components/user/service/user-service"
import UserColumns from "@/app/components/user/module/user-column"
import { findAllUsers } from "@/app/components/user/service/user-service"
import { getUserArray, getAuth, getUserJson } from "@/app/components/user/service/user-slice"
import { IUser } from "@/app/components/user/model/user"
import { getUserCount } from "@/app/components/user/service/user-slice"

const UsersPage: NextPage = () => {
   
    const dispatch = useDispatch()
    const allUsers: [] = useSelector(getUserArray)
    const countUsers = useSelector(getUserCount)

    useEffect(()=>{
        dispatch(findAllUsers())
        dispatch(findCount())
    },[])

    return(<>
  <h2> 사용자 수 : {countUsers?.message||0} </h2>

    <div style={{ height: "100%", width: "100%" }}>
      {allUsers && <DataGrid 
        rows={allUsers}
        columns={UserColumns()}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
      />}
    </div>
    </>)
}

export default UsersPage