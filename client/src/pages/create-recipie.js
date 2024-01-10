import React, { useState } from 'react'
import axios from "axios"
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
const CreateRecipie = () => {
  const userID=useGetUserID();
  const [cookies,_]=useCookies();
  const [recepie,setRecepie]=useState({
    name:"",
ingredients: [],
instructions: "",
imageUrl: "",
cookingTime: 0,
userOwner: userID,
});

const handlesubmit=(event)=>{
  const {name,value}=event.target;
  console.log(name)
  console.log(value)
  setRecepie({...recepie,[name]:value});
}
const handleIngredientChange = (event, idx) => {
  const { value } = event.target;
  const ingredients = recepie.ingredients;
  ingredients[idx] = value;
  setRecepie({ ... recepie, ingredients });
}
  const addIngredient = () => {
  setRecepie({ ...recepie, ingredients: [ ...recepie.ingredients, ""] });
  }
  const onSubmit=async(event)=>{
    console.log("hello")
    console.log(recepie)
    event.preventDefault();
    try{
      const rece=await axios.post("http://localhost:3001/recipies",recepie,
      {headers:{authorization:cookies.access_token}});
      alert("recepie created")
    }
    catch(err){
     console.log(err)
    }
  }

return (
<div className="create-recipe">
<h2> Create Recipe</h2>
<form onSubmit={onSubmit}>
<label htmlFor="name">Name</label>
<input type="text" id="name" name="name" onChange={handlesubmit}/>

<label htmlFor="ingredients">Ingredients</label>
{recepie.ingredients.map((ingredient, idx) => (
<input
key={idx}
type="text"
name="ingredients"
value={ingredient}
onChange={(event) => handleIngredientChange(event, idx)}
/>
))}
<button onClick={addIngredient} type="button">Add Ingredient</button>
<label htmlFor="instructions">Instructions</label>
<textarea id="instructions" name="instructions" onChange={handlesubmit} type="text"></textarea>
<label htmlFor="imageUrl">Image URL</label>
<input type="text" id="imageUrl" name="imageUrl" onChange={handlesubmit} />
<label htmlFor="cookingTime">Cooking Time (minutes)</label>
<input type="number" id="cookingTime" name="cookingTime" onChange={handlesubmit}/>
<button type="submit">Create recepie</button>
</form>
</div>
  )
}

export default CreateRecipie