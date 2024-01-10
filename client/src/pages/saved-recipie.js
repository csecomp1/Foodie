import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
const SavedRecipie = () => {
   const userId=useGetUserID();
   const [savrece,setSaverece]=useState([]);
   useEffect(()=>{
    
    const fetchsavedrece=async()=>{
      try{
        const res=await axios.get(`https://foodie-owyz.onrender.com/recipies/savedrecipie/${userId}`)
         
        setSaverece(res.data.savedRecipes)
      }
      catch(err){
        console.log(err);
       } 
    }
    fetchsavedrece();
   },[])
  return (
    <div className='recebox'>
      
      {
         savrece.map((r)=> {return (
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
             
         </div>
         )})
      }
    </div>
  )
}

export default SavedRecipie