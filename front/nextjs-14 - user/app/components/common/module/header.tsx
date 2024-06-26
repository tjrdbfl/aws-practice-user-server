
'use client'
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { PG } from '../enums/PG';
import LinkButton, { linkButtonTitles } from '@/app/atoms/buttons/LinkButton';
import { useEffect, useState } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch, useSelector } from "react-redux";
import { findLogout, findUserById, findUserByUsername, findUserInfo } from '../../user/service/user-service';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { getUserJson } from '../../user/service/user-slice';

function ResponsiveAppBar() {
  const [showProfile,setShowProfile]=useState(false);
  const dispatch=useDispatch();
  const router=useRouter();
  const userInfo=useSelector(getUserJson);
  let token:string|null=null;
  
  useEffect(()=>{
    console.log('현재 쿠키: '+parseCookies().accessToken);
    console.log('현재 토큰: '+token);
    if(parseCookies().accessToken){
      console.log('showProfile:true');
      setShowProfile(true)
      token=parseCookies().accessToken;
      token? dispatch(findUserById(jwtDecode<any>(token).id )): router.push('/');
      
    }else{
      console.log('showProfile:false');
      setShowProfile(false);
    }
  },[])

  const logoutHandler=()=>{
    console.log('로그아웃 적용 전');
    dispatch(findLogout())
    .then((res:any)=>{
      destroyCookie(null,'accessToken')
      console.log('destroy 쿠기 후: '+parseCookies().accessToken);
      setShowProfile(false)
      token=null;
      router.push('/');
    }) 
    .catch((err:any)=>{
      console.log('로그아웃 실행에서 에러 발생'+err);
    }).finally(()=>{
      router.refresh();
    })
  }

  return <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </Link>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {!showProfile && <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="http://localhost:3000/img/user/icons8-user-default-32.png" alt="user photo" />
      </button>}
      {showProfile &&
          <div className="flex px-4 py-3 float-end">
            <span className="block text-sm text-gray-900 dark:text-white">{userInfo.name}</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5">{userInfo.username}@flowbite.com</span>
            <span 
            className="block text-sm  text-gray-500 truncate dark:text-gray-400"
            onClick={logoutHandler}><Link href="#">로그아웃</Link>  
            </span>
          </div>
        }
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    {linkButtonTitles.map((elem)=>(
            <LinkButton key={elem.id} id={elem.id} title={elem.title} path={elem.path}/>
          ))}
    </ul>
  </div>
  </div>
</nav>
}
export default ResponsiveAppBar;









