const express= require("express")

//const verifyToken =require('./users.js')

const mongoose=require("mongoose")
const RecipieModel =require("../models/Recipie.js")
const router=express.Router();
const UserModel=require("../models/Users.js");
router.get("/",async (req,res)=>{
try{
const response=await RecipieModel.find({})
return res.json(response);
}
catch(err){
    console.log(err);
}
})
router.post("/", async (req,res)=>{
    const recipe=new RecipieModel(req.body);
    try{
    const response=await recipe.save();
    return res.json(response);
    }
    catch(err){
        return res.json(err);
    }
    })
router.put("/",async(req,res)=>{
    try{
   
     const rece=await RecipieModel.findById(req.body.recipieID);
     const user=await UserModel.findById(req.body.userId);
      
     user.savedRecipes.push(rece);
     await user.save();
     //returning receipies that are saved by a user in this request the recepie id and userid are sent
     return res.json({savedRecipie:user.savedRecipes})
    }
    catch(err){
     res.json({err});
    }
})
router.get("/savedrecipie/ids/:userId",async(req,res)=>{
  try{
    const user=await UserModel.findById(req.params.userId);
    res.json({savedRecipie:user?.savedRecipes})
  }
  catch(err){res.json({err})}
})
router.get("/savedrecipie/:userId",async(req,res)=>{
    try{
      const user=await UserModel.findById(req.params.userId);
      
      const savedRecipes=await RecipieModel.find(
        {
            _id:{$in:user.savedRecipes}
        }
      )
      return  res.json({savedRecipes})
      
    }
    catch(err){res.json({err})}
  })
module.exports=router;
