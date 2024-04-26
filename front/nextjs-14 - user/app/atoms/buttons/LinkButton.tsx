'use client';
import { PG } from "@/app/components/common/enums/PG";
import { IUser } from "@/app/components/user/model/user";
import { findUserInfo } from "@/app/components/user/service/user-service";
import { getUserJson } from "@/app/components/user/service/user-slice";
import { JwtHeader, JwtPayload, jwtDecode } from "jwt-decode";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ILinkButton{
    id:number,
    title:string,
    path:string
}
export default function LinkButton({id,title,path}:ILinkButton){
    return(
    <Link key={id.toString()} href={`${path}`} className="block py-2 px-3 text-gray-900 rounded
     hover:bg-gray-100 md:hover:bg-transparent
      md:hover:text-blue-700 md:p-0
       dark:text-white md:dark:hover:text-blue-500
        dark:hover:bg-gray-700
         dark:hover:text-white 
         md:dark:hover:bg-transparent
          dark:border-gray-700" 
          aria-current="page">{title}
  </Link>
);
}

const token:string|null=parseCookies()?.accessToken;

export const linkButtonTitles=[
    {id:1,title:'회원가입',path:`${PG.USER}/join`},
    {id:2,title:'로그인',path:`/`},
    {id:3,title:'마이페이지',path:`${PG.USER}/detail/${token? jwtDecode<any>(token).id:0}`},
    {id:4,title:'게시판목록',path:`${PG.BOARD}/list`},
]

export const settings=['Profile','Account','Dashboard','Logout'];