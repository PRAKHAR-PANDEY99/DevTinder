const validator = require('validator');
const validateSignUpData=(req)=>{
    if(!req.firstName){
        throw new Error("First Name is required");
    }
    else if(!validator.isEmail(req.emailID)){
        throw new Error("Invalid Email Address");
    }
    else if(!validator.isStrongPassword(req.password)){
        throw new Error("Password must contain uppercase, lowercase, number and special character");
    }
}
module.exports={
    validateSignUpData
}   