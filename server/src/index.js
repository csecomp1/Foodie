const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const router=require("./routes/users");
const recipieRouter=require("./routes/recipie")
const app=express();
app.use(express.json());
app.use(cors());
app.use("/auth",router);
app.use("/recipies",recipieRouter);
app.get("/",(req,res)=>{
    res.send("hello")
})
 
mongoose.connect("mongodb+srv://csecomppooja:csepooja2025@receipies.ciklm1l.mongodb.net/receipies?retryWrites=true&w=majority")
//mongoose.connect("mongodb+srv://csepoo:1234@receipies.ciklm1l.mongodb.net/receipies?retryWrites=true&w=majority")
app.listen(3001,()=>{console.log("server started")})
