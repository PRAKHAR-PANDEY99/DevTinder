const express=require("express");
const profileRouter=express.Router();
const userAuth  = require("../middlewares/auth");
const User = require('../models/user');
const {validateEditProfileData}=require('../utils/validation')
const validator = require("validator");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
    // validate my token
    const user= req.user;
    res.send(user);
}
    catch (error) {
    res.status(400).send({
        message: error.message
    });
}
});
profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request ");
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key])); 
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your profile is updated successfuly`);
    }
    catch (error) {
    res.status(400).send({
        message: error.message});
    }
});
profileRouter.patch("/profile/edit/password", userAuth, async(req,res)=>{
    try{

        const loggedInUser = req.user;
        const newPassword = req.body.password;


        if(!validator.isStrongPassword(newPassword)){
            throw new Error(
                "Password must contain uppercase, lowercase, number and special character"
            );
        }


        const hashedPassword = await bcrypt.hash(newPassword,10);


        loggedInUser.password = hashedPassword;

        await loggedInUser.save();


        res.send(
          `${loggedInUser.firstName} your password is updated successfully`
        );

    }
    catch(error){
        res.status(400).send({
            message:error.message
        });
    }
});
module.exports=profileRouter;