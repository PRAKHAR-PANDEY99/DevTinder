const User = require('../models/user');
const jwt=require("jsonwebtoken");
const userAuth= async (req,res,next)=>{
    console.log("Auth used");
    try{
    const cookies=req.cookies;
    const{token}=cookies;
    if(!token){
        throw new Error("Token Is Not Valid");
    }
    const decodedObj=await jwt.verify(token,"PrakharDev");
    const{_id}=decodedObj;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user=user;
    next();
}
    catch (error) {
    res.status(400).send({
        message: error.message
    });

}
};

module.exports=userAuth;
