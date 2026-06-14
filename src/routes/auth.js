const express=require("express");
const authRouter=express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
const {validateSignUpData} = require('../utils/validation');
authRouter.post("/signup", async (req, res) => {
    // creating a new instance of the User model with the user data
    try {
        validateSignUpData(req.body);
        // encrypting the password
        const {firstName, lastName, emailID, password} = req.body;
        const passwordhash = await bcrypt.hash(password, 10);
        const user = new User({firstName, lastName, emailID, password: passwordhash});
        await user.save();
        res.send({message:"User created successfully"});
    } catch (error) {
    console.error(error);
    res.status(400).send({
        message: error.message
    });
}
});
authRouter.post("/login", async (req, res) => {
    
    try {
        const {emailID, password} = req.body;
        const user = await User.findOne({ emailID: emailID });
        if (!user) {
            throw new Error("User not found email is not present in DB");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token= await jwt.sign({_id:user._id},"PrakharDev");
            console.log(token);
            res.cookie("token",token);
            res.send({message:"Login successful"});
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    catch (error) {
    res.status(400).send({
        message: error.message
    });
}
});
authRouter.post("/logout", async (req,res)=>{
    res.cookie("token",null, {expires: new Date(Date.now()),   
    });
    res.send("Logged out Successfull");
});
module.exports=authRouter;
