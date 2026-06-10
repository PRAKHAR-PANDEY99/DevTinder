const adminAuth=(req,res,next)=>{
    console.log("Admin auth token is checked");
    const token="xyz";
    const isAdminAutherized=token==="xyz";
    if(!isAdminAutherized){
        res.status(401).send({message:"Unauthorized"});
    }
    else{
    next();
    }

};
module.exports=adminAuth;
