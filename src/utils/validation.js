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
};
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","age","gender","skills","about","emailID","photoUrl"]
    const isEditAllowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field));
    return isEditAllowed;
} ;
module.exports={
    validateSignUpData,
    validateEditProfileData
}   