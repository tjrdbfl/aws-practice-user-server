'use client';
import { useRouter } from "next/navigation"
import { useState } from "react";
import axios from 'axios'
import React from 'react';
import { NextPage } from "next";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import { PG } from "@/app/components/common/enums/PG";

const JoinPage: NextPage = () =>  {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    job: "",
  })

  const { username, password, name, phone, job } = inputs;
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
        ...inputs,
        [name]: value
      })
  }

  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/save`
    const data = { username, password, name, phone, job} // data = requestbody
    const config = AxiosConfig()
    axios.post(url, data, config)
      .then(res => {
        alert("response가 가져온 ID : " + JSON.stringify(res.data)) // response.responsebody = res.data = hashmap
        router.push(`${PG.USER}/login`)
      })
  }


  return (<>
    <div className="container">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />
      <label htmlFor="username"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="username" onChange={handleChange} value={username} required /><br />

      <label htmlFor="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={password} required /><br />

      <label htmlFor="name"><b>Name</b></label>
      <input type="text" placeholder="Enter Name" name="name" onChange={handleChange} value={name} required /><br />

      <label htmlFor="phone"><b>Phone Number</b></label>
      <input type="text" placeholder="Enter Phone Number" name="phone" onChange={handleChange} value={phone} required /><br />

      <label htmlFor="job"><b>Job</b></label>
      <input type="text" placeholder="Enter Job" name="job" onChange={handleChange} value={job} required /><br />

      <label>
        <input type="checkbox" defaultChecked={true} name="remember" style={{ marginBottom: "15px" }} /> Remember me
      </label>
      <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>
      <div className="clearfix">
        <button type="button" className="cancelbtn" >Cancel</button>
        <button type="submit" className="signupbtn" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  </>);
}



export default JoinPage;