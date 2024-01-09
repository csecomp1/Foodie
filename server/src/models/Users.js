const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
username:{type:String,required:true,unique:true},
password:{type:String,required:true},
savedRecipes:[{type:mongoose.Schema.Types.ObjectId,ref:"recipie"}]
})
//users is the table/collection that need to be created 
const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;