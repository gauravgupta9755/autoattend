var validator = require('validator');

const loginValidation =(para,res)=>{
   if(!validator.isAlphanumeric(para.username)){
    res.send({status:11,msg:"username must alpha and numeric"})
    return false;
   }
    if(!validator.isStrongPassword(para.password)){
       res.send({status:11,msg:"password must :`minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1`"})
       return false;
    }
    return true;
}

module.exports={loginValidation}