'use client'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import { PG } from "@/app/components/common/enums/PG";
import { IUser } from "@/app/components/user/model/user";
import { findDeleteById, findLogout, findUserById, findUserInfo, findUserModify } from "@/app/components/user/service/user-service";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AttachFile, ElevatorSharp, FmdGood, ThumbUpAlt } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { MyTypography } from "@/app/components/common/style/cell";
import { getUserJson } from "@/app/components/user/service/user-slice";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { destroyCookie } from "nookies";
import "./../user-detail.css";

interface IFormValues{
  id: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  job: string;
}

export default function userDetailPage(props: any) {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    defaultValues:{
      id: 0,
      username: "",
      password: "",
      name: "",
      phone: "",
      job: ""
    },mode:"onTouched"
   , shouldFocusError:false
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector(getUserJson);

  useEffect(() => {
    if (props.params.id != 0) {
      findUserById(props.params.id)
    }
  }, [])

  const handleCancel = () => {
    alert("회원 정보 수정을 취소합니다.")
    router.back();
  }

  const onSubmit:SubmitHandler<IFormValues>=(user: IUser,event:any)=>{
    event.preventDefault();
    dispatch(findUserModify(user))
      .then((res: any) => {
        console.log(res.payload)
        if(res?.payload==='SUCCESS'){
          alert("회원 정보 수정 완료");
          router.push(`${PG.BOARD}/list`);
        }else if(res?.payload==='FAILURE'){
          alert("회원 정보 수정 실패");
        }
      })
      .catch((error: any) => {
        alert("회원 정보 수정 실패");
      }).finally(()=>{
        location.reload();
      });
  }

  const handleWithDrawal = () => {
    dispatch(findDeleteById(props.params.id)).
      then((res: any) => {
        console.log(res.payload)
        if (res.payload === 'SUCCESS') {
          alert('회원 탈퇴 완료');
          dispatch(findLogout())
            .then((res: any) => {
              destroyCookie(null, 'accessToken')
              console.log('destroy 쿠기 후: showProfile:false');
              router.push('/');
            })
        } else {
          alert('회원 탈퇴 실패');
        }
      })
  }

  // const validateOnMount=(value,defaultValue)=>{
  //   if(value===defaultValue) return null;
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-xl mx-auto mb-10 mt-10">
        <label htmlFor="large" className="text-base font-medium text-gray-900 dark:text-white">Large select</label>
        <div className="editor mx-auto w-11/12 flex flex-col text-gray-800 border border-gray-300 p-7 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-7">회원 정보 수정</h1>
          <input
            {...register('id')}
            type="hidden" 
            defaultValue={props.params.id} />
         
            <label className="input_text_label">아이디</label><br/>
            <input
              {...register('username')}
              className="input_className" 
              type="text" 
              defaultValue={userInfo.username} 
              readOnly
            />
            <p className=" text-green-600 font-semibold">수정할 수 없습니다.</p>

            <label className="input_text_label">비밀번호</label><br/>
            <input
              {...register('password', {maxLength: 20,required:"반드시 입력해주세요.",pattern:{
                  value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[()%@'*|=${.}?/!<>+_#*]).{8,20}$/g,
                  message:"잘못된 형식의 비밀번호 입니다(최소 8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상)",
              }
          // ,validate:{validateOnMount(defau)}
            })}
              className="input_className"
              placeholder="Password"
              type="text"
              name="password"
              defaultValue={userInfo.password} 
            />
            {errors?.password? <p className="error_msg">{errors.password.message}</p>:null}

            <label className="input_text_label">이름</label><br/>
            <input
            {...register('name', { required:"반드시 입력해주세요.",minLength:{value:3,message:"3글자 이상 입력해주세요"}})}
             className="input_className"
             placeholder="Name"
             type="text"
             name="name"
             defaultValue={userInfo.name}
            />
            {errors?.name? <p className="error_msg">{errors.name.message}</p>:null}

            <label className="input_text_label">전화번호</label><br/>
            <input
             {...register('phone', { maxLength: 20, required:"반드시 입력해주세요."
            //  ,pattern:{
            //   value:/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
            //   message:"휴대전화 번호 형식에 맞게 작성해주세요.(010-0000-0000)"
            //  } 
            })}
             className="input_className"
             placeholder="Phone"
             type="text"
             name="phone"
             defaultValue={userInfo.phone}
            />
            {errors?.phone? <p className="error_msg">{errors.phone.message}</p>:null}

            <label className="input_text_label">직업</label><br/>
            <input
             {...register('job', { maxLength: 20,required:"반드시 입력해주세요." })}
             className="input_className"
             placeholder="Job"
             type="text"
             name="job"
             defaultValue={userInfo.job}
            />
             {errors?.job? <p className="error_msg">{errors.job.message}</p>:null}

          {/* <!-- buttons --> */}
          <div className="buttons flex justify-center gap-5 mt-7">
            <div className="btn_click"
              onClick={handleCancel}>취소</div>
            <input
              type="submit" value="수정"
              className="btn_click"
            />
          </div>
        </div>
        <div className="btn_withDrawal"
          onClick={handleWithDrawal}>회원 탈퇴</div>
      </form>

    </>);
}

