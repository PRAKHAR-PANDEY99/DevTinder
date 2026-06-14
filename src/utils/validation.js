const validator = require('validator');
const validateSignUpData=(data)=>{

    const {firstName,lastName,emailID,password}=data;

    if(!firstName){
        throw new Error("First Name is required");
    }

    if(!lastName){
        throw new Error("Last Name is required");
    }

    if(!validator.isEmail(emailID)){
        throw new Error("Invalid Email Address");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Weak password");
    }
};
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","age","gender","skills","about","emailID","photoUrl"]
    const isEditAllowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field));
    return isEditAllowed;
};
module.exports={
    validateSignUpData,
    validateEditProfileData
}
