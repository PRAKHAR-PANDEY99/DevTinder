const express=require("express");
const user = require("../models/user");
const requestRouter=express.Router();
const userAuth  = require("../middlewares/auth");
requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user=req.user;
});
module.exports=requestRouter;