'use client'
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from "next";
import { getArticleArray, getArticleCount } from "@/app/components/article/service/article-slice";
import { findAllArticles, findCount, findDeleteById, findMyList } from "@/app/components/article/service/article-service";
import { DataGrid, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import ArticleColumns from "@/app/components/article/module/article-columns";
import React from "react";
import { IArticle } from "@/app/components/article/model/article";
import MoveButton from "@/app/atoms/buttons/MoveButton";
import { PG } from "@/app/components/common/enums/PG";
import { useRouter } from "next/navigation";


const cards = [
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];

export default function MyListPage (props:any) {
    const dispatch = useDispatch();
    const allArticles: IArticle[] = useSelector(getArticleArray) 
    const router=useRouter();
    let selectedId:GridRowId=0;

    useEffect(()=>{
      dispatch(findMyList(props.params.id));
    },[])
    
    const handleDelete=()=>{
      console.log("selectedId: "+selectedId)
      dispatch(findDeleteById(selectedId))
      .then((res:any)=>{
        if(res.payload.message==='SUCCESS'){
          location.reload();
          alert('게시글 삭제를 성공하셨습니다.')
          
        }else{
          alert('게시글 삭제를 실패하셨습니다.')
        }
        
      }).catch((error:any)=>{

      })
    }
    const handleModify=()=>{
      if(selectedId==0){
        alert('수정할 게시글을 선택해주세요')
      } else{
        router.push(`${PG.ARTICLE}/update/${selectedId}`)
      }
    }
    
    return (<>
    <div className="flex flex-col  items-center justify-center w-full bg-white-300">
      <div className="flex overflow-x-scroll snap-x snap-mandatory max-w-6xl no-scrollbar">
        {cards.map((data, index) => {
          return (
            <section
              className="flex-shrink-0 w-full snap-center justify-center items-center"
              key={index}
            >
              <img
                src={data}
                alt="Images to scroll horizontal"
                className="w-full h-[500px]"
              />
            </section>
          );
        })}
      </div>
      <MoveButton text={"글쓰기"} path={`${PG.ARTICLE}/save`}/>
    </div>
    <div className="flex items-center">
        <h2 className=" text-xl mt-7 ml-7"> 게시글 수 :{allArticles.length} </h2> 
        <button  
        className="relative inline-flex items-center justify-center m-10 p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900
        rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white
        dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 mt-10"
            onClick={handleModify}
            > 
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {<Typography textAlign="center" sx={{fontSize:"1.2rem"}}>수정</Typography>} 
            </span>
            </button>
        <button  
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900
        rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white
        dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 mt-10"
            onClick={handleDelete}
            > 
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {<Typography textAlign="center" sx={{fontSize:"1.2rem"}}>삭제</Typography>} 
            </span>
            </button>
            </div>
        <Box sx={{ height: "100%", width: '100%' }}>
      {allArticles && <DataGrid
        rows={allArticles}
        columns={ArticleColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(rowSelectionModel:GridRowSelectionModel)=>{
          selectedId=rowSelectionModel[0]
          console.log("selectedId: "+selectedId)
        }}
      />}
    </Box>
    </>)
}