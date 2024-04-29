'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PG } from "./components/common/enums/PG";
import { useRouter } from "next/navigation";
import { getAuth, getUserJson, getUserMessage } from "./components/user/service/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { findLogin, findUserByUsername } from "./components/user/service/user-service";
import { IUser } from "./components/user/model/user";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();

  const dispatch = useDispatch()
  const auth = useSelector(getAuth)
  const [idMsg, setIdMsg] = useState({ "message": '', "check": false });
  const [pwMsg, setPwMsg] = useState({ "message": '', "check": false });

  const [user, setUser] = useState({} as IUser)
  const [length, setLength] = useState({ "idLength": false, "pwLength": false })
  //useRef : 초기화
  const idRef=useRef<HTMLInputElement>(null);
  const pwRef=useRef<HTMLInputElement>(null);

  const handleUsername = (e: any) => {
    const ID_CHECK = /^([a-z]+(?=.*?[a-z])(?=.*?[0-9])).{5,19}$/g;
    //정규 표현식
    // 영어 소문자(a-z)로 시작하는 6~20자 의 영어 소문자 또는 숫자
    //[] : 한 글자에 대한 조건
    //[] : 영어 대,소문자로 시작하는 ~ 표현할 경우 [a-zA-Z]
    //[ㄱ-힣] : 한글 포함일 경우 
    //g : 전역(global)

    if (e.target.value.length != 0) {
      setLength({ ...length, idLength: true })
    } else {
      setLength({ ...length, idLength: false })
    }
    if (!ID_CHECK.test(e.target.value)) {
      setIdMsg({ ...idMsg, message: "잘못된 형식의 아이디 입니다(영어 소문자로 시작하는 6~20자리 영어 소문자 및 숫자)", check: false });
    }
    else {
      setUser({ ...user, username: e.target.value })
      setIdMsg({ ...idMsg, message: '올바른 형식입니다.', check: true })
    }
  }
  const handlePassword = (e: any) => {
    const PW_CHECK = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[()%@'*|=${.}?/!<>+_#*]).{8,20}$/g;
    // 정규 표현식
    // 8~20자리 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
    if (e.target.value.length != 0) {
      setLength({ ...length, pwLength: true })
    } else {
      setLength({ ...length, pwLength: false })
    }
    if (!PW_CHECK.test(e.target.value)) {
      setPwMsg({ ...pwMsg, message: "잘못된 형식의 비밀번호 입니다(최소 8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상)", check: false });
    }
    else {
      setUser({ ...user, password: e.target.value })
      setPwMsg({ ...pwMsg, message: '올바른 형식입니다.', check: true })
    }
  }

  const handleSubmit = () => {
    dispatch(findUserByUsername(user.username))  //옵저버 패턴
    .then((res:any)=>{
      if(res.payload==='SUCCESS'){
        dispatch(findLogin(user))
        .then((res:any)=>{
          if (res.payload.message === 'SUCCESS') {
            setCookie({}, 'message', res.payload.message, { httpOnly: false, path: '/' })
            setCookie({}, 'accessToken', res.payload.accessToken, { httpOnly: false, path: '/' })
            console.log('서버에서 넘어온 메세지' + parseCookies().message)
            console.log('서버에서 넘어온 토큰 2'+parseCookies().accessToken)
            console.log(jwtDecode<any>(parseCookies().accessToken).id)
            setIdMsg({...idMsg,message:"존재하는 ID",check:true})
            setPwMsg({...pwMsg,message:"존재하는 PW",check:true})
            router.push(`${PG.BOARD}/list`)
      
          } else if(res.payload.message === 'ADMIN'){
            console.log(res.payload)
            console.log(auth.message)
            console.log('LOGIN FAIL')
            if (pwRef.current) {
              pwRef.current.value = ""
            }
            alert("로그인을 실패하셨습니다")
            setIdMsg({...idMsg,message:"존재하는 ID",check:true})
            setPwMsg({...pwMsg,message:"존재하지 않는 PW 입니다.",check:false})
          }
        })
        .catch((err:any)=>{
          
        })  
      }else if(res.payload==='FAILURE'){
        if (idRef.current) {
          idRef.current.value = ""
        }
        if (pwRef.current) {
          pwRef.current.value = ""
        }
        console.log(auth.message)
        console.log('LOGIN FAIL')
        alert("로그인을 실패하셨습니다")
        setIdMsg({...idMsg,message:"존재하지 않는 ID 입니다. 회원가입 해주세요.",check:false})
        setPwMsg({...pwMsg,message:"존재하지 않는 PW 입니다.",check:false})
      }
      
    })
    .catch((err:any)=>{

    })
    .finally(()=>{
      console.log('최종적으로 반드시 이뤄줘야 할 로직')  
    })
  
   
  }

  return (
    <div className="flex items-center justify-center h-[80vh] w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID
            </label>
            <input
            ref={idRef}
              onChange={handleUsername}
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
            />
          </div>
          {length.idLength ?
            (
              !idMsg?.check ? (<p className="text-red-500 font-weight-500 font-size-10 mt-2">{idMsg.message}</p>)
                : <p className="text-blue-500 font-weight-500 font-size-10 mt-2">{idMsg.message}</p>
            ) : null}
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>

            <input
            ref={pwRef}
              onChange={handlePassword}
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
            />
            {length.pwLength ? (
              <div>
                {!pwMsg?.check ? <p className="text-red-500 font-weight-500 font-size-10 mt-2">{pwMsg.message}</p>
                  : <p className="text-blue-500 font-weight-500 font-size-10 mt-2">{pwMsg.message}</p>}
              </div>
            ) : null}
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <a
            href="#"
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="flex px-5 justify-center w-full py-3">
              <div className="min-w-[30px]">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <div className="flex w-full justify-center">
                <h1 className="whitespace-nowrap text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </div>
            </div>
          </a>
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              href="http://localhost:3000/pages/user/register"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}