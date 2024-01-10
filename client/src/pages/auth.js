import React, { useState } from 'react'
import axios from "axios"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
const Auth = () => {
  return (
    <div className='auth'>
        <Login/>
        <Register/>
    </div>
  )
}

 const Login=()=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [_,setCookies]=useCookies(["access_token"])
    const navigate=useNavigate();
    const onSubmit = async (event)=>{
       event.preventDefault();
       try{
        const response=await axios.post("https://foodie-owyz.onrender.com/auth/login",{username,password});
        setCookies("access_token",response.data.token)
        window.localStorage.setItem("userID",response.data.userId)
        navigate("/")
       }
       catch(err){
        console.log(err)
       }
    }
    return (<Form username={username} 
                  password={password} 
                  setPassword={setPassword}
                  setUsername={setUsername}
                  label="Login"
                  onSubmit={onSubmit}/>)
 }
 const Register=()=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const onSubmit= async(event)=>{
            event.preventDefault();
            try{
               await axios.post("https://foodie-owyz.onrender.com/auth/register",
               {
                username,
                password
               }
               )
               alert("Registered successfull Now Login");
            }
            catch(err){
                console.log(err)
            }
            setUsername('')
            setPassword('')
    }
    return (<Form username={username} 
                  password={password} 
                  setPassword={setPassword}
                  setUsername={setUsername}
                  label="Register"
                  onSubmit={onSubmit}/>)

 }
 const Form=({username,password,setUsername,setPassword,label,onSubmit})=>{
    return(
        <div className='auth-container'>
            <h>{label}</h>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='username' >Username</label>
                <input type="text" className="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" className="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit">{label}</button>
            </form>
            
        </div>
    )
 }
 
export default Auth;