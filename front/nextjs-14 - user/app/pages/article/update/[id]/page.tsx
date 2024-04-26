'use client'
import { MyTypography } from "@/app/components/common/style/cell";
import { ThumbUpAlt, FmdGood, AttachFile, Article } from "@mui/icons-material";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { IArticle } from "@/app/components/article/model/article";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getArticleJson, getArticleMessage } from "@/app/components/article/service/article-slice";
import { findArticleById, findArticleModify, saveArticle } from "@/app/components/article/service/article-service";
import { PG } from "@/app/components/common/enums/PG";
import { ListItem } from "@mui/material";
import { getBoardArray } from "@/app/components/board/service/board-slice";
import { findAllBoards } from "@/app/components/board/service/board-service";
import { IBoard } from "@/app/components/board/model/board";
import { error } from "console";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import {useForm} from 'react-hook-form';

const UpdateArticlePage: NextPage = (props:any) => {
  
  const {register,handleSubmit, formState:{errors}}=useForm();

  const dispatch = useDispatch();
  const options=useSelector(getBoardArray);
  const router = useRouter();
  const resArticle=useSelector(getArticleJson)

  useEffect(()=>{
    dispatch(findArticleById(props.params.id))
    .then((res:any)=>{
      console.log(JSON.stringify(resArticle))  
      dispatch(findAllBoards());
    })
    .catch((error:any)=>{

    })
    
  },[])
  
  const handleCancel = () => {
    alert("작성이 취소되었습니다")
    router.back();
  }

  const onSubmit=(article:IArticle)=>{
    console.log(jwtDecode<any>(parseCookies().accessToken).id)
    dispatch(findArticleModify(article))
    .then((res:any)=>{
      console.log(JSON.stringify(res))
      if(res?.payload==='SUCCESS'){
        alert("게시글 수정 완료 ");
        router.push(`${PG.ARTICLE}/list/${article.boardId}`);
      }else if(res?.payload==='FAILURE'){
        alert("게시글 수정 실패");
      }
    })
    .catch((error:any)=>{

    });
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mb-10">
        <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Large select</label>
        <select 
        {...register('boardId',{required:true})}
        id="large"
  className="block mx-auto mb-4 w-10/12 max-w-2xl px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  defaultValue="게시판 목록"
>
  
  <option value="게시판 목록" selected>게시판 목록</option>
  {options.map((item:IBoard)=>(
    <option value={item.id} key={item.id} title={item.title} >{item.title}</option>
  ))}
</select>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        {MyTypography('Article 작성', "1.5rem")}
        <input 
         {...register('id',{required:true})}
        type="hidden" value={props.params.id} />
        <input 
         {...register('writerId',{required:true})}
        type="hidden" value={`${jwtDecode<any>(parseCookies().accessToken).id}`} />
        <input className="writerId bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" type="text" value={`작성자 : ${jwtDecode<any>(parseCookies().accessToken).username}`} readOnly
        />
        <input 
        {...register('title',{required:true,maxLength:40})} 
        className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" 
        placeholder="Title" 
        type="text" 
        name="title"
        defaultValue={resArticle?.title}/>
        <textarea 
        {...register('content',{required:true,maxLength:300})}
        className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" 
        placeholder="Describe everything about this post here" 
        name="content"
        defaultValue={resArticle?.content}
        />
            
        {/* <!-- icons --> */}
        <div className="icons flex text-gray-500 m-2">
          <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <ThumbUpAltIcon component={ThumbUpAlt}></ThumbUpAltIcon>
          </svg>
          <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <FmdGoodIcon component={FmdGood}></FmdGoodIcon>
          </svg>
          <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <AttachFileIcon component={AttachFile}></AttachFileIcon>
          </svg>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">{register('content')?.ref.length}/300</div>
        </div>
        {/* <!-- buttons --> */}
        <div className="buttons flex">
          <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- behtmlFore:block behtmlFore:absolute behtmlFore:h-full behtmlFore:w-1/2 behtmlFore:rounded-full
      behtmlFore:bg-pink-400 behtmlFore:top-0 behtmlFore:left-1/4 behtmlFore:transition-transhtmlForm behtmlFore:opacity-0 behtmlFore:hover:opacity-100 hover:text-200 hover:behtmlFore:animate-ping transition-all duration-00"
            onClick={handleCancel}>Cancel</div>

<input 
 type="submit" value="SUBMIT"
className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- behtmlFore:block behtmlFore:absolute behtmlFore:h-full behtmlFore:w-1/2 behtmlFore:rounded-full
      behtmlFore:bg-pink-400 behtmlFore:top-0 behtmlFore:left-1/4 behtmlFore:transition-transhtmlForm behtmlFore:opacity-0 behtmlFore:hover:opacity-100 hover:text-200 hover:behtmlFore:animate-ping transition-all duration-00"
            />
        </div>
      </div>
      </form>)
}
export default UpdateArticlePage;









