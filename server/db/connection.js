const mongoose=require("mongoose");

const DB= xyz;   //add link here

mongoose.connect(DB,{useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("connection successful");
}).catch((err)=>console.log("no connection"))
