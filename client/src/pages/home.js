import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';


const Home = () => {
  const [rece,setRece]=useState([]);
  const [savrece,setSavrece]=useState([]);
  const [cookies,_]=useCookies(["access_token"])
  const userId=useGetUserID();
  useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await axios.get("https://foodie-owyz.onrender.com/recipies");
          setRece(response.data);
          console.log(response.data);
        }
        catch(err){
          console.log(err)
        }
      }
      fetchData();
      const fetchsavedrece=async()=>{
        try{
           const res=await axios.get(`https://foodie-owyz.onrender.com/recipies/savedrecipie/ids/${userId}`)
          
           setSavrece(res.data.savedRecipie);
          }
        catch(err){
          console.log(err)
        }
    }
    if(cookies.access_token)fetchsavedrece()
  },[])
  const saverece=async(recipieID)=>{
      try{
         const resp=await axios.put("https://foodie-owyz.onrender.com/recipies",{
         recipieID,
         userId
         },{headers:{authorization:cookies.access_token}})
         console.log(resp.data);
         setSavrece(resp.data.savedRecipie);
        }
      catch(err){

        }
  }
  const issaved=(id)=>savrece.includes(id);
  
  return (
    <>
    <h2>Recepies</h2>
    <div className='recebox'>
      
      {
         rece.map((r)=> {return (
         <div className='rece' key={r._id}>
              <section className='rece-name'>
              <img src={r.imageUrl}></img>
              <br></br>
              <h>{r.name}</h><br></br>
              </section>
            
             <section className='rece-ingre'>
             <h>Ingredients</h>
             <ul>
             {r.ingredients.map((i)=>{
              return (<li>{i}</li>)
             })}
             </ul>
             <h>Instructions</h>
             <p>{r.instructions}</p>
             <h>Cooking Time</h>
             <p>{r.cookingTime}</p>
             </section>
             <button onClick={()=>saverece(r._id)} disabled={issaved(r._id)}>{issaved(r._id)?"saved":"save"}</button><br></br>
         </div>
         )})
      }
    </div>
    </>
  )
}

export default Home