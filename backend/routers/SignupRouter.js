const express= require("express");
const SignupRouter = express.Router();
const { Registeruser, verifySignupOtp} = require("../controllers/Authentication/Registeruser")
require("dotenv").config();
SignupRouter.get("/", (req,res)=>{
    res.send("Sign up here back!");
    // this api is for fecthing login page from uppper header and redirects to loginpage
})
SignupRouter.post("/",Registeruser);
SignupRouter.post("/verify-signup-otp", verifySignupOtp);
module.exports = SignupRouter;